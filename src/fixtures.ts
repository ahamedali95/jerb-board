import { JobListing, JobListingCategory, JobListingLocation, JobListingPoster } from './types'

export const createJobListingCategory = (
  overrides: Partial<JobListingCategory> = {},
): JobListingCategory => ({
  id: -1,
  name: 'job-listing-category-name',
  ...overrides,
})

export const createJobListingLocation = (
  overrides: Partial<JobListingLocation> = {},
): JobListingLocation => ({
  id: -1,
  name: 'job-listing-location-name',
  street_address_1: 'job-listing-location-address-1',
  street_address_2: 'job-listing-location-address-2',
  city: 'job-listing-location-city',
  state: 'job-listing-location-state',
  zip_code: 'job-listing-location-zip',
  ...overrides,
})

export const createJobPoster = (overrides: Partial<JobListingPoster> = {}): JobListingPoster => ({
  id: -1,
  full_name: 'job-listing-poster-full-name',
  ...overrides,
})

export const createJobListing = (overrides: Partial<JobListing> = {}): JobListing => ({
  id: -1,
  title: 'job-listing-title',
  status: 'job-listing-status',
  posted_at: '2020-12-30T12:00:00Z',
  category: createJobListingCategory(),
  location: createJobListingLocation(),
  job_poster: createJobPoster(),
  ...overrides,
})
