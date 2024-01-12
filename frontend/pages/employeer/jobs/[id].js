import { Layout } from '@/component/layout/Layout'
import UpdateJob from '@/component/job/UpdateJob'
import { isAuthenticated } from '@/utils/isAuthenticated'
import axios from 'axios'
export default function UpdateJobPage({ access_token,job,id }) {
  return (
    <Layout >
      <UpdateJob accessToken={access_token} job={job} id={id} />
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
  const res =await axios.get(`${process.env.API_URL}/api/job/${params.id}/`)
  const job = res.data.job
  const id = params.id
  return {
    props:{
      access_token,
      job,
      id
    }
  }
}