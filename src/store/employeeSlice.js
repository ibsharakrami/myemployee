import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import employeeApi from '../api/employeeApi';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await employeeApi.getEmployees();
  return response;
});

export const fetchEmployee = createAsyncThunk('employees/fetchEmployee', async (id) => {
  const response = await employeeApi.getEmployee(id);
  return response;
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
  await employeeApi.deleteEmployee(id);
  return id;
});

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async ({ id, data }) => {
  const response = await employeeApi.updateEmployee(id, data);
  return response;
});

export const createEmployee = createAsyncThunk('employees/createEmployee', async (data) => {
  const response = await employeeApi.createEmployee(data);
  return response;
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
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedEmployee = action.payload;
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((employee) => employee.id !== action.payload);
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
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export const { clearSelectedEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;
