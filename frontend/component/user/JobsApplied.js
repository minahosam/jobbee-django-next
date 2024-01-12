import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import DataTable from 'react-data-table-component'
import JobContext from '@/context/JobConext'

const JobsApplied = ({accessToken}) => {
    const {loading,error,clearError,appliedJobs,jobs} = useContext(JobContext)
    useEffect(() => {
      if (error) {
        clearError()
      }
      appliedJobs(accessToken)
    }, [error,accessToken])
    const columns = [
        {
            name: "Job Name",
            sortable: true,
            selector: (row) => row.title,
        },
        {
            name: "Salary",
            sortable: true,
            selector: (row) => row.salary,
        },
        {
            name: "Education",
            sortable: true,
            selector: (row) => row.education,
        },
        {
            name: "Experience",
            sortable: true,
            selector: (row) => row.experience,
        },
        {
            name: "Applied On",
            sortable: true,
            selector: (row) => row.applieOn,
        },

        {
            name: "Action",
            sortable: true,
            selector: (row) => row.action,
        },
    ];

    const data = [];

    jobs &&
        jobs.forEach((item) => {
            data.push({
                title: item.job.title,
                salary: item.job.salary,
                education: item.job.education,
                experience: item.job.experience,
                applieOn: item.appliedAt.substring(0, 10),
                action: (
                    <Link href={`/job/${item.job.id}`}>
                        <span className="btn btn-primary">
                            <i aria-hidden className="fa fa-eye"></i>
                        </span>
                    </Link>
                ),
            });
        });
    
    return (
        <>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 mt-5">
                    <h4 className="my-5">Job Applied</h4>
                    <DataTable  columns={columns} data={data} pagination responsive />
                </div>
                <div className="col-2"></div>
            </div>
        </>
    )
}

export default JobsApplied