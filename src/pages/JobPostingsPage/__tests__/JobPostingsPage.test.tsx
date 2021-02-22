import { render, screen, waitFor } from '@testing-library/react'

import { API } from '../../../api'
import {
  createCategory,
  createJobPosting,
  createJobPostingLocation,
  createJobPoster,
} from '../../../fixtures'
import { JobPostingsPage } from '..'

const waitForPageLoad = async () =>
  await waitFor(() => expect(screen.getByText('Category')).toBeInTheDocument())

describe(JobPostingsPage, () => {
  const jobListingPostedAt = '2020-12-30'
  const jobListingCategory = createCategory({ name: 'Software Engineer' })
  const jobListingLocation = createJobPostingLocation({ name: 'The Gnar Company' })
  const jobPoster = createJobPoster({ full_name: 'Joe Schmoe' })
  const jobListing = createJobPosting({
    category: jobListingCategory,
    job_poster: jobPoster,
    location: jobListingLocation,
    posted_at: `${jobListingPostedAt}T12:00:00Z`,
    status: 'open',
  })

  beforeEach(() => {
    jest.spyOn(API.jobPostings, 'loadAll').mockResolvedValue({ data: [jobListing] })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the page header', async () => {
    render(<JobPostingsPage />)

    await waitForPageLoad()

    expect(screen.getByRole('heading', { name: 'Job Postings' })).toBeInTheDocument()
  })

  it('lists the required attributes for each job listing', async () => {
    render(<JobPostingsPage />)

    await waitForPageLoad()

    expect(screen.getByText(jobListingPostedAt)).toBeInTheDocument()
    expect(screen.getByText(jobListing.title)).toBeInTheDocument()
    expect(screen.getByText(jobListing.status)).toBeInTheDocument()
    expect(screen.getByText(jobPoster.full_name)).toBeInTheDocument()
    expect(screen.getByText(jobListingCategory.name)).toBeInTheDocument()
    expect(screen.getByText(jobListingLocation.name)).toBeInTheDocument()
  })
})
