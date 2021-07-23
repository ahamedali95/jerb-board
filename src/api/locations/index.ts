import axios from 'axios';

import { LocationApiResponse } from '../../types';
import { endpoints } from '../endpoints';

export interface LocationsApi {
    loadAll: () => Promise<LocationApiResponse>;
}

export const locations: LocationsApi = {
    loadAll: () => axios.get(endpoints.locations)
};
