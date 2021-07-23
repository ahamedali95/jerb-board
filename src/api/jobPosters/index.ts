import axios from 'axios';

import { JobPostersApiResponse } from '../../types';
import { endpoints } from '../endpoints';

export interface JobPostersApi {
    loadAll: () => Promise<JobPostersApiResponse>;
}

export const jobPosters: JobPostersApi = {
    loadAll: () => axios.get(endpoints.jobPosters)
};
