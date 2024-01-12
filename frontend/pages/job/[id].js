import { Layout } from '@/component/layout/Layout'
import axios from 'axios'
import { JobDetails } from '@/component/job/JobDetails'
import NotFound from '@/component/layout/NotFound'
import { accessToken } from 'mapbox-gl'

export default function jobDetail({job,candidates,error,accessToken}) {
    if (error?.includes('Not found')) return <NotFound/>
  return (
    <Layout title={job.title}>
      <JobDetails singleJob={job} candidates={candidates} access_token={accessToken} />
    </Layout>
  )
}

export async function getServerSideProps({req , params}){
  try {    
    console.log(params)
    const res = await axios.get(`${process.env.API_URL}/api/job/${params.id}/`)
    const job = res.data.job
    const candidates = res.data.candidates

    const accessToken = req.cookies.access || ''

    return {
        props:{
            job,
            candidates,
            accessToken,
        }
      }
  } catch (error) {
      return {
        props:{
          error:error.response.data.detail
        }
      }
  }
}
