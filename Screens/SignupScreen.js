import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import { appThemeColor } from '../Styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignupScreen({navigation}) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () =>{
    if(!name || !email || !password || !confirmPassword){
        Alert.alert("Error",'Please fill out all fields.')
        return;
    } 

    if(password !== confirmPassword){
        Alert.alert("Error", "Passwords do not match.");
        return;
    }


    try{
         // Store user credentials in AsyncStorage
        const userData = {name, email, password}
        await AsyncStorage.setItem("userData", JSON.stringify(userData))
        Alert.alert("Success", "Account created successfully!")
         navigation.replace('Login')

    } catch (error) {
        console.error("Error saving user credentials:", error);
        Alert.alert("Error", "Failed to create account. Please try again.");
    }
  }

  return (
    
    <View style={styles.container}>
      

      <Text style={styles.title}>Create Account</Text>

      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder='Enter your name' returnKeyType='next'/>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder='Enter your email' />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder='Enter Password' secureTextEntry={true}/>
      <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder='Re-enter the password' />
     

      <TouchableOpacity style={[styles.button, {backgroundColor: appThemeColor} ]}
      onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
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

  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 32
  },

  title:{
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
   // color: 'white' 
  },

  button: {
    marginTop: 40,
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center' //make width to wrap the button text along with centering button
  },

  buttonText:{
    color: '#fff',
    fontWeight: 'bold'
  }
});
