import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Alert
} from "react-native";
import { RadioButton } from "react-native-paper";
import axios from "axios";
//import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from 'expo-image-picker';
import { appThemeColor } from "../Styles/colors";

export default function AddNewPatientScreen({ route, navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [healthConditions, setHealthConditions] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [photo, setPhoto] = useState(null);

  const { refreshPatients } = route.params;

  //validation
  const validateForm = () => {
    if(!name.trim()){
      Alert.alert("Validation Error", "Name is required");
      return false;
    }

    if(!age || isNaN(age) ||parseInt(age) <=0){
      Alert.alert("Validation Error", "Please enter a valid age.");
      return false;
    }

    if(!healthStatus){
      Alert.alert("Validation Error", "Please select a health status.");
      return false;
    }
  }


  const handleSave = async () => {

    if(!validateForm()) return;

    const newPatient = {
      name,
      age: parseInt(age),
      health_status: healthStatus,
      health_conditions: healthConditions,
      photo: photo ? photo.uri : null,
      admission_date: new Date(), // Set the admission date to the current date
      admission_number: `${Math.floor(Math.random() * 100000)}`,
      room_number: parseInt(roomNumber),
    };

    //console.log(newPatient);

    try {
      const response = await axios.post(
        "https://mycentennialtestdeploymentapp-bjandcdgcscmgpbu.canadacentral-01.azurewebsites.net/api/patient/create",
        newPatient
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("Patient Saved!");
        refreshPatients();
        navigation.goBack();
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Failed to save patient data. Please try again.");
      }
    } catch (error) {
      // If error has a response (HTTP error)
      if (error.response) {
        console.error("Error from backend:", error.response.data); // Log the backend response
        console.error("Error status:", error.response.status); // Log the status code
      } else {
        console.error("Network or other error:", error); // If no response, log the general error
      }

      alert("Failed to save patient data. Please try again.");
    }
  };

  const choosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0]);
    }
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
      <RadioButton.Group
        onValueChange={(newValue) => setHealthStatus(newValue)}
        value={healthStatus}
      >
        <View style={styles.radioButtonContainer}>
          <View style={styles.radioButton}>
            <RadioButton value="Normal" />
            <Text>Normal</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton value="Critical" />
            <Text>Critical</Text>
          </View>
        </View>
      </RadioButton.Group>

      <Text>Health Conditions</Text>
      <TextInput
        style={styles.textArea}
        value={healthConditions}
        onChangeText={setHealthConditions}
        placeholder="Describe previous medical issues history"
        multiline={true}
        numberOfLines={4}
      />

      <Text>Room Number</Text>
      <TextInput
        style={styles.input}
        value={roomNumber}
        onChangeText={setRoomNumber}
        placeholder="Enter Room Number"
        keyboardType="numeric"
      />

      <Text>Upload Photo</Text>
      <TouchableOpacity onPress={choosePhoto}>
        <Text style={styles.link}>Choose File</Text>
      </TouchableOpacity>

      {photo && (
        <View style={styles.imagePreview}>
          <Text>Selected Photo:</Text>
          <Image source={{ uri: photo.uri }} style={styles.image} />
        </View>
      )}

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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    textAlignVertical: "top",
  },
  link: {
    color: "#007bff",
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: appThemeColor,
    paddingVertical: 8, // Adjusted padding for a snug fit
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'center'
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePreview: {
    marginVertical: 16,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 8,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16, // Adds space between the radio buttons
  },
});
