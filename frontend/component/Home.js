import React from 'react'
import Link from 'next/link'
import { JobItem } from './job/JobItem'
import Pagination from 'react-js-pagination'
import Filters from './layout/Filters'
import { useRouter } from 'next/router'

export const Home = ({data}) => {
  const router = useRouter()
  const {count,resPerPage,jobs} = data
  let { page=1 , title } = router.query
  page = Number(page) || 1

  let queryParams
  if (typeof window !== 'undefined') {
    queryParams = new URLSearchParams(window.location.search)
    console.log(queryParams)
  }
  const changeHandler = (currentPage) => {
    if (queryParams.has('page')) {
      queryParams.set('page', currentPage)
    } else {
      queryParams.append('page', currentPage)
    }
    console.log(queryParams.toString());
    router.push({
      search : queryParams.toString(),
    })
  }
  return (
    <div className="container container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
            <Filters />{" "}
          </div>

          <div className="col-xl-9 col-lg-8 content-left-offset">
            <div className="my-5">
            <h4 className="page-title">{title ?`${count} Jobs of ${title}`:'Latest Jobs'}</h4>
              <Link href="/profile/stats">
                <button className="col-3 offset-8 btn btn-secondary stats_btn">
                  Get Topic stats
                </button>
              </Link>
              <div className="d-block">
                <Link href="/search">Go to Search</Link>
              </div>
            </div>
            {jobs && jobs.map((job) => <JobItem key={job.id} job={job}/>)}
            {resPerPage < count && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={page}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={count}
                  // pageRangeDisplayed={resPerPage}
                  onChange={changeHandler}
                  nextPageText={'Next page'}
                  prevPageText={'Prev page'}
                  firstPageText={'First page'}
                  lastPageText={'Last page'}
                  itemClass="page-item"
                  linkClass='page-link'
                />
              </div>              
            )}
          </div>
        </div>
      </div>
  )
}
