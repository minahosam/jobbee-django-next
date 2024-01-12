import JobContext from '@/context/JobConext';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';

const JobCandidate = ({ candidates }) => {
  const { error, loading, clearError } = useContext(JobContext)
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const columns = [
    {
      name: "Job Name",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: "User ID",
      sortable: true,
      selector: (row) => row.id,
    },
    {
      name: "Candidate Resume",
      sortable: true,
      selector: (row) => row.resume,
    },

    {
      name: "Applied At",
      sortable: true,
      selector: (row) => row.appliedAt,
    },
  ];

  const data = [];

  candidates &&
    candidates.forEach((candidate) => {
      data.push({
        title: candidate.job.title,
        id: candidate.user,
        appliedAt: candidate.appliedAt,
        resume: (
          <Link href={`https://jobbees.s3.amazonaws.com/${candidate.resume}`} target="_blank">
            <span className="text-success text-center ml-4" rel="noreferrer">
              <b>
                <i aria-hidden className="fas fa-download"></i> View Resume
              </b>
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
          <DataTable columns={columns} data={data} />
        </div>
        <div className="col-2"></div>
      </div>
    </>
  )
}

export default JobCandidate