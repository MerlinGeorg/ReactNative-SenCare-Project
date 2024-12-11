import { useState } from "react";
import { useEffect, useCallback } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput
} from "react-native";
import GradientBackground from '../Styles/GradientBackground';
import Icon from "react-native-vector-icons/FontAwesome";
import SearchBar from "../Components/SearchPatient";
import { appThemeColor } from "../Styles/colors";

export default function ResidentListScreen({ navigation }) {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      await fetch(
        "https://mycentennialtestdeploymentapp-bjandcdgcscmgpbu.canadacentral-01.azurewebsites.net/api/patient/fetch"
      )
        .then((response) => response.json())
        .then((data) => {
          //console.log(data)
          setPatients(data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePatient = async (patientId) => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete this patient?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: async () => {
            try {
              const response = await fetch(
                `https://mycentennialtestdeploymentapp-bjandcdgcscmgpbu.canadacentral-01.azurewebsites.net/api/patient/delete/${patientId}`,
                {
                  method: 'DELETE',
                }
              );
              if (response.ok) {
                // If deletion is successful, refresh the patient list
                fetchPatients();
              } else {
                console.error("Failed to delete patient");
                Alert.alert("Error", "Failed to delete patient. Please try again.");
              }
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "An error occurred while deleting the patient.");
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (

    <View style={styles.row}>
      <Text style={styles.column}>{item.name}</Text>
      <Text style={styles.column}>{item.age}</Text>
      <View style={styles.iconContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PatientDetails", { patientId: item._id })
        }
      >
        <Icon name="eye" size={24} color="pink" style={styles.icon} />
      </TouchableOpacity>

      {/* Edit Icon */}
      <TouchableOpacity
        onPress={() => 
          navigation.navigate("EditPatient", { 
            patientId: item._id, 
            refreshPatients: fetchPatients 
          })
        }
      >
        <Icon name="edit" size={24} color={appThemeColor} style={styles.icon} />
      </TouchableOpacity>

      {/* Delete Icon */}
      <TouchableOpacity
        onPress={() => handleDeletePatient(item._id)}
      >
        <Icon name="trash" size={24} color="red" style={styles.icon} />
      </TouchableOpacity>
      </View>
    </View>
    
  );

  const handleAddResident = () => {
    navigation.navigate("NewPatient", {
      refreshPatients: fetchPatients, // Pass the refresh function as a parameter
    });
  };

  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
  }, []);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return (
    <GradientBackground>
    <View style={styles.container}>

      <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search by name"
        />

      {/* Column Titles */}
      <View style={styles.headerRow}>
        <Text style={styles.headerColumn}>Resident Name</Text>
        <Text style={styles.headerColumn}>Age</Text>
        <Text style={styles.headerColumn}>Action(s)</Text>
      </View>

      {filteredPatients.length === 0 ? (
          <View style={styles.noResultContainer}>
            <Text style={styles.noResultText}>No residents found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredPatients}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderItem}
          />
        )}


      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleAddResident}
      >
        <Text style={styles.buttonText}>Add Resident</Text>
      </TouchableOpacity>

    </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  column: { flex: 1, color: 'white',
    fontSize: 18
   },
  action: { color: "blue" },
  searchBar: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
   flexWrap: 'wrap'
  },
  headerColumn: {
    flex: 1,
    fontWeight: "bold",
    color: 'white', 
    fontSize: 18,
    flexWrap: 'wrap',
    marginRight: 5
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end", // Align icons to the right
    gap: 10, // Use gap for spacing
  },
  buttonContainer:{
    marginTop: 30,
    alignItems: "center",
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    borderColor: appThemeColor,
    borderWidth: 2
  },

  buttonText: {
    color: appThemeColor,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22
  },
});
