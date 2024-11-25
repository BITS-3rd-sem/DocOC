import { useEffect, useState } from 'react';
import doctorService from '../helpers/http/DoctorService';
import { useNavigate } from 'react-router-dom';
import docImg from "../assets/images/docimg.jpeg";
import '../stylesheets/adminDashboard.css'; // Ensure this path is correct
import { FaTrash } from 'react-icons/fa'; // Import the delete icon
import { Modal, Button, Form } from 'react-bootstrap'; // Import Modal, Button, and Form from react-bootstrap

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    password: '',
    email: '',
    role: 'DOCTOR',
    gender: 'MALE',
    phoneNo: '',
    experience: '',
    specialization: '',
    fees: '',
    rating: '',
    license: '',
    degrees: '',
    knownLanguages: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/signin');
    } else {
      doctorService.getAllDoctors().then((response) => {
        setDoctors(Array.isArray(response.data) ? response.data : []);
      }).catch((error) => {
        console.error('Error fetching doctors:', error);
      });
    }
  }, [navigate]);

  const handleDelete = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    doctorService.deleteDoctor(selectedDoctor.userId).then(() => {
      setDoctors(doctors.filter(doctor => doctor.userId !== selectedDoctor.userId));
      setShowDeleteModal(false);
    }).catch((error) => {
      console.error('Error deleting doctor:', error);
      setShowDeleteModal(false);
    });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleCreateDoctor = () => {
    setShowCreateModal(true);
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  const handleCreateSubmit = () => {
    const docPayload = {
        ...newDoctor,
        experience: Number(newDoctor.experience),
        fees: Number(newDoctor.fees),
        rating: parseFloat(newDoctor.rating),
        degrees: newDoctor.degrees.split(',').map(degree => degree.trim()),
        knownLanguages: newDoctor.knownLanguages.split(',').map(language => language.trim())
    }
    doctorService.createDoctor(docPayload).then((response) => {
      setDoctors([...doctors, response.data]);
      setShowCreateModal(false);
    }).catch((error) => {
      console.error('Error creating doctor:', error.response ? error.response : error.message);
      setShowCreateModal(false);
    });
  };

  const cancelCreate = () => {
    setShowCreateModal(false);
  };

  const validatePhoneNo = (phoneNo) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNo);
  };

  return (
    <div className="doctor-list-container">
      <div className="header-row">
        <h4 className="doctor-list-header">Doctor Directory</h4>
        <Button variant="primary" className="create-doctor-button" onClick={handleCreateDoctor}>
          Create Doctor
        </Button>
      </div>
      <div className="doctor-list">
        {doctors.map((doctor) => (
          <div key={doctor.userId} className="doctor-card">
            <button className="delete-button" onClick={() => handleDelete(doctor)}>
              <FaTrash />
            </button>
            <img src={docImg} alt="Doctor" className="doctor-image" />
            <h5>{doctor.name}</h5>
            <div className="doctor-details">
              <p className="doctor-property"><span>Email:</span> {doctor.email}</p>
              <p className="doctor-property"><span>Gender:</span> {doctor.gender}</p>
              <p className="doctor-property"><span>Phone No:</span> {doctor.phoneNo}</p>
              <p className="doctor-property"><span>Specialization:</span> {doctor.specialization}</p>
              <p className="doctor-property"><span>Experience:</span> {doctor.experience} years</p>
              <p className="doctor-property"><span>Fees:</span> ₹{doctor.fees}</p>
              <p className="doctor-property"><span>Rating:</span> {doctor.rating}</p>
              <p className="doctor-property"><span>License:</span> {doctor.license}</p>
              <p className="doctor-property"><span>Degrees:</span> {doctor.degrees.join(', ')}</p>
              <p className="doctor-property"><span>Known Languages:</span> {doctor.knownLanguages.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to permanently delete Dr. {selectedDoctor?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            No
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateModal} onHide={cancelCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Create Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="form-row">
              <Form.Group controlId="formName" className="form-group">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={newDoctor.name} onChange={handleCreateChange} />
              </Form.Group>
              <Form.Group controlId="formPassword" className="form-group">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={newDoctor.password} onChange={handleCreateChange} />
              </Form.Group>
            </div>
            <div className="form-row">
              <Form.Group controlId="formEmail" className="form-group">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={newDoctor.email} onChange={handleCreateChange} />
              </Form.Group>
              <Form.Group controlId="formGender" className="form-group">
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select" name="gender" value={newDoctor.gender} onChange={handleCreateChange}>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className="form-row">
              <Form.Group controlId="formPhoneNo" className="form-group">
                <Form.Label>Phone No</Form.Label>
                <Form.Control type="text" name="phoneNo" value={newDoctor.phoneNo} onChange={handleCreateChange} isInvalid={!validatePhoneNo(newDoctor.phoneNo)} />
                <Form.Control.Feedback type="invalid">Invalid phone number</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formExperience" className="form-group">
                <Form.Label>Experience</Form.Label>
                <Form.Control type="number" name="experience" value={newDoctor.experience} onChange={handleCreateChange} placeholder="Years" />
              </Form.Group>
            </div>
            <div className="form-row">
              <Form.Group controlId="formSpecialization" className="form-group">
                <Form.Label>Specialization</Form.Label>
                <Form.Control type="text" name="specialization" value={newDoctor.specialization} onChange={handleCreateChange} />
              </Form.Group>
              <Form.Group controlId="formFees" className="form-group">
                <Form.Label>Fees</Form.Label>
                <Form.Control type="number" name="fees" value={newDoctor.fees} onChange={handleCreateChange} placeholder="Rupees" />
              </Form.Group>
            </div>
            <div className="form-row">
              <Form.Group controlId="formRating" className="form-group">
                <Form.Label>Rating</Form.Label>
                <Form.Control type="number" step="0.1" name="rating" value={newDoctor.rating} onChange={handleCreateChange} />
              </Form.Group>
              <Form.Group controlId="formLicense" className="form-group">
                <Form.Label>License</Form.Label>
                <Form.Control type="text" name="license" value={newDoctor.license} onChange={handleCreateChange} placeholder="e.g., ABC12345" />
              </Form.Group>
            </div>
            <div className="form-row">
              <Form.Group controlId="formDegrees" className="form-group">
                <Form.Label>Degrees</Form.Label>
                <Form.Control type="text" name="degrees" value={newDoctor.degrees} onChange={handleCreateChange} placeholder="Comma separated" />
              </Form.Group>
              <Form.Group controlId="formKnownLanguages" className="form-group">
                <Form.Label>Known Languages</Form.Label>
                <Form.Control type="text" name="knownLanguages" value={newDoctor.knownLanguages} onChange={handleCreateChange} placeholder="Comma separated" />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelCreate}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorList;