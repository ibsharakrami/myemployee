// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import EmployeeListScreen from '../screens/EmployeeListScreen';
import EmployeeDetailScreen from '../screens/EmployeeDetailScreen';
import store from '../store/store';
import CreateEmployeeScreen from '../screens/CreateEmployeeScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const EmployeeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="EmployeeList" component={EmployeeListScreen} />
    <Stack.Screen name="EmployeeDetail" component={EmployeeDetailScreen} />
    <Stack.Screen name="CreateEmployee" component={CreateEmployeeScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Employees" component={EmployeeStack} />
          {/* Add other tabs here if needed */}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
