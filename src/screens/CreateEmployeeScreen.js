// screens/CreateEmployeeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { createEmployee, fetchEmployees } from '../store/employeeSlice';

const CreateEmployeeScreen = () => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [age, setAge] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = () => {
    const newEmployee = {
      employee_name: name,
      employee_salary: salary,
      employee_age: age,
      profile_image: profileImage,
    };
    dispatch(createEmployee(newEmployee)).then(() => {
      dispatch(fetchEmployees()); // Refresh the employee list
      navigation.goBack();
    });
  };

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
      <Text>Profile Image URL:</Text>
      <TextInput
        style={styles.input}
        value={profileImage}
        onChangeText={setProfileImage}
      />
      <Button title="Create Employee" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

export default CreateEmployeeScreen;
