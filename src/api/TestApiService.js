import { apiClient } from './ApiClient'

export const retrieveAllTestApi
    = () => apiClient.get(`/tests`);

