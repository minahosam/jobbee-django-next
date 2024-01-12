import React,{ useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AuthContext from '@/context/AuthContext'
import { toast } from 'react-toastify'

const Login = () => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {loading,error,isAuthenticated,login,clearError} = useContext(AuthContext)
    useEffect(() => {
      if (error) {
        toast.error(error)
        clearError()
      }
      if (!loading && isAuthenticated ) {
        router.push('/')
      }
    }, [loading,error,isAuthenticated])
    const submitHandler = (e) => {
        e.preventDefault()
        login({username, password})
    }
    
    return (
        <div className="modalMask">
            <div className="modalWrapper">
                <div className="left">
                    <div style={{ width: "100%", height: "100%", position: "relative" }}>
                        <img src="/login.svg" alt="login" />
                    </div>
                </div>
                <div className="right">
                    <div className="rightContentWrapper">
                        <div className="headerWrapper">
                            <h2> LOGIN</h2>
                        </div>
                        <form className="form" onSubmit={submitHandler}>
                            <div className="inputWrapper">
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-user"></i>
                                    <input type="text" 
                                    placeholder="Enter Your Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-key"></i>
                                    <input
                                        type="password"
                                        placeholder="Enter Your Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="loginButtonWrapper">
                                <button type="submit" className="loginButton">
                                    {loading ? 'Authenticating' : ' Login'}
                                </button>
                            </div>
                            <p style={{ textDecoration: "none" }} className="signup">
                                New to Jobbee? <a href="/register">Create an account</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
