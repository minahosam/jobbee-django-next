import { AuthProvider } from '@/context/AuthContext'
import { JobProvider } from '@/context/JobConext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <JobProvider>
        <Component {...pageProps} />
      </JobProvider>
    </AuthProvider>
  )
}
