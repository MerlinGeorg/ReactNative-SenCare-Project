import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Modal, Button } from "react-native";

const AddTaskModal = ({ isVisible, onClose, onSubmit }) => {
  const [newTask, setNewTask] = useState({
    taskName: "",
    duties: "",
    resident: "",
  });

  // Handle form submission
  const handleSubmit = () => {
    if (newTask.taskName && newTask.duties && newTask.resident) {
      onSubmit(newTask); // Send new task details to the parent component
      setNewTask({ taskName: "", duties: "", resident: "" }); // Reset form
      onClose(); // Close modal
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Task</Text>

          <TextInput
            style={styles.input}
            placeholder="Task Name"
            value={newTask.taskName}
            onChangeText={(text) => setNewTask({ ...newTask, taskName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Duties"
            value={newTask.duties}
            onChangeText={(text) => setNewTask({ ...newTask, duties: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Resident Assigned"
            value={newTask.resident}
            onChangeText={(text) => setNewTask({ ...newTask, resident: text })}
          />

          <View style={styles.modalButtons}>
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default AddTaskModal;
