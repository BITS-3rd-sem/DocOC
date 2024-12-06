import axios from "axios";

const baseUrl = "http://localhost:8081/api/v1/doctor";

const bearerToken = localStorage.getItem("token");

var config = {
  headers: {
    Authorization: `Bearer ${bearerToken}`,
  },
};
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
class DoctorService {
  /**
   * Retrieves all Doctors.
   *
   * @returns {Promise} A promise that resolves to the list of Doctors.
   */
  getAllDoctors = async () => {
    return axios.get(`${baseUrl}`, getConfig());
  };

  /**
   * Retrieves a Doctor by their Doctor ID.
   *
   * @param {string} DoctorId - The ID of the Doctor to retrieve.
   * @returns {Promise} A promise that resolves to the Doctor object.
   */
  getDoctorById = async (DoctorId) => {
    config = { ...config, params: { DoctorId: DoctorId } };
    return axios.get(`${baseUrl}`, config);
  };

  // /**
  //  * Registers a new Doctor.
  //  *
  //  * @param {object} DoctorData - The data of the Doctor to register.
  //  * @returns {Promise} A promise that resolves to the registration result.
  //  */
  // registerDoctor = async (DoctorData) =>{
  //     console.log(DoctorData);
  //     return axios.post(`${baseUrl}/register`, DoctorData);
  // }
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
      updateDoctor = async (id, doctorData) =>{
        return axios.put(`${baseUrl}/${id}`, doctorData, getConfig());
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

  /**
   * Logs in a Doctor.
   *
   * @param {string} email - The email of the Doctor.
   * @param {string} password - The password of the Doctor.
   * @returns {Promise} A promise that resolves to the login result.
   */
  loginDoctor = async (email, password) => {
    const loginData = {
      email: email,
      password: password,
    };
    return axios.post(`${baseUrl}/login`, loginData);
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new DoctorService();
