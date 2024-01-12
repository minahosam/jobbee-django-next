import { Layout } from '@/component/layout/Layout'
import UploadResume from '@/component/user/UploadResume'
import { isAuthenticated } from '@/utils/isAuthenticated'
export default function profilePage({ access_token }) {
  return (
    <Layout >
      <UploadResume accessToken={access_token} />
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