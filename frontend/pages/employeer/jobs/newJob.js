import { Layout } from '@/component/layout/Layout'
import CreateJob from '@/component/job/CreateJob'
import { isAuthenticated } from '@/utils/isAuthenticated'
export default function newJobPage({ access_token }) {
  return (
    <Layout >
      <CreateJob accessToken={access_token} />
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