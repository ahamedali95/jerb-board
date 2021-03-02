import axios from 'axios'

import { categories } from '..'
import { endpoints } from '../../endpoints'

describe('Categories API', () => {
  describe(categories.loadAll, () => {
    it('makes an API request to the correct endpoint', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [] })

      await categories.loadAll()

      expect(axios.get).toHaveBeenCalledWith(endpoints.categories)
    })
  })
})
