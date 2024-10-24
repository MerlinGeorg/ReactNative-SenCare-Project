import { Button, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name="dashboard" size={24} />
        <Text style={styles.header}>Dashboard</Text>
      </View>

      <View style={styles.textWithIcon}>
        <Icon name="clock-o" size={18} />
        <Text style={styles.shiftText}>Shift: Today 6 AM - 2 PM</Text>
      </View>

      <View style={styles.textWithIcon}>
        <Icon name="tasks" size={18} />
        <Text style={styles.subHeader}>Tasks</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.columnHeader}>Task Name</Text>
        <Text style={styles.columnHeader}>Completion Status</Text>
        <Text style={styles.columnHeader}>Action(s)</Text>
      </View>

      {/* Task 1 */}
      <View style={styles.row}>
        <Text style={styles.column}>Health Monitoring</Text>
        <Text style={styles.column}>Not Done</Text>
        <Button
          onPress={() => navigation.navigate("TaskDetails")}
          title="View Details"
        />
      </View>

      {/* Task 2 */}
      <View style={styles.row}>
        <Text style={styles.column}>Feeding</Text>
        <Text style={styles.column}>Not Done</Text>
        <Button
          title="View Details"
          onPress={() => navigation.navigate("TaskDetails")}
        />
      </View>

      {/* Task 3 */}
      <View style={styles.row}>
        <Text style={styles.column}>Medication</Text>
        <Text style={styles.column}>Not Done</Text>
        <Button
          title="View Details"
          onPress={() => navigation.navigate("TaskDetails")}
        />
      </View>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate("ResidentList")}
        title="Health Monitoring"
      />

      <Button
        style={styles.button}
        onPress={() => navigation.navigate("ResidentList")}
        title="Documentation"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    marginTop: 30,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 8,
  },
  columnHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  column: {
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  textWithIcon: {
    fontSize: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
