import axios from 'axios'

import { endpoints } from '../endpoints'
import { JobPostingsApiResponse, JobPosting } from '../../types'

export interface JobPostingApi {
  loadAll: () => Promise<JobPostingsApiResponse>,
  loadJobListing: (id: string) => Promise<JobPosting>
}

export const jobPostings: JobPostingApi = {
  loadAll: () => axios.get(endpoints.jobPostings),
  loadJobListing: (id: string) => axios.get(`${endpoints.jobPostings}/${id}` )
};
