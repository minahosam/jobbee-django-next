import React, { useContext, useEffect } from 'react'
import moment from 'moment'
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import JobContext from '@/context/JobConext'
import { toast } from 'react-toastify'


mapboxgl.accessToken = process.env.MAPBOXACCESSKEY

export const JobDetails = ({ singleJob, candidates, access_token }) => {
  const { loading, error, clearError, applyToJob, applied, checkApplied } = useContext(JobContext)
  {
    singleJob.point != 'SRID=4326;POINT EMPTY' ? (
      useEffect(() => {
        console.log(singleJob.point)
        const coordinate = singleJob.point.split('(')[1].replace(')', '').split(' ');
        const map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [coordinate[0], coordinate[1]],
          zoom: 15,
        });

        new mapboxgl.Marker().setLngLat(coordinate).addTo(map);
        if (error) {
          toast.error(error)
          clearError
        }
        checkApplied(singleJob.id,access_token);

      }, [error])) : (
      useEffect(() => {
        const map = new mapboxgl.Map({
          container: "map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [0.0, 0.0],
          zoom: 15,
        });
        if (error) {
          toast.error(error)
          clearError
        }
        checkApplied(singleJob.id,access_token)

      }, [error]))
  }
  const applyHandler = (e) => {
    e.preventDefault()
    applyToJob(singleJob.id, access_token)
  }
  const d1 = moment(singleJob.lastDate)
  const d2 = moment(Date.now())
  const passLastDate = d1.diff(d2,'days') < 0 ? true : false

  return (
    <div className="job-details-wrapper">
      <div className="container container-fluid">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="job-details p-3">
              <div className="job-header p-4">
                <h2>{singleJob.title}</h2>
                <span>
                  <i aria-hidden className="fas fa-building"></i>
                  <span> {singleJob.industry}</span>
                </span>
                <span className="ml-4">
                  <i aria-hidden className="fas fa-map-marker-alt"></i>
                  <span> {singleJob.address}</span>
                </span>

                <div className="mt-3">
                  <span>
                    {loading ? (
                      "Loading..."
                    ) : applied ? (
                      <button disabled className="btn btn-success px-4 py-2 apply-btn">
                        <i aria-hidden className="fas fa-check"></i>
                        {loading ? "Loading..." : "Applied"}
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary px-4 py-2 apply-btn"
                        onClick={applyHandler}
                        disabled={passLastDate}
                      >
                        {loading ? "Loading..." : "Apply Now"}
                      </button>
                    )}
                    <span className="ml-4 text-success">
                      <b>{candidates}</b> candidates has applied to this job.
                    </span>
                  </span>
                </div>
              </div>

              <div className="job-description mt-5">
                <h4>Description</h4>
                <p>
                  {singleJob.description}
                </p>
              </div>

              <div className="job-summary">
                <h4 className="mt-5 mb-4">Job Summary</h4>
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td>Job Type</td>
                      <td>:</td>
                      <td>{singleJob.jobType}</td>
                    </tr>

                    <tr>
                      <td>Job Industry</td>
                      <td>:</td>
                      <td>{singleJob.industry}</td>
                    </tr>

                    <tr>
                      <td>Expected Salary</td>
                      <td>:</td>
                      <td>${singleJob.salary}</td>
                    </tr>

                    <tr>
                      <td>Education</td>
                      <td>:</td>
                      <td>{singleJob.education}</td>
                    </tr>

                    <tr>
                      <td>Experience</td>
                      <td>:</td>
                      <td>{singleJob.experience}</td>
                    </tr>

                    <tr>
                      <td>Company</td>
                      <td>:</td>
                      <td>{singleJob.industry}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="job-location">
                <h4 className="mt-5 mb-4">Job Location</h4>
                <div id="map" style={{ height: 520, width: "100%" }} />
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-lg-4">
            <div className="job-contact-details p-3">
              <h4 className="my-4">More Details</h4>
              <hr />
              <h5>Email Address:</h5>
              <p>{singleJob.email}</p>

              <h5>Job Posted:</h5>
              <p>{moment.utc(singleJob.created).local().startOf('second').fromNow()}</p>

              <h5>Last Date:</h5>
              <p>{singleJob.lastDate}</p>
            </div>

            {applied ===false && passLastDate && (
            <div className="mt-5 p-0">
              <div className="alert alert-danger">
                <h5>Note:</h5>
                You can no longer apply to this job. This job is expired. Last
                date to apply for this job was: <b>{singleJob.lastDate}</b>
                <br /> Checkout others job on Jobbee.
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
