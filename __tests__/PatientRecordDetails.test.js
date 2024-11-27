import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ViewPatientRecordScreen from "../Screens/ViewPatientRecordScreen";
import { NavigationContainer } from "@react-navigation/native";

const mockNavigate = jest.fn();

// Sample mock data for the test
const mockClinicalData = [
  {
    _id: "1",
    date_time: "2024-11-25T10:30:00Z",
    type_of_data: "Blood Pressure",
    reading: "110/75",
  },
  {
    _id: "2",
    date_time: "2024-11-24T14:30:00Z",
    type_of_data: "Heart Rate",
    reading: "80 bpm",
  },
];

describe("ViewPatientRecordScreen", () => {
  // Mocking the fetch function to simulate API response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockClinicalData),
    })
  );

  // Wrapper to provide the necessary navigation context
  const renderComponent = (patientId = "67321705bb77868c8c478dc3") => {
    return render(
      <NavigationContainer>
        <ViewPatientRecordScreen
          route={{ params: { patientId } }}
          navigation={{ navigate: mockNavigate }}
        />
      </NavigationContainer>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  

  test("should fetch and display clinical data correctly", async () => {
    // Render the component
    const { getByText, queryByText } = renderComponent();

   
        await waitFor(() => {
            expect(getByText("Blood Pressure")).toBeTruthy();
            expect(getByText("110/75")).toBeTruthy();
            expect(getByText("Heart Rate")).toBeTruthy();
            expect(getByText("80 bpm")).toBeTruthy();
          }, { timeout: 10000 });

          expect(queryByText("90/60 - 120/80 (Systolic/Diastolic)")).toBeTruthy();
          expect(queryByText("60 - 100 bpm")).toBeTruthy();

      expect(fetch).toHaveBeenCalledWith(
        `https://b638-2607-fea8-33dc-6900-ecd6-7728-6116-2d6c.ngrok-free.app/api/patient/fetch/67321705bb77868c8c478dc3/clinical-data`
      );
   
  });

//   test("should display the correct normal range for data types", async () => {
//     const { findByText } = renderComponent();

//     // Check if normal ranges for Blood Pressure and Heart Rate are displayed
//     await waitFor(() => {
//       expect(findByText("90/60 - 120/80 (Systolic/Diastolic)", {}, { timeout: 5000 })).toBeTruthy(); // Blood Pressure normal range
//       expect(findByText("60 - 100 bpm", {}, { timeout: 5000 })).toBeTruthy(); // Heart Rate normal range
//     }, { timeout: 6000 });
//   });

  test('should navigate to NewPatientRecord screen when "Add New Patient Record" button is pressed', () => {
    const { getByText } = renderComponent();

    // Find and press the 'Add New Patient Record' button
    fireEvent.press(getByText("Add New Patient Record"));

    expect(mockNavigate).toHaveBeenCalledWith("NewPatientRecord", {
      patientId: "67321705bb77868c8c478dc3",
    });
  });

  test("should handle API errors gracefully", async () => {
    // Mock fetch to simulate an error
    global.fetch = jest.fn(() => Promise.reject(new Error("API Error")));

    const { queryByText } = renderComponent();

    // Ensure no clinical data is displayed and an error message would be logged
    await waitFor(() => {
        expect(queryByText("Blood Pressure")).toBeNull();
        expect(queryByText("Heart Rate")).toBeNull();
      }, { timeout: 10000 });

      expect(fetch).toHaveBeenCalledWith(
        `https://b638-2607-fea8-33dc-6900-ecd6-7728-6116-2d6c.ngrok-free.app/api/patient/fetch/67321705bb77868c8c478dc3/clinical-data`
      );
   
  });
});
