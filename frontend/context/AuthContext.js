import { createContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { headers } from "@/next.config"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(null)
    const [uploaded, setUploaded] = useState(null)

    useEffect(() => {
        if (!user) {
            loadUser()
        }

    }, [user])


    // Login User
    const login = async ({ username, password }) => {
        try {
            setLoading(true)
            const res = await axios.post('/api/login', {
                username,
                password
            })
            if (res.data.success) {
                loadUser()
                setIsAuthenticated(true)
                setLoading(false)
                router.push('/')
            } else {
                setLoading(false)
                setError(error.response && (error.response.data.detail || error.response.data.error))
            }
        } catch (error) {
            setLoading(false)
            setError(error.response && (error.response.data.detail || error.response.data.error))
        }
    }

    // load user
    const loadUser = async () => {
        try {
            setLoading(true)
            const res = await axios.get('/api/user')
            if (res.data.user) {
                setIsAuthenticated(true)
                setLoading(false)
                setUser(res.data.user)
            } else {
                setLoading(false)
                setError(error.response && (error.response.data.detail || error.response.data.error))
            }
        } catch (error) {
            setLoading(false)
            setIsAuthenticated(false)
            setUser(null)
            setError(error.response && (error.response.data.detail || error.response.data.error))
        }
    }

    // logout the user
    const logout = async () => {
        try {

            const res = await axios.post('/api/logout')
            if (res.data.success) {
                setIsAuthenticated(false)
                setUser(null)
            }
        } catch (error) {
            setIsAuthenticated(false)
            setUser(null)
            setError(error.response && (error.response.data.detail || error.response.data.error))
        }
    }

    // register user
    const registerUser = async (firstName, lastName, userName, email, password, confirmPassword) => {
        try {
            setLoading(true)
            const res = await axios.post(`${process.env.API_URL}/api/register/`, {
                first_name: firstName, last_name: lastName, username: userName, email: email, password: password, confirm_password: confirmPassword
            })
            if (res.data.message) {
                setLoading(false)
                router.push('/login')
            } else {
                setLoading(false)
                console.log(error)
                setError(error.response && (error.response.data.detail || error.response.data.error))
            }
        } catch (error) {
            setLoading(false)
            setIsAuthenticated(false)
            setUser(null)
            setError(error.response && (error.response.data.detail || error.response.data.error))
        }
    }

    // clear error

    const clearError = () => {
        setError(null)
    }

    // update user profile
    const updateUser = async ({ firstName, lastName, userName, email, password, confirmPassword }, accessToken) => {
        try {
            setLoading(true)
            const res = await axios.put(`${process.env.API_URL}/api/update-profile/`, {
                first_name: firstName, last_name: lastName, username: userName, email: email, password: password, confirm_password: confirmPassword
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data) {
                setLoading(false)
                setUser(res.data)
                setUpdated(true)
            } else {
                setLoading(false)
                console.log(error)
                setError(error.response && (error.response.data.detail || error.response.data.error))
            }
        } catch (error) {
            setLoading(false)
            setIsAuthenticated(false)
            setUser(null)
            setError(error.response && (error.response.data.detail || error.response.data.error))
        }
    }

    // upload resume
    const uploadResumee = async (formData, accessToken) => {
        try {
            setLoading(true)
            const res = await axios.put(`${process.env.API_URL}/api/upload-resume/`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
            if (res.data) {
                setLoading(false)
                setUploaded(true)
            } else {
                setLoading(false)
                setError(error.response && (error.response.data.detail || error.response.data.error))
            }
        } catch (error) {
            setLoading(false)
            setIsAuthenticated(false)
            setUser(null)
            setError(error.response && (error.response.data.detail || error.response.data.error))
        }
    }

    return (
        <AuthContext.Provider
            value={{ loading, user, isAuthenticated, error, updated, uploaded, setUploaded, uploadResumee, updateUser, login, logout, setUpdated, registerUser, clearError }}
        >
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContext