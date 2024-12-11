import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import { appThemeColor } from '../Styles/colors';


export default function LoginScreen({navigation}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () =>{

    if(!username || !password ){
      Alert.alert('Error','Either Username or password is empty')
      return;
      
    }

     // Retrieve stored credentials
    try {

      const storedCredentials = await AsyncStorage.getItem("userData");
      if(storedCredentials) {
        const { name, email: storedUsername, password: storedPassword } = JSON.parse(storedCredentials)

        if(username === storedUsername && password === storedPassword) {

          await AsyncStorage.setItem('isLoggedIn', 'true') // Set session state

          Alert.alert("Success", "Login Success");
          navigation.replace('Dashboard', {name}); 
        } else {
          Alert.alert("Error", "Invalid username or password.");
        }
      } else {
        Alert.alert("Error", "No account found. Please sign up first.");
      }

      
    } catch (error) {
      console.log("Unable to fetch user data", error)
      Alert.alert("Error", "User does not exists")
    }
    
  }

  return (
    
    <View style={styles.container}>
      

      <Text style={styles.title}>Log In</Text>

      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder='Enter your Email'/>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder='Enter the password'/>
  
      <TouchableOpacity onPress={handleLogin}
      style={[styles.button, {backgroundColor: appThemeColor}]}>
        <Text style={styles.buttonText }>Login</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },

  input: { 
    height: 40, 
   // borderColor: 'white', 
    borderWidth: 1, 
    marginBottom: 12, 
    paddingLeft: 8,
    //color: 'white' 
  },

  button: {
    marginTop: 40,
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center'
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }

});
