import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation } from '@react-navigation/native';
import { clearSelectedEmployee, deleteEmployee, fetchEmployee, fetchEmployees, updateEmployee } from '../store/employeeSlice';


const EmployeeDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id } = route.params;
  const employee = useSelector((state) => state.employees.selectedEmployee);
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      await dispatch(fetchEmployee(id));
      setLoading(false);
    };
    fetchEmployeeData();

    return () => {
      dispatch(clearSelectedEmployee());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (employee) {
      setName(employee.employee_name);
      setSalary(employee.employee_salary);
      setAge(employee.employee_age);
    }
  }, [employee]);

  const handleUpdate = async () => {
    const updatedData = { name, salary, age };
    await dispatch(updateEmployee({ id: employee.id, data: updatedData }));
    await dispatch(fetchEmployees()); // Refresh the employee list
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Employee',
      'Are you sure you want to delete this employee?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: async () => {
            await dispatch(deleteEmployee(employee.id));
            await dispatch(fetchEmployees()); // Refresh the employee list
            navigation.goBack();
          }
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!employee) {
    return (
      <View style={styles.container}>
        <Text>No employee data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text>Salary:</Text>
      <TextInput
        style={styles.input}
        value={salary}
        onChangeText={setSalary}
        keyboardType="numeric"
      />
      <Text>Age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Button title="Update" onPress={handleUpdate} />
      <Button title="Delete" onPress={handleDelete} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
});

export default EmployeeDetailScreen;
