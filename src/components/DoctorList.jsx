import { useEffect, useState } from 'react';
import doctorService from '../helpers/http/DoctorService';
import { useNavigate } from 'react-router-dom';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/signin');
    } else {
      doctorService.getAllDoctors().then((response) => {
        setDoctors(response)
        console.log(response)
      }).catch((error) => {
        console.error('Error fetching doctors:', error);
      });
    }
  }, [navigate]);

  return (
    <div>
      <h2>Doctor List</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id}>{doctor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;