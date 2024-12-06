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
