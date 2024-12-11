import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import moment from 'moment';

const PatientDetailsScreen = ({ route, navigation }) => {
  const patientId = route.params.patientId;
  
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatientDetails= async()=> {
      try{
        await fetch(`https://mycentennialtestdeploymentapp-bjandcdgcscmgpbu.canadacentral-01.azurewebsites.net/api/patient/fetch/${patientId}`).then(response=>response.json()).then(data=>{
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
        source={{ uri: patient.photo ? patient.photo: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }} 
        style={styles.patientImage}
      />

      <Text style={styles.header}>{patient.name}</Text>
      <Text style={styles.patientData}>Age: {patient.age}</Text>
      <Text style={styles.patientData}>Health Status: {patient.health_status}</Text>
      <Text style={styles.patientData}>Admission Date: { moment(patient.admission_date).format("MM/DD/YYYY") }</Text>
      <Text style={styles.patientData}>Admission Number: {patient.admission_number}</Text>
      <Text style={styles.patientData}>Room Number: {patient.room_number}</Text>

      <Text style={styles.sectionHeader}>Health Conditions: {patient.health_conditions}</Text>

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
  link: { color: 'blue', marginTop: 20, textDecorationLine: 'underline', fontSize: 18},
  patientImage: {
    width: 100, 
    height: 100, 
    marginBottom: 16,
    borderRadius: 50, // Optional: for making the image circular
  },
  patientData: {
    fontSize: 18
  }
});

export default PatientDetailsScreen;
