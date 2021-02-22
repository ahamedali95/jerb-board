import { Category, JobPoster, JobPosting, Location } from './types'

export const createCategory = (overrides: Partial<Category> = {}): Category => ({
  id: -1,
  name: 'job-listing-category-name',
  ...overrides,
})

export const createJobPostingLocation = (overrides: Partial<Location> = {}): Location => ({
  id: -1,
  name: 'job-listing-location-name',
  street_address_1: 'job-listing-location-address-1',
  street_address_2: 'job-listing-location-address-2',
  city: 'job-listing-location-city',
  state: 'job-listing-location-state',
  zip_code: 'job-listing-location-zip',
  ...overrides,
})

export const createJobPoster = (overrides: Partial<JobPoster> = {}): JobPoster => ({
  id: -1,
  full_name: 'job-listing-poster-full-name',
  ...overrides,
})

export const createJobPosting = (overrides: Partial<JobPosting> = {}): JobPosting => ({
  id: -1,
  title: 'job-listing-title',
  status: 'job-listing-status',
  posted_at: '2020-12-30T12:00:00Z',
  category: createCategory(),
  location: createJobPostingLocation(),
  job_poster: createJobPoster(),
  ...overrides,
})
