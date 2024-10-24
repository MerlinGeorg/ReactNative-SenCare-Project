import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from './Screens/DashboardScreen';
import LoginScreen from './Screens/LoginScreen';
import ResidentListScreen from './Screens/ResidentListScreen';
import AddNewPatientScreen from './Screens/AddNewPatientScreen';
import AddNewPatientRecordScreen from './Screens/AddNewPatientRecordScreen';
import ViewPatientDetailsScreen from './Screens/ViewPatientDetailsScreen';
import ViewPatientRecordScreen from './Screens/ViewPatientRecordScreen';
import TaskDetailsScreen from './Screens/TaskDetailsScreen';


export default function App() {

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Login' component={LoginScreen}/>
      <Stack.Screen name='Dashboard' component={DashboardScreen}/>
      <Stack.Screen name='TaskDetails' component={TaskDetailsScreen}/>
      <Stack.Screen name='ResidentList' component={ResidentListScreen}/>
      <Stack.Screen name='PatientDetails' component={ViewPatientDetailsScreen}/>
      <Stack.Screen name='NewPatientRecord' component={AddNewPatientRecordScreen}/>
      <Stack.Screen name='PatientRecord' component={ViewPatientRecordScreen}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
