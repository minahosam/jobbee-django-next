import JobContext from '@/context/JobConext'
import React, { useContext, useEffect, useState } from 'react'
import { educationOption, experienceOption, industryOption, jobTypeOption } from './job'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const UpdateJob = ({accessToken,job,id}) => {
    const router = useRouter()
    console.log(id)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [salary, setSalary] = useState(0)
    const [positions, setPositions] = useState(0)
    const [companyName, setCompanyName] = useState('')
    const [jobType, setJobType] = useState('')
    const [education, setEducation] = useState('')
    const [experience, setExperience] = useState('')
    const [industry, setIndustry] = useState('')
    const { loading, error, clearError,updated,setUpdated,updateJob } = useContext(JobContext)
    useEffect(() => {
        if (error) {
            toast.error(error)
            clearError()
        }
        if (job) {
            setTitle(job.title)
            setAddress(job.address)
            setCompanyName(job.companyName)
            setEmail(job.email)
            setDescription(job.description)
            setEducation(job.education)
            setExperience(job.experience)
            setIndustry(job.industry)
            setJobType(job.jobType)
            setPositions(job.positions)
            setSalary(job.salary)
        }
        if (updated) {
            toast.success('your job has been updated successfully')
            setUpdated(false)
            router.push(router.asPath)
        }
    }, [error,job,updated])

    const submitHandler = (e) => {
        e.preventDefault()
        const data = { title, description, email, address, salary, positions, companyName, jobType, education, experience, industry }
        updateJob(data,accessToken,job.id)
    }
    return (
        <div className="newJobcontainer">
            <div className="formWrapper">
                <div className="headerWrapper">
                    <div className="headerLogoWrapper"></div>
                    <h1>
                        <i aria-hidden className="fas fa-copy mr-2"></i> UPDATE A JOB
                    </h1>
                </div>
                <form className="form" onSubmit={submitHandler}>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="inputWrapper">
                                <div className="inputBox">
                                    <i aria-hidden className="fab fa-tumblr"></i>
                                    <input type="text" placeholder="Enter Job Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-file-medical-alt"></i>
                                    <textarea
                                        className="description"
                                        type="text"
                                        placeholder="Enter Job Description"
                                        value={description} onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-envelope"></i>
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        pattern="\S+@\S+\.\S+"
                                        title="Your email is invalid"
                                        required
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-map-marker-alt"></i>
                                    <input type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-dollar-sign"></i>
                                    <input
                                        type="number"
                                        placeholder="Enter Salary Range"
                                        value={salary} onChange={(e) => setSalary(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-users"></i>
                                    <input
                                        type="number"
                                        placeholder="Enter No. of Positions"
                                        value={positions} onChange={(e) => setPositions(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-building"></i>
                                    <input
                                        type="text"
                                        placeholder="Enter Company Name"
                                        value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 ml-4 mt-4 mt-md-0 ml-md-0">
                            <div className="boxWrapper">
                                <h4>Job Types:</h4>
                                <div className="selectWrapper">
                                    <select className="classic" value={jobType} onChange={(e) => setJobType(e.target.value)}>
                                        {jobTypeOption.map((option) => (
                                            <option key={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="boxWrapper">
                                <h4>Education:</h4>
                                <div className="selectWrapper">
                                    <select className="classic" value={education} onChange={(e) => setEducation(e.target.value)}>
                                        {educationOption.map((option) => (
                                            <option key={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="boxWrapper">
                                <h4>Industry:</h4>
                                <div className="selectWrapper">
                                    <select className="classic" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                                        {industryOption.map((option) => (
                                            <option key={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="boxWrapper">
                                <h4>Experience:</h4>
                                <div className="selectWrapper">
                                    <select className="classic" value={experience} onChange={(e) => setExperience(e.target.value)}>
                                        {experienceOption.map((option) => (
                                            <option key={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col text-center mt-3">
                            <button className="createButton">{loading ? 'Updating' : 'Update Job'}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateJob