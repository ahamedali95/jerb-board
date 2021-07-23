const baseURL = process.env.REACT_APP_API_ENDPOINT;

export const endpoints = {
  categories: `${baseURL}/v1/categories`,
  jobPostings: `${baseURL}/v1/job_postings`,
  locations: `${baseURL}/v1/locations`,
  jobPosters: `${baseURL}/v1/job_posters`
};
