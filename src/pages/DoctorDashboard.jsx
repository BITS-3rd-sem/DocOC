import React, { useState, useEffect } from "react";
import medicalHistoryImage from "../assets/images/medicalhistory.png";
import AIaskImage from "../assets/images/ai.png";
import medicalReport from "../assets/images/medical-report.png";
import "../stylesheets/PatientDashboard.css";
import healthInsurance from "../assets/images/health-insurance.png";
import PatientService from "../helpers/http/PatientService";
import AIService from "../helpers/http/AIService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../helpers/contexts/AuthContext";
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

const DoctorDashboard = () => {
  const [Patient, setPatient] = useState();
  const auth = useAuth();
  const [isTile2DialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    gender: "",
    phoneNo: "",
    age: "",
    weight: "",
    height: "",
  });
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [allFieldsPresent, setAllFieldsPresent] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [appointmentCancelDialog, setAppointmentCancelDialog] = useState(false);
  const [symptomDailogFormAI, setSymptomDailogFormAI] = useState(false);
  const [symptomDailogFormAISubmitted, setSymptomDailogFormAISubmitted] =
    useState(false);
  const [symptomForAIDiagnosis, setSymptomForAIDiagnosis] = useState({
    symptom: "",
  });
  const [AIResponse, setAIResponse] = useState({
    observation: "",
    recommendedSpecialization: "",
  });
  const navigate = useNavigate();

  // Initialize form values and allFieldsPresent based on details
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         var user;
  //         const token = localStorage.getItem("token");
  //         // if (!token) {
  //         //   navigate("/");
  //         // } else {
  //           console.log("Hii");
  //           PatientService.getAllpatients().then((response) => {
  //             console.log("All patiennts", response.data);
  //           });
  //           console.log("auth.user.name");
  //           console.log(auth.user.userId);
  //           await PatientService.getpatientById(auth.user.userId)
  //             .then((response) => {
  //               setPatient(response.data);
  //               user = response.data;
  //               console.log("patiennt", response.data);
  //             })
  //             .catch((error) => {
  //               console.error("Error fetching patient:", error);
  //             });
  //         // }
  //         // user = PatientService.getUserById(details.id);
  //         console.log("user", user);
  //         if (user) {
  //           console.log("Inside");
  //           const areAllFieldsPresent2 =
  //             user.age &&
  //             user.phoneNo &&
  //             user.gender &&
  //             user.height &&
  //             user.weight;
  //           setFormValues({
  //             gender: user.gender || "",
  //             phoneNo: user.phoneNo || "",
  //             age: user.age || "",
  //             weight: user.weight || "",
  //             height: user.height || "",
  //           });
  //           setAllFieldsPresent(areAllFieldsPresent2);
  //           handleDialogClose();
  //         }

  //         //     const response = await PatientService.getpatientById(auth.user.userId);
  //         //     setPatient(response.data);
  //         //     user = response.data;
  //         //     console.log("Patient", response.data);
  //         //     // Add next steps here
  //         //   } catch (error) {
  //         //     console.error("Error fetching patient:", error);
  //         //   }
  //       } catch (error) {
  //         console.error("Error fetching patient:", error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };
  const setDetailsDialogboxopen = () => {
    setDetailsDialog(true);
  };

  const setDetailsDialogboxclose = () => {
    setDetailsDialog(false);
  };
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9][0-9]{9}$/; // Starts with 6-9 and has exactly 10 digits
    return phone.length === 10 && phoneRegex.test(phone);
  };

  const [phoneError, setPhoneError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [weightError, setWeightError] = useState("");

  const handleSubmit = (e) => {
    console.log("Form Details 1:", formValues);
    e.preventDefault();
    handleDialogClose();

    // Update allFieldsPresent after form submission
    const areAllFieldsPresent =
      formValues.age && formValues.phoneNo && formValues.gender;
    setAllFieldsPresent(areAllFieldsPresent);
    if (areAllFieldsPresent) {
      PatientService.updatepatient(formValues, Patient.userId)
        .then((response) => {
          setPatient(response.data);
          handleCloseDialog();
          console.log("patiennt-updateeee", response.data);
        })
        .catch((error) => {
          console.log("Error fetching patient:", error);
        });
    }

    console.log("Form Details 2:", formValues);
  };

  const handlePhoneBlur = (e) => {
    const phone = e.target.value;
    if (!validatePhoneNumber(phone)) {
      setPhoneError(
        "Phone number must start with 6, 7, 8, or 9 and be exactly 10 digits long."
      );
    } else {
      setPhoneError("");
    }
  };

  const handleAgeChange = (e) => {
    const { value } = e.target;

    // Allow only positive numbers
    if (!isNaN(value) && value > 0) {
      setFormValues({ ...formValues, age: value });
    } else if (value === "") {
      // Allow clearing the field
      setFormValues({ ...formValues, age: "" });
    }
  };

  const validatePositiveFloat = (value) => {
    // Check if the value is a positive float
    return !isNaN(value) && parseFloat(value) > 0;
  };

  const handleHeightChange = (e) => {
    const { value } = e.target;
    if (validatePositiveFloat(value) || value === "") {
      setFormValues({ ...formValues, height: value });
    }
  };

  const handleWeightChange = (e) => {
    const { value } = e.target;
    if (validatePositiveFloat(value) || value === "") {
      setFormValues({ ...formValues, weight: value });
    }
  };

  const handleHeightBlur = (e) => {
    const { value } = e.target;
    if (!validatePositiveFloat(value)) {
      setHeightError("Height must be a positive number.");
    } else {
      setHeightError("");
    }
  };

  const handleWeightBlur = (e) => {
    const { value } = e.target;
    if (!validatePositiveFloat(value)) {
      setWeightError("Weight must be a positive number.");
    } else {
      setWeightError("");
    }
  };

  const showAlert = (message) => {
    setAlertMessage(message);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleAppointmentCancleNOButton = () => {
    setAppointmentCancelDialog(false);
  };
  const handleAppointmentCancleYESButton = () => {
    setAppointmentCancelDialog(false);
  };
  const handleAppointmentCancle = () => {
    setAppointmentCancelDialog(true);
  };

  const handleOpenSymptomDailogFormAI = () => {
    setSymptomDailogFormAI(true);
    setSymptomDailogFormAISubmitted(false);
    setSymptomForAIDiagnosis("");
  };

  const handleCloseSymptomDailogFormAI = () => {
    setSymptomDailogFormAI(false);
  };

  const handleSymptomDailogFormAISubmit = async () => {
    // var symptom =symptomForAIDiagnosis.symptom.trim();
    if (symptomForAIDiagnosis.symptom.trim()) {
      try {
        console.log("SYMPTOM:", symptomForAIDiagnosis);
        // const token = localStorage.getItem("token");
        await AIService.getAIRecommendation(symptomForAIDiagnosis).then(
          (response) => {
            console.log("AI  RESPONSE", response.data);
            var results = {};
            results["observation"] = response.data.observation;
            results["recommendedSpecialization"] =
              response.data["ai-recommendation"];
            setAIResponse(results);
          }
        );
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
      setSymptomDailogFormAISubmitted(true);
    } else {
      alert("Please enter sone data!");
    }
  };
  const handleAppointmentClick = () => {
    navigate("/doctor-appointment");
  };

  return (
    <div className="container">
      <div>
        <center>
          {/* Always show Patient Dashboard and Profile Menu */}
          <header className="dashboard-header">
            <center>
              <h2>Doctor Dashboard</h2>
            </center>
            <div className="profile-menu">
              <Avatar
                alt="Profile Picture"
                src="https://randomuser.me/api/portraits/men/1.jpg"
                onClick={handleMenuClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => setDetailsDialogboxopen()}>
                  Show Details
                </MenuItem>
                <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
              </Menu>
            </div>
          </header>
        </center>
      </div>

      {
        <>
          <div className="container2">
            <center>
              <div className="Upcoming-appointments">Upcoming Appointments</div>
            </center>
            <div className="container4">
              <div className="upcomingAppCard">
                <div className="cardActionArea">
                  <center>
                    <img
                      src={medicalReport}
                      alt="medicalReport"
                      className="cardMedia2"
                    />
                  </center>
                  <div className="cardContent">
                    <h5 className="cardTitle">Appointment with Patient X</h5>
                    <p className="cardDescription">on date:</p>

                    <center>
                      <button
                        onClick={handleOpenDialog}
                        className="showAppointmentbutton"
                      >
                        Show Details
                      </button>
                      <button
                        className="cancelAppointmentbutton"
                        onClick={handleAppointmentCancle}
                      >
                        Cancle Appointment
                      </button>
                    </center>
                  </div>
                </div>
              </div>

              {isTile2DialogOpen && (
                <>
                  <div className="overlay" onClick={handleCloseDialog}></div>
                  <div className="dialog-box">
                    <h2>Details</h2>
                    <p>This is a pop-up dialog box that displays details.</p>

                    <button
                      onClick={handleCloseDialog}
                      className="close-button"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {appointmentCancelDialog && (
                <>
                  <div className="overlay"></div>

                  <div className="appointmentCancelDialog-box">
                    <h2>Confirmation</h2>
                    <p>Are you sure, do you want to cancle the Appointment?</p>
                    <center>
                      <button
                        onClick={handleAppointmentCancleYESButton}
                        className="appointmentCancleYes-button"
                      >
                        yes
                      </button>
                      <button
                        onClick={handleAppointmentCancleNOButton}
                        className="appointmentCancleNo-button"
                      >
                        no
                      </button>
                    </center>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="container3">
            <center>
              <div className="Upcoming-appointments">
                Completed Consultations
              </div>
            </center>
            <div className="container1">
              <div className="card" onClick={handleOpenDialog}>
                <div className="cardActionArea">
                  <center>
                    <img
                      src={healthInsurance}
                      alt="healthInsurance"
                      className="cardMedia"
                    />
                  </center>
                  <div className="cardContent">
                    <h5 className="cardTitle">Appointment</h5>
                    <p className="cardDescription">click to view details</p>
                  </div>
                </div>
              </div>

              {/* <div className="card" onClick={handleOpenDialog}>
                <div className="cardActionArea">
                  <center>
                    <img
                      src={healthInsurance}
                      alt="healthInsurance"
                      className="cardMedia"
                    />
                  </center>
                  <div className="cardContent">
                    <h5 className="cardTitle">Book Appointment</h5>
                    <p className="cardDescription">
                      You can directly select the doctor
                    </p>
                  </div>
                </div>
              </div> */}
              {isTile2DialogOpen && (
                <>
                  <div className="overlay" onClick={handleCloseDialog}></div>

                  <div className="dialog-box">
                    <h2>Details</h2>
                    <p>This is a pop-up dialog box that displays details.</p>
                    <button
                      onClick={handleCloseDialog}
                      className="close-button"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      }

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Update Details</DialogTitle>
          <DialogContent>
            {/* Display form fields */}
            <DialogContentText>Gender</DialogContentText>
            <RadioGroup
              row
              name="gender"
              value={formValues.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="MALE" control={<Radio />} label="Male" />
              <FormControlLabel
                value="FEMALE"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
            <TextField
              label="Phone Number"
              name="phoneNo"
              type="tel"
              value={formValues.phoneNo}
              onChange={handleChange}
              onBlur={handlePhoneBlur}
              error={!!phoneError} // Highlights the field in red if there's an error
              helperText={phoneError} // Displays the error message
              fullWidth
              margin="dense"
            />

            <TextField
              label="Age"
              name="age"
              type="number"
              value={formValues.age}
              onChange={handleAgeChange} // Custom handler to allow only valid input
              onBlur={(e) => {
                if (e.target.value <= 0) {
                  alert("Age must be a positive number greater than zero.");
                }
              }}
              fullWidth
              margin="dense"
            />

            <TextField
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formValues.weight || ""}
              onChange={handleWeightChange}
              onBlur={handleWeightBlur}
              error={!!weightError} // Highlights the field in red if there's an error
              helperText={weightError} // Displays the error message
              fullWidth
              margin="dense"
            />

            <TextField
              label="Height (cm)"
              name="height"
              type="number"
              value={formValues.height || ""}
              onChange={handleHeightChange}
              onBlur={handleHeightBlur}
              error={!!heightError} // Highlights the field in red if there's an error
              helperText={heightError} // Displays the error message
              fullWidth
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button type="submit">Update</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {" "}
          <h5>{alertMessage}</h5>
        </DialogTitle>
        <DialogContent>
          <p>{alertMessage}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {Patient && (
        <Dialog
          open={detailsDialog}
          onClose={setDetailsDialogboxclose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {" "}
            <p>User Details</p>
          </DialogTitle>
          <DialogContent>
            {/* <p>{alertMessage}</p>  */}
            <div>
              <table>
                <tbody>
                  <tr>
                    <td> Name :</td>
                    <td>{Patient.name}</td>
                  </tr>
                  <tr>
                    <td> Email :</td>
                    <td>{Patient.email == 0 ? "null" : Patient.email}</td>
                  </tr>
                  <tr>
                    <td> Gender :</td>
                    <td>
                      {Patient.gender == "" ? "Not Provided" : Patient.gender}
                    </td>
                  </tr>
                  <tr>
                    <td> Age :</td>
                    <td>{Patient.age == 0 ? "Not Provided" : Patient.age}</td>
                  </tr>
                  <tr>
                    <td> Height :</td>
                    <td>
                      {Patient.height == 0 ? "Not Provided" : Patient.height}
                    </td>
                  </tr>
                  <tr>
                    <td> Weight :</td>
                    <td>
                      {Patient.weight == 0 ? "Not Provided" : Patient.weight}
                    </td>
                  </tr>
                  <tr>
                    <td> Phone Number :</td>
                    <td>
                      {Patient.phoneNo == "" ? "Not Provided" : Patient.phoneNo}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={setDetailsDialogboxclose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {}
    </div>
  );
};

export default DoctorDashboard;
