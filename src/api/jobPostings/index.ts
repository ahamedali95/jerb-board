import axios from 'axios'

import { endpoints } from '../endpoints'
import { JobPostingResults } from '../../types'

export interface JobPostingApi {
  loadAll: () => Promise<JobPostingResults>
}

export const jobPostings: JobPostingApi = {
  loadAll: () => axios.get(endpoints.jobPostings),
}
