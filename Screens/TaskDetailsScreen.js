import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AddTaskModal from '../Components/AddTaskModal';  // Import the modal component

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
        <Text style={styles.columnHeader}>Mark Complete</Text>
        <Text style={styles.columnHeader}>Action</Text>
      </View>

      {/* Render tasks dynamically */}
      {tasks.map((task, index) => (
        <View key={task.id} style={styles.row}>
          <Text style={styles.column}>{task.taskName}</Text>
          <Text style={styles.column}>{task.duties}</Text>
          <Text style={styles.column}>{task.resident}</Text>
          <Checkbox
            status={taskCompletion[`task${task.id}`] ? 'checked' : 'unchecked'}
            onPress={() => handleToggle(`task${task.id}`)}
          />
          <TouchableOpacity onPress={() => alert('Edit Task')}>
            <MaterialIcon name="edit" size={24} color="blue" />
          </TouchableOpacity>
        </View>
      ))}

      {/* Add new task button */}
      <Text style={styles.addTask} onPress={() => setModalVisible(true)}>
        Add New Task
      </Text>

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
  container: { padding: 16 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  column: { flex: 1, textAlign: 'center' },
  columnHeader: { flex: 1, fontWeight: 'bold', textAlign: 'center' },
  addTask: { color: 'blue', marginTop: 20, textAlign: 'center', fontSize: 16 },
});

export default TaskDetailsScreen;
