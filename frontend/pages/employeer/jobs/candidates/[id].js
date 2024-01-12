import { Layout } from '@/component/layout/Layout'
import JobCandidate from '@/component/job/JobCandidate'
import { isAuthenticated } from '@/utils/isAuthenticated'
import axios from 'axios'
export default function candidatesAppliedPage({ access_token,candidates }) {
  return (
    <Layout >
      <JobCandidate accessToken={access_token} candidates={candidates} />
    </Layout>
  )
}

export async function getServerSideProps({ req,params }) {
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
  const res =await axios.get(`${process.env.API_URL}/api/candidate-list/${params.id}/`,{
    headers : {
        Authorization: `Bearer ${access_token}`
    }
  })
  const candidates = res.data
  return {
    props:{
      access_token,
      candidates
    }
  }
}