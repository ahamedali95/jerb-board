import React from 'react'

import { JobListing } from '../../types'
import './JobListings.scss'

interface Props {
  jobListings: JobListing[]
}

const postedDate = (postedAt: string) => postedAt.split('T')[0]

export const JobListings: React.FC<Props> = ({ jobListings }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Title</th>
          <th>Poster</th>
          <th>Category</th>
          <th>Location</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {jobListings.map((listing: JobListing) => (
          <tr key={listing.id}>
            <td>{postedDate(listing.posted_at)}</td>
            <td>{listing.title}</td>
            <td>{listing.job_poster.full_name}</td>
            <td>{listing.category.name}</td>
            <td>{listing.location.name}</td>
            <td>{listing.status}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
