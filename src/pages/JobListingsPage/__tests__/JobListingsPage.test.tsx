import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'

import * as API from '../../../api'
import { JobListingsPage } from '..'
import {
  createJobListing,
  createJobListingCategory,
  createJobListingLocation,
  createJobPoster,
} from '../../../fixtures'

const waitForPageLoad = async () =>
  await waitFor(() => expect(screen.getByText('Category')).toBeInTheDocument())

describe(JobListingsPage, () => {
  const jobListingPostedAt = '2020-12-30'
  const jobListingCategory = createJobListingCategory({ name: 'Software Engineer' })
  const jobListingLocation = createJobListingLocation({ name: 'The Gnar Company' })
  const jobPoster = createJobPoster({ full_name: 'Joe Schmoe' })
  const jobListing = createJobListing({
    category: jobListingCategory,
    job_poster: jobPoster,
    location: jobListingLocation,
    posted_at: `${jobListingPostedAt}T12:00:00Z`,
    status: 'open',
  })

  beforeEach(() => {
    jest.spyOn(API, 'getJobListings').mockResolvedValue({ data: [jobListing] })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the page header', async () => {
    render(<JobListingsPage />)

    await waitForPageLoad()

    expect(screen.getByRole('heading', { name: 'Job Listings' })).toBeInTheDocument()
  })

  it('lists the required attributes for each job listing', async () => {
    render(<JobListingsPage />)

    await waitForPageLoad()

    expect(screen.getByText(jobListingPostedAt)).toBeInTheDocument()
    expect(screen.getByText(jobListing.title)).toBeInTheDocument()
    expect(screen.getByText(jobListing.status)).toBeInTheDocument()
    expect(screen.getByText(jobPoster.full_name)).toBeInTheDocument()
    expect(screen.getByText(jobListingCategory.name)).toBeInTheDocument()
    expect(screen.getByText(jobListingLocation.name)).toBeInTheDocument()
  })
})
