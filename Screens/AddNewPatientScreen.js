import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function AddNewPatientScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [healthStatus, setHealthStatus] = useState('');
  const [healthConditions, setHealthConditions] = useState('');

  const handleSave = () => {
    const newPatient = {
      name,
      age,
      healthStatus,
      healthConditions,
      photo,
    };
    console.log(newPatient); 
    alert('Patient Saved!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Patient</Text>

      <Text>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter Name"
      />

      <Text>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Enter Age"
        keyboardType="numeric"
      />

      <Text>Health Status</Text>
      <Checkbox
        style={pickerSelectStyles}
        onPress={(value) => setHealthStatus(value)}
        status={[
          { label: 'Normal', value: 'Normal' },
          { label: 'Critical', value: 'Critical' },
        ]}
        placeholder={{ label: 'Select Health Status', value: null }}
      />

      <Text>Health Conditions</Text>
      <TextInput
        style={styles.textArea}
        value={healthConditions}
        onChangeText={setHealthConditions}
        placeholder="Describe previous medical issues history"
        multiline={true}
        numberOfLines={4}
      />

      <Text>Upload Photo</Text>
      <TouchableOpacity >
        <Text style={styles.link}>Choose File</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    textAlignVertical: 'top',
  },
  link: {
    color: '#007bff',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 4,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is not overlapping with the icon
    marginBottom: 16,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is not overlapping with the icon
    marginBottom: 16,
  },
});
