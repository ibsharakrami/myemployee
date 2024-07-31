import axios from 'axios';
import { getFromCache, saveToCache } from '../utils/cache';



const BASE_URL = 'https://dummy.restapiexample.com/api/v1';

const getEmployees = async () => {
  const cachedData = await getFromCache('employees');
  if (cachedData) return cachedData;

  const response = await axios.get(`${BASE_URL}/employees`);
  saveToCache('employees', response.data.data);
  return response.data.data;
};

const getEmployee = async (id) => {
  const response = await axios.get(`${BASE_URL}/employee/${id}`);
  return response.data.data;
};

const createEmployee = async (data) => {
  const response = await axios.post(`${BASE_URL}/create`, data);
  return response.data.data;
};

const updateEmployee = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/update/${id}`, data);
  return response.data.data;
};

const deleteEmployee = async (id) => {
  await axios.delete(`${BASE_URL}/delete/${id}`);
};

export default {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
