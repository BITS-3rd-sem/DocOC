import React, { useState, useEffect } from "react";
import DoctorService from "../helpers/http/DoctorService";
import AppointmentService from "../helpers/http/AppointmentService";
import { Link, useParams } from "react-router-dom";
import doctorImage from "../assets/images/doctorImage.png";
// import "../stylesheets/PatientDashboard.css";
import "../stylesheets/DoctorAppointment.css";
import { useAuth } from "../helpers/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Menu,
  MenuItem,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  DialogContentText,
} from "@mui/material";
const DoctorAppointment = () => {
  const [symptoms, setSymptoms] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);
  const [doctordetails, setdoctordetails] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("code with arjun");
    setLoading(true);
    fetchDoctors2();
    setLoading(false);
  }, []);

  const fetchDoctors2 = async () => {
    console.log("fetching doctors");
    await DoctorService.getAllDoctors()
      .then((response) => {
        setdoctordetails(response.data);
        setDoctors(response.data.doctors);
        console.log("doctorsss", response.data);
      })
      .catch((error) => {
        console.error("Error fetching all doctors:", error);
      });
  };
  // Simulate API Call
  const fetchDoctors = () => {
    setLoading(true);
    setTimeout(() => {
      const doctorData = [
        {
          id: 1,
          name: "Dr. John Smith",
          experience: "10 years",
          specialization: "Cardiologist",
          rating: 4.5,
          fee: "$100",
        },
        {
          id: 2,
          name: "Dr. Sarah Brown",
          experience: "8 years",
          specialization: "Dermatologist",
          rating: 4.7,
          fee: "$120",
        },
      ];
      setDoctors(doctorData);
      setLoading(false);
    }, 1000);
  };

  const handleAppointmentSubmit = async () => {
    const appointmentData = {
      patientId: auth.user.userId,
      doctorId: selectedDoctor,
      patientSymptom: symptoms,
      appointmentDate: date + "",
      appointmentTime: time + ":00",
    };
    await AppointmentService.createAppointment(appointmentData)
      .then((response) => {
        // setdoctordetails(response.data);
        // setDoctors(response.data.doctors);
        console.log("Appointment", response.data);
      })
      .catch((error) => {
        console.error("Error while creating an appointment:", error);
      });
    console.log(date);
    console.log(time);
    setAppointmentSuccess(true);
  };

  const handleOnClose = () => {
    snavigate("/patient-dashboard");
  };

  return (
    <>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <Link
          to={`/patient-dashboard`}
          className=" btn btn-outline-primary mx-5 float-end"
        >
          Go Back
        </Link>
        {!appointmentSuccess && (
          <>
            <center>
              <h1>Book Your Appointment</h1>
            </center>
            {/* Symptoms Input */}
            <h3 htmlFor="symptoms">Enter Symptoms:</h3>
            <br></br>
            <textarea
              id="symptoms"
              rows="10"
              cols="100"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe your symptoms here"
            />
            <br></br>
            <div>
              <h3> Select the doctor</h3>
              {loading ? (
                <p>Loading doctors...</p>
              ) : doctors.length > 0 ? (
                <div className="flex-container">
                  {doctors.map((doctor) => (
                    <div
                      className={`doctorcard ${
                        selectedDoctor === doctor.userId ? "selected" : ""
                      }`}
                      key={doctor.userId}
                    >
                      <div className="cardActionArea">
                        <center>
                          <img
                            src={doctorImage}
                            alt="doctorImage"
                            className="cardMedia"
                          />
                        </center>
                        <div className="cardContent">
                          <h5 className="cardTitle">{doctor.name}</h5>
                          <p className="cardDescription">
                            <p>Gender: {doctor.gender}</p>
                            <p>Experience: {doctor.experience}</p>
                            <p>Specialization: {doctor.specialization}</p>
                            <p>Rating: {doctor.rating}</p>
                            <p>Fee: {doctor.fees}</p>
                          </p>
                          <>
                            {doctor.userId === selectedDoctor ? (
                              <Button
                                className="Deselect-button"
                                onClick={() => setSelectedDoctor("")}
                              >
                                DeSelect
                              </Button>
                            ) : (
                              <Button
                                className="Select-button"
                                onClick={() => setSelectedDoctor(doctor.userId)}
                              >
                                Select
                              </Button>
                            )}
                          </>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No doctors available</p>
              )}
            </div>
            {doctors.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <h3 htmlFor="date">Select Date:</h3>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    console.log(e.target.value);
                  }}
                  style={{ display: "block", marginBottom: "10px" }}
                />

                <h3 htmlFor="time">Select Time:</h3>
                <input
                  type="time"
                  id="time"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    console.log(e.target.value);
                  }}
                  style={{ display: "block", marginBottom: "20px" }}
                />
                <center>
                  <Button
                    onClick={handleAppointmentSubmit}
                    className="Select-button"
                  >
                    Submit
                  </Button>
                </center>
              </div>
            )}
          </>
        )}

        {appointmentSuccess && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#fff",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <h2>Appointment Created Successfully!</h2>
            <button
              onClick={handleOnClose}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default DoctorAppointment;
