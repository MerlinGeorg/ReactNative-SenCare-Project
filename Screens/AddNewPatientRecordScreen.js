import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { appThemeColor } from "../Styles/colors";

const NewPatientRecordScreen = ({ route, navigation }) => {
 // const { patientId, onAddRecord } = route.params || {}; // Receiving the patientId and callback
  const { patientId } = route.params || {}; 
  const [dateTime, setDateTime] = useState(new Date());
  const [dataType, setDataType] = useState("");
  const [readingValue, setReadingValue] = useState("");

  const dataTypes = [
    "Blood Pressure",
    "Heart Rate",
    "Temperature",
    "Cholestrol",
    "Blood Sugar",
    "Oxygen Level",
  ];

  const handleSubmit = async () => {
    const newRecord = {
      date_time: new Date().toISOString(),
      type_of_data: dataType,               // Correct backend field name
      reading: readingValue,
    };

    // Call the callback passed via route to add this new record to Clinical Data
  //   onAddRecord(newRecord);
  //   alert("Record added successfully!");
  //   navigation.goBack();
  // };

  try {
    // Send the data to the backend API
    const response = await fetch(`https://mycentennialtestdeploymentapp-bjandcdgcscmgpbu.canadacentral-01.azurewebsites.net/api/patient/create/${patientId}/clinical-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clinical_data: [newRecord]
      }),
    });
    //console.log(patientId)
   // console.log(newRecord)

    // Handle the response
    if (response.ok) {
      const data = await response.json();
      alert("Record added successfully!");
      navigation.goBack();
    } else {
      const errorData = await response.json();
      console.error("Error from backend:", errorData);
      alert("Failed to add record. Please try again.");
    }
  } catch (error) {
    console.error("Error adding record:", error);
    alert("Error adding record. Please try again.");
  }
  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Date/Time"
        value={dateTime}
        onChangeText={setDateTime}
      />

      <Text style={styles.label}>Type of Data</Text>
      {/* Dropdown for Type of Data */}
      <View style={styles.picker}>
        <Picker
          selectedValue={dataType}
          onValueChange={(itemValue) => setDataType(itemValue)}
          style={styles.picker}
        >
          {dataTypes.map((type, index) => (
            <Picker.Item key={index} label={type} value={type} />
          ))}
        </Picker>
      </View>

      <TextInput
        placeholder="Reading Value"
        value={readingValue}
        onChangeText={setReadingValue}
        style={styles.input}
      />
      <Button title="Save" onPress={handleSubmit} color={appThemeColor}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, borderColor: "gray", padding: 8, marginBottom: 10 },
  picker: {
    height: 50,
    width: "100%", // Set width to align with the column headers
    borderWidth: 1, // Add border width
    borderColor: "gray", // Set border color
    borderRadius: 5, // Round corners for a softer look
    paddingHorizontal: 10, // Add padding inside the picker for better spacing
    marginBottom: 20,
  },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
});

export default NewPatientRecordScreen;