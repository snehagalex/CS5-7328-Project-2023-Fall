import axios from 'axios';
import { AxiosResponse } from 'axios';

const BASE_API_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;
const APPLICATION_API_URL: string | undefined = BASE_API_URL + '/ta-application/';

/**
 * @param dataJson
 * @param Resume
 * @returns */ 
const apply = (dataJson: JSON, Resume: File): Promise<AxiosResponse> => {
  //TODO: rename this function and filename to something more descriptive, since apply is a keyword in many libraries
  console.log(BASE_API_URL); //TODO: remove this line
  const formData = new FormData();
  formData.append('resumeFile', Resume); 
  formData.append('data',JSON.stringify(dataJson));
  return axios.post(APPLICATION_API_URL, formData);
};

// Function to update an application
export const updateApplication = async (id: string, GPA:number, 
  hoursCanWorkPerWeek:string, requiredCourses:string, requiredSkills:string) => {
  return axios.post(`http://localhost:9000/ta-application/${id}`, { GPA, hoursCanWorkPerWeek, requiredCourses, requiredSkills }, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    // Handle success - maybe show a success message to the user
    console.log(response.data);
  }).catch((error) => {
    // Handle error - show an error message to the user
    console.error('Error updating application:', error);
  });
};

// Function to delete an application
export const deleteApplication = async (id: string) => {
  return axios.delete(`http://localhost:9000/ta-application/${id}`);
};

export const fetchApplication = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:9000/ta-application/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching application data', error);
    throw error; // Rethrow the error for handling in the component
  }
};

//Sprint2: update application status
export const updateApplicationStatus =async (id: number, status: string) => {
  return axios.post(`http://localhost:9000/ta-application/${id}`, { status }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const ApplyService = {
  apply,
  updateApplication,
  deleteApplication,
  fetchApplication,
  updateApplicationStatus,
};

export default ApplyService;