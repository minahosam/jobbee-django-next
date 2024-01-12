import AuthContext from '@/context/AuthContext'
import React, { useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'


const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {loading,error,registerUser,isAuthenticated,clearError} = useContext(AuthContext)

    useEffect(() => {
        if (error) {
          toast.error(error)
          clearError()
        }
        if (!loading && isAuthenticated ) {
          router.push('/')
        }
      }, [loading,error,isAuthenticated])
    const registerHandler = (e) => {
        e.preventDefault()
        registerUser(firstName,lastName,userName,email,password,confirmPassword)
    }
    return (
        <div className="modalMask">
            <div className="modalWrapper">
                <div className="left">
                    <div style={{ width: "100%", height: "100%", position: "relative" }}>
                        <img src="/signup.svg" alt="register" />
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
                                    <input type="text" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                </div>

                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-user-tie"></i>
                                    <input type="text" placeholder="Enter Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                </div>

                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-user-tie"></i>
                                    <input type="text" placeholder="Enter Username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                                </div>

                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-envelope"></i>
                                    <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-key"></i>
                                    <input
                                        type="password"
                                        placeholder="Enter Your Password"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-key"></i>
                                    <input
                                        type="password"
                                        placeholder="Enter Your Password"
                                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="registerButtonWrapper">
                                <button type="submit" className="registerButton">
                                    {loading ? 'Loading ...' : 'Register'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register