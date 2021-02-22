import React from 'react'

import { JobPosting } from '../../types'
import './JobPostings.scss'

interface Props {
  jobPostings: JobPosting[]
}

const postedDate = (postedAt: string) => postedAt.split('T')[0]

export const JobPostings: React.FC<Props> = ({ jobPostings }) => {
  return (
    <table className="JobPostings-table">
      <thead>
        <tr>
          <th className="JobPostings-tableHeader">Date</th>
          <th className="JobPostings-tableHeader">Title</th>
          <th className="JobPostings-tableHeader">Poster</th>
          <th className="JobPostings-tableHeader">Category</th>
          <th className="JobPostings-tableHeader">Location</th>
          <th className="JobPostings-tableHeader">Status</th>
          <th className="JobPostings-tableHeader">Actions</th>
        </tr>
      </thead>

      <tbody>
        {jobPostings.map((posting: JobPosting) => (
          <tr key={posting.id}>
            <td className="JobPostings-tableData">{postedDate(posting.posted_at)}</td>
            <td className="JobPostings-tableData">{posting.title}</td>
            <td className="JobPostings-tableData">{posting.job_poster.full_name}</td>
            <td className="JobPostings-tableData">{posting.category.name}</td>
            <td className="JobPostings-tableData">{posting.location.name}</td>
            <td className="JobPostings-tableData">{posting.status}</td>
            <td className="JobPostings-tableData"></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
