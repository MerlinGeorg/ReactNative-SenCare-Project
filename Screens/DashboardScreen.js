import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import GradientBackground from "../Styles/GradientBackground";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appThemeColor } from "../Styles/colors";

export default function DashboardScreen({ navigation, route }) {
  const { name } = route.params;

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
      Alert.alert("Success", "Logged out successfully.");
      navigation.replace("Login"); // ensure user can't press back button after logout
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.logoutButtonContainer}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButton}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.header}>Welcome {name}!</Text>
        </View>

        <View style={styles.textWithIcon}>
          <Icon name="tasks" size={28} style={styles.icon} />
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
          <TouchableOpacity
            onPress={() => navigation.navigate("TaskDetails")}
            style={[styles.viewDetailsButton, styles.actionColumn]}
          >
            {/* <Text style={styles.viewDetailsButtonText}>View Details</Text> */}
            <Icon name="angle-right" size={20} color={appThemeColor} />
          </TouchableOpacity>
        </View>

        {/* Task 2 */}
        <View style={styles.row}>
          <Text style={styles.column}>Feeding</Text>
          <Text style={styles.column}>Not Done</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("TaskDetails")}
            style={[styles.viewDetailsButton, styles.actionColumn]}
          >
            {/* <Text style={styles.viewDetailsButtonText}>View Details</Text> */}
            <Icon name="angle-right" size={20} color={appThemeColor} />
          </TouchableOpacity>
        </View>

        {/* Task 3 */}
        <View style={styles.row}>
          <Text style={styles.column}>Medication</Text>
          <Text style={styles.column}>Not Done</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("TaskDetails")}
            style={[styles.viewDetailsButton, styles.actionColumn]}
          >
            {/* <Text style={styles.viewDetailsButtonText}>View Details</Text> */}
            <Icon name="angle-right" size={20} color={appThemeColor} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.listButtonContainer}
          onPress={() => navigation.navigate("ResidentList")}
        >
          <Text style={styles.listButtonText}>Health Monitoring</Text>
        </TouchableOpacity>

        {/* <Button
        style={styles.button}
        onPress={() => navigation.navigate("ResidentList")}
        title="Documentation"
      /> */}
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },

  logoutButtonContainer: {
    position: "absolute", // position the logout button on top-right corner
    top: 20,
    right: 20,
    borderRadius: 10,
    width: "auto",
    zIndex: 1,
    backgroundColor: appThemeColor,
    fontWeight: "bold",
  },

  logoutButton: {
    padding: 15,
    color: "white",
    fontWeight: "bold",
  },

  listButtonContainer: {
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    borderColor: appThemeColor,
    borderWidth: 2,
  },
  listButtonText: {
    color: appThemeColor,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  headerContainer: {
    alignItems: "center",
    //flexDirection: 'row'
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "white",
    marginTop: 100,
  },

  textWithIcon: {
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    color: "white",
    marginRight: 10,
  },
  subHeader: {
    fontSize: 24,
    marginBottom: 8,
    color: "white",
  },
  columnHeader: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
  column: {
    flex: 1,
    textAlign: "left",
    color: "white",
    flexWrap: "wrap",
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    // flexWrap: 'wrap'
    //   paddingHorizontal: 5
  },

  viewDetailsButton: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20,
    borderColor: appThemeColor,
    borderWidth: 2,
  //  alignItems: 'flex-start'
  },

  actionColumn: {
  //  flex: 1, // Smaller flex value for the action column
    alignItems: "flex-end",
    justifyContent: "center",
    flexGrow: 0,
   // width: 40
  },
});
