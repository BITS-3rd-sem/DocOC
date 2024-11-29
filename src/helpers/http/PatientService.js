import axios from "axios";

const baseUrl = "http://localhost:8080/patient";

const getBearerToken = () => {
  return localStorage.getItem("token");
};

const getConfig = () => {
  const token = getBearerToken();
  if (!token) {
    throw new Error("No token found");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    withCredentials: true,
  };
};
class PatientService {
  /**
   * Retrieves all patients.
   *
   * @returns {Promise} A promise that resolves to the response containing all patients.
   */
  getAllpatients = async () => {
    return await axios.get(`${baseUrl}`, getConfig());
  };

  /**
   * Retrieves a patient by its ID.
   *
   * @param {number} patientId - The ID of the patient.
   * @returns {Promise} A promise that resolves to the response containing the patient.
   */
  getpatientById = async (patientId) => {
    return axios.get(`${baseUrl}/${patientId}`, getConfig());
  };

  /**
   * Creates a new patient.
   *
   * @param {Object} patientData - The data of the patient to be created.
   * @returns {Promise} A promise that resolves to the response containing the created patient.
   */
  // createpatient = async (patientData) =>{
//     return await axios.post(`${baseUrl}`, patientData, getConfig());
  // }

  /**
   * Updates an existing patient.
   *
   * @param {Object} patientData - The updated data of the patient.
   * @returns {Promise} A promise that resolves to the response containing the updated patient.
   */
  updatepatient = async (patientData, id) => {
    return axios.put(`${baseUrl}/${id}`, patientData, getConfig());
  };

  /**
   * Deletes a patient by its ID.
   *
   * @param {number} patientId - The ID of the patient to delete.
   * @returns {Promise} A promise that resolves to the response of the delete operation.
   */
  deletepatient = async (patientId) => {
    return axios.delete(`${baseUrl}/${patientId}`, getConfig());
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new PatientService();

