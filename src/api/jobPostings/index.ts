import axios from 'axios'

import { endpoints } from '../endpoints'
import { JobPostingsApiResponse } from '../../types'

export interface JobPostingApi {
  loadAll: () => Promise<JobPostingsApiResponse>
}

export const jobPostings: JobPostingApi = {
  loadAll: () => axios.get(endpoints.jobPostings),
}
