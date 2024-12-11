import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AddTaskModal from '../Components/AddTaskModal';  // Import the modal component
import Icon from "react-native-vector-icons/FontAwesome";
import { appThemeColor } from '../Styles/colors';

const TaskDetailsScreen = ({ navigation }) => {
  const [taskCompletion, setTaskCompletion] = useState({
    task1: false,
    task2: false,
    task3: false,
  });

  const [tasks, setTasks] = useState([
    { id: 1, taskName: 'Health Monitoring', duties: 'Check BP and Temp', resident: 'John Smith' },
    { id: 2, taskName: 'Feeding', duties: 'Lunch', resident: 'Culine Piat' },
    { id: 3, taskName: 'Medication', duties: 'All Block1', resident: 'Ernad Tom' },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);

  // Toggle task completion status
  const handleToggle = (taskName) => {
    setTaskCompletion((prevState) => ({
      ...prevState,
      [taskName]: !prevState[taskName],
    }));
  };

  // Add a new task to the list
  const handleAddTask = (newTask) => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Details</Text>

      {/* Table header */}
      <View style={styles.row}>
        <Text style={styles.columnHeader}>Task Name</Text>
        <Text style={styles.columnHeader}>Duties</Text>
        <Text style={styles.columnHeader}>Resident Assigned</Text>
        {/* <Text style={styles.columnHeader}>Mark Complete</Text> */}
        {/* <Text style={styles.columnHeader}>Action</Text> */}
      </View>

      {/* Render tasks dynamically */}
      {tasks.map((task, index) => (
        <View key={task.id} style={styles.row}>
          <Text style={styles.column}>{task.taskName}</Text>
          <Text style={styles.column}>{task.duties}</Text>
          <Text style={styles.column}>{task.resident}</Text>
          {/* <Checkbox
            status={taskCompletion[`task${task.id}`] ? 'checked' : 'unchecked'}
            onPress={() => handleToggle(`task${task.id}`)}
          />
          <TouchableOpacity onPress={() => alert('Edit Task')}>
            <MaterialIcon name="edit" size={24} color="blue" />
          </TouchableOpacity> */}
        </View>
      ))}

      {/* Add new task button */}
      
      <View style={styles.buttonWrapper}>
        <TouchableOpacity 
          style={styles.addButtonContainer}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="plus" size={24} color={appThemeColor} />
        </TouchableOpacity>
      </View>
      

      {/* Modal for adding a new task */}
      <AddTaskModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex:1, padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  column: { flex: 1, textAlign: 'center', fontSize: 16 },
  columnHeader: { flex: 1, fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
  addTask: { color: 'blue', marginTop: 20, textAlign: 'center', fontSize: 16 },
  addButtonContainer: {
  //  position: 'absolute',
  //  top: 20,
   // left: 20,
 //   bottom: 50,
 //   right: 20,
    //backgroundColor: '#ff5733', // Optional: You can change the background color
    padding: 10,

  },

  buttonWrapper: {
    position: 'absolute',
     bottom: 20,
     right: 20,
    // width: 60,
    // height: 60,
  },
  
});

export default TaskDetailsScreen;
