import JobContext from '@/context/JobConext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

const MyJob = ({accessToken,jobs}) => {
    const router = useRouter()
    const {error,loading,clearError,deleted,setDeleted,deleteJob} = useContext(JobContext)
    useEffect(() => {
      if (error) {
        toast.error(error)
        clearError()
      }
      if (deleted) {
        toast.success('Job deleted successfully')
        setDeleted(false)
        router.push(router.asPath)
      }
    }, [error,deleted])
  
    const deleteHandler = (job_id) => {

        deleteJob(accessToken, job_id)
    }
    const columns = [
        {
            name: "Job ID",
            sortable: true,
            selector: (row) => row.id,
        },
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
            name: "Action",
            sortable: true,
            selector: (row) => row.action,
        },
    ];

    const data = [];

    jobs &&
        jobs.forEach((job) => {
            data.push({
                id: job.id,
                title: job.title,
                salary: job.salary,
                action: (
                    <>
                        <Link href={`/job/${job.id}`}>
                            <span className="btn btn-primary">
                                <i aria-hidden className="fa fa-eye"></i>
                            </span>
                        </Link>

                        <Link href={`/employeer/jobs/candidates/${job.id}`}>
                            <span className="btn btn-success my-2 mx-1">
                                <i aria-hidden className="fa fa-users"></i>
                            </span>
                        </Link>

                        <Link href={`/employeer/jobs/${job.id}`}>
                            <span className="btn btn-warning my-2 mx-1">
                                <i aria-hidden className="fa fa-pencil"></i>
                            </span>
                        </Link>

                        <button className="btn btn-danger mx-1" onClick={() => deleteHandler(job.id)}>
                            <i aria-hidden className="fa fa-trash"></i>
                        </button>
                    </>
                ),
            });
        });
    return (
        <>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 mt-5">
                    <h4 className="my-5">Job Applied</h4>
                    <DataTable columns={columns} data={data} />
                </div>
                <div className="col-2"></div>
            </div>
        </>
    )
}

export default MyJob