import { AxiosResponse } from 'axios'

export interface Category {
  id: number
  name: string
}

export interface Location {
  id: number
  name: string
  street_address_1?: string
  street_address_2?: string
  city: string
  state: string
  zip_code: string
}

export interface JobPoster {
  id: number
  full_name: string
}

export interface JobPosting {
  id: number
  title: string
  status: string
  description?: string
  posted_at: string
  category: Category
  location: Location
  job_poster: JobPoster
}

export interface JobPostingsApiResponse extends AxiosResponse {
  data: JobPosting[]
}
