import axios from 'axios';
import { RandomUserApiResponse } from '../types/user';
import {API_CONFIG} from '../lib/api'

const API_BASE_URL = API_CONFIG.BASE_URL;

export const userService = {
  // Fetch a single random user
  fetchRandomUser: async (): Promise<RandomUserApiResponse> => {
    try {
      const response = await axios.get<RandomUserApiResponse>(API_BASE_URL!);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch random user');
    }
  },

  // Fetch multiple random users
  fetchMultipleUsers: async (count: number): Promise<RandomUserApiResponse> => {
    try {
      const response = await axios.get<RandomUserApiResponse>(
        `${API_BASE_URL}?results=${count}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch multiple users');
    }
  },

  // Fetch users with specific nationality
  fetchUsersByNationality: async (
    nationality: string,
    count: number = 1
  ): Promise<RandomUserApiResponse> => {
    try {
      const response = await axios.get<RandomUserApiResponse>(
        `${API_BASE_URL}?nat=${nationality}&results=${count}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch users by nationality');
    }
  },
};