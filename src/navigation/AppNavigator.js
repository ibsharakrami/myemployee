import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeListScreen from '../screens/EmployeeListScreen';
import EmployeeDetailScreen from '../screens/EmployeeDetailScreen';
import CreateEmployeeScreen from '../screens/CreateEmployeeScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const EmployeeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Employees" component={EmployeeListScreen} />
    <Stack.Screen name="Employee Detail" component={EmployeeDetailScreen} />
    <Stack.Screen name="Create Employee" component={CreateEmployeeScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="EmployeeStack" component={EmployeeStack} options={{ tabBarLabel: 'Employees' }} />
        <Tab.Screen name="CreateEmployee" component={CreateEmployeeScreen} options={{ tabBarLabel: 'Create Employee' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
