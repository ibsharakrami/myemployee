// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from './employeeSlice';

const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});

export default store;
