// store/employeesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getFromCache, saveToCache } from '../utils/cache';

const BASE_URL = 'https://dummy.restapiexample.com/api/v1';

// Fetch employees with caching
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const cachedData = await getFromCache('employees');
  if (cachedData) return cachedData;

  const response = await axios.get(`${BASE_URL}/employees`);
  console.log("Fetched employees: ", response.data.data); // Add this line
  saveToCache('employees', response.data.data);
  return response.data.data;
});

// Fetch a single employee
export const fetchEmployee = createAsyncThunk('employees/fetchEmployee', async (id) => {
  const response = await axios.get(`${BASE_URL}/employee/${id}`);
  return response.data.data;
});

// Create a new employee
export const createEmployee = createAsyncThunk('employees/createEmployee', async (data, { dispatch }) => {
  const response = await axios.post(`${BASE_URL}/create`, data);
  const newEmployee = response.data.data;

  // Update the cache
  const cachedEmployees = await getFromCache('employees');
  const updatedEmployees = cachedEmployees ? [...cachedEmployees, newEmployee] : [newEmployee];
  saveToCache('employees', updatedEmployees);

  // Refresh the employee list
  dispatch(fetchEmployees());

  return newEmployee;
});

// Update an existing employee
export const updateEmployee = createAsyncThunk('employees/updateEmployee', async ({ id, data }, { dispatch }) => {
  const response = await axios.put(`${BASE_URL}/update/${id}`, data);
  const updatedEmployee = response.data.data;

  // Refresh the employee list
  dispatch(fetchEmployees());

  return updatedEmployee;
});

// Delete an employee
export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id, { dispatch }) => {
  await axios.delete(`${BASE_URL}/delete/${id}`);

  // Update the cache
  const cachedEmployees = await getFromCache('employees');
  if (cachedEmployees) {
    const updatedEmployees = cachedEmployees.filter(employee => employee.id !== id);
    saveToCache('employees', updatedEmployees);
  }

  // Refresh the employee list
  dispatch(fetchEmployees());

  return id;
});

const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    list: [],
    selectedEmployee: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchEmployees.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchEmployees.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.list = action.payload;
      console.log("State list updated: ", state.list); // Add this line
    })
    .addCase(fetchEmployees.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      console.log("Fetch employees error: ", action.error.message); // Add this line
    })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedEmployee = action.payload;
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.list.findIndex((employee) => employee.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        if (state.selectedEmployee && state.selectedEmployee.id === action.payload.id) {
          state.selectedEmployee = action.payload;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((employee) => employee.id !== action.payload);
      });
  },
});

export const { clearSelectedEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
