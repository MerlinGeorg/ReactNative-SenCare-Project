import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { useFocusEffect } from '@react-navigation/native';

export default function ViewPatientRecordScreen({ route, navigation }) {
  const { patientId } = route.params;
  const [clinicalData, setClinicalData] = useState([]);

  const fetchClinicalData = async () => {
    try {
      const response = await fetch(`https://b638-2607-fea8-33dc-6900-ecd6-7728-6116-2d6c.ngrok-free.app/api/patient/fetch/${patientId}/clinical-data`);
      const data = await response.json();
    //  console.log(data);
      setClinicalData(data);  // Update the state with the new data
    } catch (error) {
      console.error("Error fetching clinical data:", error);
    }
  };

  // Refresh data whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchClinicalData();  // Call the fetch function when the screen is focused
    }, [patientId])  // Make sure the effect re-runs when patientId changes
  );

   // Function to get the normal range based on the type of data
   const getNormalRange = (typeOfData) => {
    switch (typeOfData) {
      case "Blood Pressure":
        return "90/60 - 120/80 (Systolic/Diastolic)";
      case "Heart Rate":
        return "60 - 100 bpm";
      case "Temperature":
        return "36.5°C - 37.5°C";
      case "Cholesterol":
        return "Less than 200 mg/dL";
      case "Blood Sugar":
        return "70 - 100 mg/dL (fasting)";
      case "Oxygen Level":
        return "95% - 100%";
      default:
        return "No range defined";
    }
  };

  // const getFormattedDate = (date_time)=>{
  //   return format(new Date(date_time), 'MM/dd/yyyy')
  // };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      {/* <Text style={styles.column}>{getFormattedDate(item.date_time)}</Text> */}
      <Text style={styles.column}>{moment(item.date_time).format("MM/DD/YYYY")}</Text>
      <Text style={styles.column}>{item.type_of_data}</Text>
      <Text style={styles.column}>{item.reading}</Text>
      <Text style={styles.column}>{getNormalRange(item.type_of_data)}</Text>
    </View>
  );

  // Function to add new record
  // const handleAddRecord = (newRecord) => {
  //   // Ensure the new record has the same structure as the fetched clinical data
  //   const formattedRecord = {
  //     date_time: newRecord.dateTime,
  //     type_of_data: newRecord.dataType,
  //     reading: newRecord.readingValue,
  //     _id: Date.now().toString(), // Using a fallback unique key
  //   };

  //   // Update the state with the new record
  //   setClinicalData((prevData) => [...prevData, formattedRecord]);
  // };

  return (
    <View style={styles.container}>

       {/* Column Titles */}
       <View style={styles.headerRow}>
        <Text style={styles.headerColumn}>Date/Time</Text>
        <Text style={styles.headerColumn}>Type of Data</Text>
        <Text style={styles.headerColumn}>Reading</Text>
        <Text style={styles.headerColumn}>Normal Range</Text>
      </View>

      <FlatList
        data={clinicalData}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />

      <Button
        onPress={() =>
          navigation.navigate("NewPatientRecord", {
            patientId,
          //  onAddRecord: handleAddRecord, // Pass the callback to add the new record
          })
        }
       title="Add New Patient Record"
      >
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  column: { flex: 1 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  headerColumn: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
  },
});
