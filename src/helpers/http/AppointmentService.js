import axios from "axios";

const baseUrl = "http://localhost:8082/api/v1";

const bearerToken = localStorage.getItem("token");
var config = {
  headers: {
    Authorization: `Bearer ${bearerToken}`,
  },
};

class AppointmentService {
  createAppointment = async (appointmentData) => {
    console.log(appointmentData);
    return await axios.post(`${baseUrl}/appointment`, appointmentData, config);
  };

  getPatientAppointments = async (patientId) => {
    return await axios.get(
      `${baseUrl}/patient/${patientId}/appointment`,
      config
    );
  };
}

export default new AppointmentService();
