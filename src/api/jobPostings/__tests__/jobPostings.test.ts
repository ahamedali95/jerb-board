import axios from 'axios'

import { endpoints } from '../../endpoints'
import { jobPostings } from '..'

describe('Job Postings API', () => {
  describe(jobPostings.loadAll, () => {
    it('makes an API request to the correct endpoint', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [] })

      await jobPostings.loadAll()

      expect(axios.get).toHaveBeenCalledWith(endpoints.jobPostings)
    })
  })
})
