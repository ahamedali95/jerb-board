import axios from 'axios'

import { CategoriesApiResponse } from '../../types'
import { endpoints } from '../endpoints'

export interface CategoriesApi {
  loadAll: () => Promise<CategoriesApiResponse>
}

export const categories: CategoriesApi = {
  loadAll: () => axios.get(endpoints.categories),
}
