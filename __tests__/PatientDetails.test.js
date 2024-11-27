import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import PatientDetailsScreen from "../Screens/ViewPatientDetailsScreen";

// Mock the fetch function
global.fetch = jest.fn();

describe('PatientDetailsScreen API Fetching', ()=>{
    const mockNavigation = {navigate: jest.fn()};

    beforeEach(()=>{
        jest.clearAllMocks();
    })

    //Test 1
    it('fetches patient details and displays the data correctly', async()=>{

        // Mock API response
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                
                      "_id": "67321705bb77868c8c478dc3",
                      "name": "Dal Fig",
                      "age": 60,
                      "health_status": "Critical",
                      "admission_date": "2020-04-29T00:00:00.000Z",
                      "admission_number": "OKP200",
                      "room_number": 305,
                      "photo": "https://brand.amica.ca/m/4af95ac1f7f123b4/Card_featured_landscape-Amica-Conversations-Regain-Confidence-with-Age.jpg",
                      "health_conditions": "Obesity, Paralyzed",
                      "clinical_data": [
                        {
                          "date_time": "2020-02-07T05:00:00.000Z",
                          "type_of_data": "Blood Pressure",
                          "reading": "90/70",
                          "_id": "67321705bb77868c8c478dc4"
                        },
                        {
                          "date_time": "2024-11-11T14:47:35.236Z",
                          "type_of_data": "Heart Rate",
                          "reading": "75",
                          "_id": "67321906bb77868c8c478de6"
                        }
                      ],
                      "__v": 0
                  
            })
        });

        const { getByText, getByAltText } = render(<PatientDetailsScreen route={{ params: { patientId: '67321705bb77868c8c478dc3'} }} navigation={{navigate: jest.fn()}} />);

        // Wait for the fetch to complete and the UI to update
        await waitFor(()=>{
            
            expect(fetch).toHaveBeenCalledWith("https://b638-2607-fea8-33dc-6900-ecd6-7728-6116-2d6c.ngrok-free.app/api/patient/fetch/67321705bb77868c8c478dc3");

            // Verify data is rendered
            expect(getByText('Dal Fig')).toBeTruthy(); // Patient name
            expect(getByText('Age: 60')).toBeTruthy(); // Patient age (using regex to match "Age: 60")
            expect(getByText('Health Status: Critical')).toBeTruthy(); // Health status
            expect(getByText('Admission Date: 2020-04-29T00:00:00.000Z')).toBeTruthy(); // Admission date
            expect(getByText('Admission Number: OKP200')).toBeTruthy(); // Admission number
            expect(getByText('Room Number: 305')).toBeTruthy(); // Room number
            expect(getByText('Health Conditions: Obesity, Paralyzed')).toBeTruthy(); // Health conditions

            // Verify the patient image is rendered
           // expect(getByAltText('Patient Image')).toHaveAttribute('src' , 'https://brand.amica.ca/m/4af95ac1f7f123b4/Card_featured_landscape-Amica-Conversations-Regain-Confidence-with-Age.jpg')
            
        })
    })

    //Test 2
    it('handles fetch errors gracefully', async() => {
        // Mock fetch to throw an error
        fetch.mockRejectedValueOnce(new Error('API error'));

        const {queryByText} = render(<PatientDetailsScreen route={{ params: {patientId: '67321705bb77868c8c478dc3'} }} navigation={{ navigate: jest.fn() }}/>);

        // Wait for fetch to complete
        await waitFor(()=>{
            expect(fetch).toHaveBeenCalledWith('https://b638-2607-fea8-33dc-6900-ecd6-7728-6116-2d6c.ngrok-free.app/api/patient/fetch/67321705bb77868c8c478dc3')
        
            // Ensure no data is rendered due to error
            expect(queryByText('Dal Fig')).toBeNull();
            expect(queryByText('60')).toBeNull();
            expect(queryByText('Critical')).toBeNull();
        })
    })

})