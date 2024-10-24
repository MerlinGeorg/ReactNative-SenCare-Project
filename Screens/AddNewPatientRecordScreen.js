import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const NewPatientRecordScreen = ({ route, navigation }) => {
  const { patientId, onAddRecord } = route.params || {}; // Receiving the patientId and callback
  const [dateTime, setDateTime] = useState('');
  const [dataType, setDataType] = useState('');
  const [readingValue, setReadingValue] = useState('');

  const handleSubmit = async () => {

    const newRecord = {
      dateTime,
      dataType,
      readingValue,
    };
   
        // Call the callback passed via route to add this new record to Clinical Data
      onAddRecord(newRecord);
      alert('Record added successfully!');
      navigation.goBack();
   
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Date/Time"
        value={dateTime}
        onChangeText={setDateTime}
        style={styles.input}
      />
      <TextInput
        placeholder="Type of Data (eg: Blood Pressure (X/Y mmHg))"
        value={dataType}
        onChangeText={setDataType}
        style={styles.input}
      />
      <TextInput
        placeholder="Reading Value"
        value={readingValue}
        onChangeText={setReadingValue}
        style={styles.input}
      />
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, borderColor: 'gray', padding: 8, marginBottom: 10 },
});

export default NewPatientRecordScreen;