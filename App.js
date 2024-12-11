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
import EditPatientDetailsScreen from './Screens/EditPatientDetailsScreen';
import SignupScreen from './Screens/SignupScreen';
import LandingScreen from './Screens/LandingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function App() {

  const Stack = createStackNavigator(); 
  // const Tab = createBottomTabNavigator();

  // function MyTabs (){
  //   return (
  //     <Tab.Navigator>
  //       <Tab.Screen name="Home" component={DashboardScreen} />
  //       <Tab.Screen name="Patients" component={ResidentListScreen} />
  //       <Tab.Screen name="Tasks" component={TaskDetailsScreen} />
  //     </Tab.Navigator>
  //   );
  // }

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='SenCare' component={LandingScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
      <Stack.Screen name='Login' component={LoginScreen}/>

      {/* <Stack.Screen 
          name="HomeTabs" 
          component={MyTabs} 
          options={{ headerShown: false }} 
        /> */}

      <Stack.Screen name='Dashboard' component={DashboardScreen}/>
      <Stack.Screen name='TaskDetails' component={TaskDetailsScreen}/>
      <Stack.Screen name='NewPatient' component={AddNewPatientScreen}/>
      <Stack.Screen name='ResidentList' component={ResidentListScreen}/>
      <Stack.Screen name='PatientDetails' component={ViewPatientDetailsScreen}/>
      <Stack.Screen name='EditPatient' component={EditPatientDetailsScreen}/>
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
