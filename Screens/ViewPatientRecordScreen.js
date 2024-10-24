import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { useState, useEffect } from "react";

export default function ViewPatientRecordScreen({ route, navigation }) {
  const { patientId } = route.params;
  const [clinicalData, setClinicalData] = useState([]);

  useEffect(() => {
    const fetchClinicalData = async () => {
      try {
        fetch(
          `https://dd6a-2607-fea8-33dc-6900-704d-e0f6-63f6-e8dd.ngrok-free.app/api/patient/fetch/${patientId}/clinical-data`
        )
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            setClinicalData(data);
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchClinicalData();
  }, [patientId]);

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.column}>{item.date_time}</Text>
      <Text style={styles.column}>{item.type_of_data}</Text>
      <Text style={styles.column}>{item.reading}</Text>
    </View>
  );

  // Function to add new record
  const handleAddRecord = (newRecord) => {
    // Ensure the new record has the same structure as the fetched clinical data
    const formattedRecord = {
      date_time: newRecord.dateTime,
      type_of_data: newRecord.dataType,
      reading: newRecord.readingValue,
      _id: Date.now().toString(), // Using a fallback unique key
    };

    // Update the state with the new record
    setClinicalData((prevData) => [...prevData, formattedRecord]);
  };

  return (
    <View style={styles.container}>

       {/* Column Titles */}
       <View style={styles.headerRow}>
        <Text style={styles.headerColumn}>Date/Time</Text>
        <Text style={styles.headerColumn}>Type of Data</Text>
        <Text style={styles.headerColumn}>Reading</Text>
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
            onAddRecord: handleAddRecord, // Pass the callback to add the new record
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
