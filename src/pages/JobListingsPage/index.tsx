import React, { FC } from 'react'

import { getJobListings } from '../../api'
import { JobListing } from '../../types'
import { JobListings } from './JobListings'

export const JobListingsPage: FC = () => {
  const [loading, setLoading] = React.useState(true)
  const [jobListings, setJobListings] = React.useState<JobListing[]>([])

  const loadJobListings = async () => {
    const { data } = await getJobListings()

    setJobListings(data)
    setLoading(false)
  }

  React.useEffect(() => {
    loadJobListings()
  }, [])

  if (loading) {
    return null
  }
  return (
    <div>
      <h1>Job Listings</h1>

      <JobListings jobListings={jobListings} />
    </div>
  )
}
