import React, {useContext,useEffect,useState} from 'react'
import AuthContext from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Image from 'next/image'
import Link from 'next/link'

const UploadResume = ({ accessToken }) => {
    const [uploadResume, setUploadResume] = useState(false)
    const { loading, error, user , setUploaded, clearError,uploaded,uploadResumee } = useContext(AuthContext)
    const router = useRouter()
    useEffect(() => {
      if (error) {
        toast.error(error)
        clearError()
      }
      if (uploaded) {
        setUploaded(false)
        toast.success('Uploaded successfully')
        router.push('/profile')
      }
    }, [error,uploaded])
    const registerHandler = (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append("resume",uploadResume)
      uploadResumee(formData,accessToken)
    }

    const onChange = (e) => {
        setUploadResume(e.target.files[0])
    }
  
  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src="/resume-upload.svg" alt="resume" layout='fill' />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h3> UPLOAD RESUME </h3>
            </div>
            <form className="form" onSubmit={registerHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-upload"></i>
                  <input
                    type="file"
                    name="resume"
                    id="customFile"
                    onChange={onChange}
                    accept="application/pdf"
                    required
                  />
                </div>
              </div>
              { user  && user.resume && (
              <>
                <h4 className="text-center my-3">OR</h4>

                <a href={`https://jobbees.s3.amazonaws.com/${user.resume}`}>
                  <a
                    className="text-success text-center ml-4"
                    rel="noreferrer"
                    target="_blank"
                  >
                    <b>
                      <i aria-hidden className="fas fa-download"></i> Download
                      Your Resume
                    </b>
                  </a>
                </a>
              </>
              )}

              <div className="uploadButtonWrapper">
                <button type="submit" className="uploadButton">
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadResume