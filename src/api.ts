import axios from 'axios'
import { JobListingResults } from './types'

export const getJobListings: () => Promise<JobListingResults> = () => {
  return axios.get('https://jerbyjerbs-rails.herokuapp.com/api/v1/job_postings')
}
