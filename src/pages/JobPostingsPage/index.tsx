import React from 'react'

import { API } from '../../api'
import { JobPosting } from '../../types'
import { JobPostings } from './JobPostings'

interface State {
  jobPostings: JobPosting[]
  loading: boolean
}

export class JobPostingsPage extends React.Component<{}, State> {
  state = {
    jobPostings: [],
    loading: true,
  }

  componentDidMount() {
    API.jobPostings.loadAll().then(({ data }) => {
      this.setState({
        jobPostings: data,
        loading: false,
      })
    })
  }

  render() {
    if (this.state.loading) {
      return null
    }

    return (
      <div>
        <h1>Job Postings</h1>

        <JobPostings jobPostings={this.state.jobPostings} />
      </div>
    )
  }
}
