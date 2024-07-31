// screens/EmployeeListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../store/employeeSlice';


const EmployeeListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const [search, setSearch] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (search) {
      setFilteredEmployees(
        employees.filter((employee) =>
          employee.employee_name?.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredEmployees(employees);
    }
  }, [search, employees]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search Employees"
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.item}>
      <Text style={{fontSize:16,color:'#000'}}>Name</Text>
      <Text style={{fontSize:16,color:'#000'}}>Salary</Text>

      </View>
      <FlatList
        data={filteredEmployees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>{
          console.log("item==>",item)
        return (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('EmployeeDetail', { id: item.id })}
          >
            <Text style={{fontSize:16,color:'#000'}}>{item.employee_name}</Text>
            <Text style={{fontSize:16,color:'#000'}}>{item.employee_salary}</Text>
          </TouchableOpacity>
        )}}
      />
      <Button title="Add Employee" onPress={() => navigation.navigate('CreateEmployee')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#fff'
  },
  search: {
    padding: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    color:'#000'
  },
  item: {
    padding: 16,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center'
  },
});

export default EmployeeListScreen;
