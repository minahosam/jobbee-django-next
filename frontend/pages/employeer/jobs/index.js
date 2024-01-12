import { Layout } from '@/component/layout/Layout'
import MyJob from '@/component/job/MyJob'
import { isAuthenticated } from '@/utils/isAuthenticated'
import axios from 'axios'
export default function myJobPage({ access_token,jobs }) {
  return (
    <Layout >
      <MyJob accessToken={access_token} jobs={jobs} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const access_token = req.cookies.access
  const user = await isAuthenticated(access_token)

  if (!user) {
    return {
      redirect:{
        destination:'/login',
        permanent:false,
      }
    }
  }
  const res =await axios.get(`${process.env.API_URL}/api/me/jobs/`,{
    headers : {
        Authorization: `Bearer ${access_token}`
    }
  })
  const jobs = res.data
  return {
    props:{
      access_token,
      jobs
    }
  }
}