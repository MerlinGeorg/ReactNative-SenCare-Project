import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";
import { appThemeColor } from "../Styles/colors";

export default function EditPatientDetailsScreen({ route, navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const [healthConditions, setHealthConditions] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [photo, setPhoto] = useState(null);

//   const { refreshPatients } = route.params;
//   const patientId = route.params.patientId;

const { patientId, refreshPatients } = route.params;

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`https://mycentennialtestdeploymentapp-bjandcdgcscmgpbu.canadacentral-01.azurewebsites.net/api/patient/fetch/${patientId}`);
        
        const data = await response.json();
        //console.log(data)
        setName(data.name);
        setAge(data.age.toString());
        setHealthStatus(data.health_status);
        setHealthConditions(data.health_conditions);
        setRoomNumber(data.room_number.toString());
        if (data.photo) {
          setPhoto({ uri: data.photo });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  const handleSave = async () => {
    const updatedPatient = {
      name,
      age: parseInt(age),
      health_status: healthStatus,
      health_conditions: healthConditions,
      photo: photo ? photo.uri : null,
      room_number: parseInt(roomNumber),
    };

    try {
      const response = await axios.put(
        `https://mycentennialtestdeploymentapp-bjandcdgcscmgpbu.canadacentral-01.azurewebsites.net/api/patient/update/${patientId}`,
        updatedPatient
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("Patient Details Updated!");
        refreshPatients();
        navigation.goBack();
      } else {
        console.error("Unexpected response status:", response.status);
        alert("Failed to update patient data. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error from backend:", error.response.data);
        console.error("Error status:", error.response.status);
      } else {
        console.error("Network or other error:", error);
      }
      alert("Failed to update patient data. Please try again.");
    }
  };

  const choosePhoto = async () => {
    launchImageLibrary({ mediaType: "photo", quality: 0.5 }, (response) => {
      if (response.didCancel) {
        console.log("User canceled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        setPhoto(response.assets[0]);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Patient Details</Text>

      <Text>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
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
        multiline={true}
        numberOfLines={4}
      />

      <Text>Room Number</Text>
      <TextInput
        style={styles.input}
        value={roomNumber}
        onChangeText={setRoomNumber}
        keyboardType="numeric"
      />

      <Text>Upload Photo</Text>
      <TouchableOpacity onPress={choosePhoto}>
        <Text style={styles.link}>Choose File</Text>
      </TouchableOpacity>

      {photo && (
        <View style={styles.imagePreview}>
          <Text>Current Photo:</Text>
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
    paddingVertical: 12,
    borderRadius: 4,
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
    marginRight: 16,
  },
});