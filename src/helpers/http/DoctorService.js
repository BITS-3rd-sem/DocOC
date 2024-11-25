import axios from 'axios'

const baseUrl = "http://localhost:8080/doctor";

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
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      withCredentials: true,
    };
  };
class DoctorService {

    /**
     * Retrieves all doctors.
     *
     * @returns {Promise} A promise that resolves to the response containing all doctors.
     */
    getAllDoctors = async () =>{
       return await axios.get(`${baseUrl}`, getConfig());
    }
    

    /**
     * Retrieves a doctor by its ID.
     *
     * @param {number} doctorId - The ID of the doctor.
     * @returns {Promise} A promise that resolves to the response containing the doctor.
     */
    getDoctorById = async (doctorId) =>{
        return axios.get(`${baseUrl}/${doctorId}`,getConfig());
    }


    /**
     * Creates a new doctor.
     *
     * @param {Object} doctorData - The data of the doctor to be created.
     * @returns {Promise} A promise that resolves to the response containing the created doctor.
     */
    createDoctor = async (doctorData) =>{
        return await axios.post(`${baseUrl}`, doctorData, getConfig());
    }

    /**
     * Updates an existing doctor.
     *
     * @param {Object} doctorData - The updated data of the doctor.
     * @returns {Promise} A promise that resolves to the response containing the updated doctor.
     */
    updateDoctor = async (doctorData) =>{
        return axios.put(`${baseUrl}/${doctorData?.id}`, doctorData, getConfig());
    }

    /**
     * Deletes a doctor by its ID.
     *
     * @param {number} doctorId - The ID of the doctor to delete.
     * @returns {Promise} A promise that resolves to the response of the delete operation.
     */
    deleteDoctor = async (doctorId) =>{
        return axios.delete(`${baseUrl}/${doctorId}`, getConfig());
    }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DoctorService();