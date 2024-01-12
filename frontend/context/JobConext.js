import { createContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { headers } from "@/next.config"

const JobContext = createContext()

export const JobProvider = ({ children }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [updated, setUpdated] = useState(null)
    const [applied, setApplied] = useState(false)
    const [stats, setStats] = useState(false)
    const [jobs, setJobs] = useState('')
    const [created, setCreated] = useState(null)
    const [deleted, setDeleted] = useState(null)


    // clear error

    const clearError = () => {
        setError(null)
    }

    // apply to job
    const applyToJob = async (id, access_token) => {
        try {
            setLoading(true)
            const res = await axios.post(`${process.env.API_URL}/api/apply-job/${id}/`, {},
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
            if (res.data.apply === true) {
                setLoading(false)
                setApplied(true)
            } else {
                setLoading(false)
                setError(error.response && (error.response.data.detail || error.response.data.error))
            }
        } catch (error) {
            setLoading(false)
            setError(error.response && (error.response.data.detail || error.response.data.error))
        }
    }

    // check if user applied to the job
    const checkApplied = async (id, access_token) => {
        try {
            setLoading(true)
            const res = await axios.get(`${process.env.API_URL}/api/applied-job/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
            if (res.data) {
                setLoading(false)
                setApplied(true)
            } else if (res.data === false) {
                setLoading(false)
                setApplied(false)
            }
            else {
                setLoading(false)
                setError(error.response && (error.response.data.detail || error.response.data.error))
            }
        } catch (error) {
            setLoading(false)
            setError(error.response && (error.response.data.detail || error.response.data.error))
        }
    }

    // get stats of the job
    const jobStats = async (job) => {
        try {
            setLoading(true)
            const res = await axios.get(`${process.env.API_URL}/api/stats-job/${job}/`)
            if (res.data) {
                setLoading(false)
                setStats(res.data)
            } else if (res.data === false) {
                setLoading(false)
                setStats(false)
            }
            else {
                setLoading(false)
                setError(error.response && (error.response.data.detail || error.response.data.error))
            }
        } catch (error) {
            setLoading(false)
            setError(error.response && (error.response.data.detail || error.response.data.error))
        }
    }


    // check all jobs applied by the user
    const appliedJobs = async (access_token) => {
        try {
            setLoading(true)
            const res = await axios.get(`${process.env.API_URL}/api/applied-jobs/`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
            if (res.data) {
                setLoading(false)
                setJobs(res.data)
            } else {
                setLoading(false)
                setError(error.response && (error.response.data.detail || error.response.data.error))
            }
        } catch (error) {
            setLoading(false)
            setError(error.response && (error.response.data.detail || error.response.data.error))
        }
    }


    // create a new job
    const createJob = async (data, access_token) => {
        try {
            setLoading(true)
            const res = await axios.post(`${process.env.API_URL}/api/create-job/`,data,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
            if (res.data) {
                setLoading(false)
                setCreated(true)
            } else {
                setLoading(false)
                setError(error.response && (error.response.data.detail || error.response.data.error))
            }
        } catch (error) {
            setLoading(false)
            setError(error.response && (error.response.data.detail || error.response.data.error))
        }
    }



    // update job
    const updateJob = async (data, access_token,id) => {
        try {
            setLoading(true)
            const res = await axios.put(`${process.env.API_URL}/api/update-job/${id}/`,data,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
            if (res.data) {
                setLoading(false)
                setUpdated(true)
            } else {
                setLoading(false)
                setError(error.response && (error.response.data.detail || error.response.data.error))
            }
        } catch (error) {
            setLoading(false)
            setError(error.response && (error.response.data.detail || error.response.data.error))
        }
    }


    // delete job
    const deleteJob = async (access_token,id) => {
        try {
            setLoading(true)
            const res = await axios.delete(`${process.env.API_URL}/api/delete-job/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
            if (res.data) {
                setLoading(false)
                setDeleted(true)
            } else {
                setLoading(false)
                setError(error.response && (error.response.data.detail || error.response.data.error))
            }
        } catch (error) {
            setLoading(false)
            setError(error.response && (error.response.data.detail || error.response.data.error))
        }
    }


    return (
        <JobContext.Provider
            value={{ loading, error, updated, applied, stats, jobs, created, deleted, clearError, applyToJob, checkApplied, jobStats, appliedJobs
            , setCreated, createJob, setUpdated, updateJob, setDeleted, deleteJob }}
        >
            {children}
        </JobContext.Provider>
    )
}



export default JobContext