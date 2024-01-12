import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import AuthContext from '@/context/AuthContext'

export const Header = () => {
  const {loading, user, logout} = useContext(AuthContext)
  const router = useRouter()
  let { page = 1 } = router.query
  console.log(page)
  const logoutHandler = () => {
    logout()
  }
  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link legacyBehavior href={`/?page=${page}`}>
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <Image width="30" height="30" src="/logo.png" alt="" />
            </div>
            <span className="logo1">Job</span>
            <span className="logo2">bee</span>
          </div>
        </Link>
        <div className="btnsWrapper">
          <Link legacyBehavior href="/employeer/jobs/newJob">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>

          {user ? (
            <div className="dropdown ml-3">
            <a
              className="btn dropdown-toggle mr-4"
              id="dropDownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span>Hi, {user.username}</span>{" "}
            </a>

            <div
              className="dropdown-menu"
              aria-labelledby="dropDownMenuButton"
            >
              <Link legacyBehavior href="/employeer/jobs/">
                <a className="dropdown-item">My Jobs</a>
              </Link>

              <Link legacyBehavior href="/profile/jobsApplied/">
                <a className="dropdown-item">Jobs Applied</a>
              </Link>

              <Link legacyBehavior href="/profile/">
                <a className="dropdown-item">Profile</a>
              </Link>

              <Link legacyBehavior href="/profile/uploadResume/">
                <a className="dropdown-item">Upload Resume</a>
              </Link>

              <Link legacyBehavior href="/">
                <a
                  className="dropdown-item text-danger" onClick={logoutHandler}
                >
                  Logout
                </a>
              </Link>
            </div>
          </div>
          )
            : (!loading && (
              <Link href="/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </Link>
            ))
          }

        </div>
      </div>
    </div>
  )
}
