import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const PatientDetailsScreen = ({ route, navigation }) => {
  const patientId = route.params.patientId;
  
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatientDetails= async()=> {
      try{
        await fetch(`https://b5a2-2607-fea8-33dc-6900-f946-21ba-d5e0-e6a5.ngrok-free.app/api/patient/fetch/${patientId}`).then(response=>response.json()).then(data=>{
             // console.log(data)
          setPatient(data)
        })
      } catch (error){
        console.error(error)
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  
 
  return (
  
    <View style={styles.container}>
     
     {patient && (  // Check if patient data is available
      <>
      
      <Image
        source={{ uri: patient.photo }} 
        style={styles.patientImage}
      />

      <Text style={styles.header}>{patient.name}</Text>
      <Text>Age: {patient.age}</Text>
      <Text>Health Status: {patient.health_status}</Text>
      <Text>Admission Date: {patient.admission_date}</Text>
      <Text>Admission Number: {patient.admission_number}</Text>
      <Text>Room Number: {patient.room_number}</Text>

      <Text style={styles.sectionHeader}>Health Conditions:</Text>
      <Text>{patient.health_conditions}</Text>

      </>)}

      <TouchableOpacity onPress={() => navigation.navigate('PatientRecord', { patientId })}>
        <Text style={styles.link}>View Previous Patient Medical Records</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  sectionHeader: { fontSize: 18, marginTop: 20, fontWeight: 'bold' },
  link: { color: 'blue', marginTop: 20, textDecorationLine: 'underline'},
  patientImage: {
    width: 100, 
    height: 100, 
    marginBottom: 16,
    borderRadius: 50, // Optional: for making the image circular
  },
});

export default PatientDetailsScreen;
