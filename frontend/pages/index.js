import { Layout } from '@/component/layout/Layout'
import { Home } from '@/component/Home'
import axios from 'axios'

export default function index({data}) {
  return (
    <Layout>
      <Home data={data}/>
    </Layout>
  )
}

export async function getServerSideProps({query}) {
  const keyword = query.title || ''
  const location = query.location || ''
  const page = query.page || 1
  const jobType = query.jobType || ''
  const education = query.education || ''
  const experience = query.experience || ''
  const salary = query.salary || ''
  let minSalary = ''
  let maxSalary = ''
  if (query.salary) {
    const [min, max] = query.salary.split('-')
    minSalary = min
    maxSalary = max
  }
  const querySearch = `?title=${keyword}&location=${location}&page=${page}&jobType=${jobType}&education=${education}&experience=${experience}&min_salary=${minSalary}&max_salary=${maxSalary}`
  const res = await axios.get(`${process.env.API_URL}/api/all-jobs/${querySearch}`);
  const data =res.data;
  const count = res.count

  return {
    props:{
      data,
    },
  };
}