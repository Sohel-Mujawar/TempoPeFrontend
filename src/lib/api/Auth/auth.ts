import {CustomerRegistrationPayload, UserAuthenticationResponse} from '@/types';
import {api, unAuthenticatedApi} from '@/utils/axios';

// Register a new customer
export const registerCustomer = async (
  payload: CustomerRegistrationPayload,
) => {
  console.log('====================================');
  console.log('payload', payload);
  console.log('====================================');
  const response = await api.post('/register/customer', payload);
  return response.data;
};

// Login a user
export const loginCustomer = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await unAuthenticatedApi.post('/users/login', credentials);
  return response.data;
};
