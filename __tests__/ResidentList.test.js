import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react-native';
import ResidentListScreen from '../Screens/ResidentListScreen.js'

// Mock the navigation prop
const mockNavigation = { navigate: jest.fn() };

// Mock the fetch API response
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          _id: "67321705bb77868c8c478dc3",
          name: "Dal Fig",
          age: 60,
          health_status: "Critical",
          admission_date: "2020-04-29T00:00:00.000Z",
          admission_number: "OKP200",
          room_number: 305,
          photo: "https://brand.amica.ca/m/4af95ac1f7f123b4/Card_featured_landscape-Amica-Conversations-Regain-Confidence-with-Age.jpg",
          health_conditions: "Obesity, Paralyzed",
          clinical_data: [
            {
              date_time: "2020-02-07T05:00:00.000Z",
              type_of_data: "Blood Pressure",
              reading: "90/70",
              _id: "67321705bb77868c8c478dc4",
            },
            {
              date_time: "2024-11-11T14:47:35.236Z",
              type_of_data: "Heart Rate",
              reading: "75",
              _id: "67321906bb77868c8c478de6",
            },
          ],
          __v: 0,
        },
        
      ]),
  })
);

describe('ResidentListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();  // Ensure mocks are cleared before each test
  });

  it('renders the patient list correctly', async () => {
    render(<ResidentListScreen navigation={mockNavigation} />);

    // Check that the correct headers are rendered
    expect(screen.getByText('Resident Name')).toBeTruthy();
    expect(screen.getByText('Age')).toBeTruthy();
    expect(screen.getByText('Action(s)')).toBeTruthy();

    // Wait for the list to render and check the first patient's name and age
    await waitFor(() => {
      expect(screen.getByText('Dal Fig')).toBeTruthy();
      expect(screen.getByText('60')).toBeTruthy();
    });
  });


  it('navigates to patient details when "View/Modify/Delete" is clicked', async() => {
    render(<ResidentListScreen navigation={mockNavigation} />)

    // Wait for patient data to load
    await waitFor(() => screen.getByText('Dal Fig'))

    // Simulate the "View/Modify/Delete" button press
    fireEvent.press(screen.getByText('View/Modify/Delete'));

    // Ensure the navigation function was called with the correct patientId
    expect(mockNavigation.navigate).toHaveBeenCalledWith('PatientDetails',{
      patientId: '67321705bb77868c8c478dc3',
    })

    expect(fetch).toHaveBeenCalledWith(
      "https://b638-2607-fea8-33dc-6900-ecd6-7728-6116-2d6c.ngrok-free.app/api/patient/fetch"
    );

  })


  it('navigates to NewPatient screen when "Add Resident" button is pressed', ()=>{
    render(<ResidentListScreen navigation={mockNavigation}/>)

    // Simulate the "Add Resident" button press
    fireEvent.press(screen.getByText('Add Resident'))

    // Ensure the navigation function was called with the correct argument
    expect(mockNavigation.navigate).toHaveBeenCalledWith('NewPatient');

  })

});

