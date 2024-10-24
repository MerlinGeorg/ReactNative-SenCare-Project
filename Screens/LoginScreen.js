import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';

export default function LoginScreen({navigation}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () =>{
    if(username == 'admin' && password == 'password'){
      navigation.navigate('Dashboard')
    } else {
      alert('Invalid Credentials')
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/cenphone logo.png')} style={styles.logo}></Image>

      <Text>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername}/>
      <Text>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword}/>
      <Button onPress={handleLogin} title='Login'/>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },

  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 32
  },

  input: { 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 12, 
    paddingLeft: 8 
  },

  forgotPassword: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline'
  }
});
