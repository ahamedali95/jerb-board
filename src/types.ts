export interface JobListingCategory {
  id: number
  name: string
}

export interface JobListingLocation {
  id: number
  name: string
  street_address_1?: string
  street_address_2?: string
  city: string
  state: string
  zip_code: string
}

export interface JobListingPoster {
  id: number
  full_name: string
}

export interface JobListing {
  id: number
  title: string
  status: string
  description?: string
  posted_at: string
  category: JobListingCategory
  location: JobListingLocation
  job_poster: JobListingPoster
}

export interface JobListingResults {
  data: JobListing[]
}
