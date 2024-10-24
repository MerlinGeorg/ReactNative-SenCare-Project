import { useState } from 'react';
import { useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ResidentListScreen({navigation}) {

  const [patients, setPatients] = useState([]);

  useEffect(()=>{
    
    const fetchPatients= async()=> {
      try{
        fetch("https://dd6a-2607-fea8-33dc-6900-704d-e0f6-63f6-e8dd.ngrok-free.app/api/patient/fetch").then(response=>response.json()).then(data=>{
              //console.log(data)
          setPatients(data)
        })
      } catch (error){
        console.error(error)
      }
    }
    fetchPatients();
  }, [])


  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.column}>{item.name}</Text>
      <Text style={styles.column}>{item.age}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('PatientDetails', { patientId: item._id })}>
        <Text style={styles.action}>View/Modify/Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const handleAddResident = ()=>{
    navigation.navigate('AddPatient');
  }

  return (
    <View style={styles.container}>

      {/* Column Titles */}
      <View style={styles.headerRow}>
        <Text style={styles.headerColumn}>Resident Name</Text>
        <Text style={styles.headerColumn}>Age</Text>
        <Text style={styles.headerColumn}>Action(s)</Text>
      </View>

      <FlatList data={patients} keyExtractor={item => item._id.toString()} renderItem={renderItem}/>
      
      <Button onPress={handleAddResident} title='Add Resident'/>
    </View>
  );

 
  
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  column: { flex: 1 },
  action: { color: 'blue' },
  searchBar: { borderWidth: 1, borderColor: 'gray', padding: 8, marginBottom: 10 },
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
