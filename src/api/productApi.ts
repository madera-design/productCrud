import axios, { AxiosError } from 'axios';
import { Product, CreateProductInput, UpdateProductInput } from '../types/Product';

const API_URL = 'https://api.escuelajs.co/api/v1';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

export const getProduct = async (id: number): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const createProduct = async (product: CreateProductInput): Promise<Product> => {
  try {
    const response = await api.post('/products', product);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const updateProduct = async (id: number, product: UpdateProductInput): Promise<Product> => {
  try {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('API Error:', axiosError.response.data);
      throw new Error(getErrorMessage(axiosError.response.data));
    } else if (axiosError.request) {
      console.error('No response received:', axiosError.request);
      throw new Error('No response received from the server');
    } else {
      console.error('Error setting up request:', axiosError.message);
      throw new Error('Error setting up the request');
    }
  } else {
    console.error('Unexpected error:', error);
    throw new Error('An unexpected error occurred');
  }
};

const getErrorMessage = (errorData: any): string => {
  if (typeof errorData === 'string') {
    return errorData;
  }
  if (errorData.message) {
    return errorData.message;
  }
  if (Array.isArray(errorData)) {
    return errorData.map(err => err.message || JSON.stringify(err)).join(', ');
  }
  return JSON.stringify(errorData);
};