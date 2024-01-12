import React, {useContext,useEffect,useState} from 'react'
import AuthContext from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Image from 'next/image'


const UpdateProfile = ({ accessToken }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { loading, error, user , setUpdated, clearError,updated,updateUser } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name)
      setLastName(user.last_name)
      setEmail(user.email)
      setUserName(user.username)
    }
    if (error) {
      toast.error(error)
      clearError()
    }
    if (updated) {
      setUpdated(false)
      router.push('/profile')
    }
  }, [loading,user, error,updated])
  const registerHandler = (e) => {
    e.preventDefault()
    updateUser({firstName, lastName, userName, email, password, confirmPassword},accessToken)
  }
  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src="/signup.svg" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            
            alt="register" />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> SIGN UP</h2>
            </div>
            <form className="form" onSubmit={registerHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-user"></i>
                  <input type="text" placeholder="Enter First Name" value={firstName || ''} onChange={(e) => setFirstName(e.target.value)} required />
                </div>

                <div className="inputBox">
                  <i aria-hidden className="fas fa-user-tie"></i>
                  <input type="text" placeholder="Enter Last name" value={lastName || ''} onChange={(e) => setLastName(e.target.value)} required />
                </div>

                <div className="inputBox">
                  <i aria-hidden className="fas fa-user-tie"></i>
                  <input type="text" placeholder="Enter Username" value={userName || ''} onChange={(e) => setUserName(e.target.value)} required />
                </div>

                <div className="inputBox">
                  <i aria-hidden className="fas fa-envelope"></i>
                  <input type="email" placeholder="Enter Your Email" value={email || ''} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-key"></i>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password || ''} onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-key"></i>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={confirmPassword || ''} onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="registerButtonWrapper">
                <button type="submit" className="registerButton">
                  {loading ? 'Updating ...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile