import axios from 'axios';

import { endpoints } from '../endpoints';
import { JobPostingsApiResponse, JobPostingApiResponse } from '../../types';
import { InitialState as JobPosting } from '../../pages/reducers/createPostReducer';

export interface JobPostingApi {
  loadAll: () => Promise<JobPostingsApiResponse>;
  loadJobPosting: (id: string) => Promise<JobPostingApiResponse>;
  createJobPosting: (obj: JobPosting) => Promise<JobPostingApiResponse>;
}

export const jobPostings: JobPostingApi = {
  loadAll: () => axios.get(endpoints.jobPostings),
  loadJobPosting: (id: string) => axios.get(`${endpoints.jobPostings}/${id}` ),
  createJobPosting: (obj) => axios.post(endpoints.jobPostings, obj)
};
