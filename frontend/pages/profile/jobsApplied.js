import { Layout } from '@/component/layout/Layout'
import JobsApplied from '@/component/user/JobsApplied'
import { isAuthenticated } from '@/utils/isAuthenticated'



export default function JobsAppliedPage({ access_token }) {
  return (
    <Layout >
      <JobsApplied accessToken={access_token} />
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

  return {
    props:{
      access_token
    }
  }
}