import { useState, useEffect } from 'react';
import axios from 'axios';

function StudentForm() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    registerNumber: '',
    email: '',
    mobile: '',
    location: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = 'Name is required';
    if (!formData.registerNumber) tempErrors.registerNumber = 'Register number is required';
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!formData.mobile) {
      tempErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      tempErrors.mobile = 'Mobile number should be 10 digits';
    }
    if (!formData.location) tempErrors.location = 'Location is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('http://localhost:5000/api/students', formData);
        setFormData({
          name: '',
          registerNumber: '',
          email: '',
          mobile: '',
          location: ''
        });
        fetchStudents();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <h2>Student Registration Portal</h2>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Student Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter student's full name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">⚠ {errors.name}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="registerNumber">Register Number</label>
            <input
              id="registerNumber"
              type="text"
              name="registerNumber"
              placeholder="Enter register number"
              value={formData.registerNumber}
              onChange={handleChange}
            />
            {errors.registerNumber && <span className="error">⚠ {errors.registerNumber}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">⚠ {errors.email}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              type="text"
              name="mobile"
              placeholder="Enter 10-digit mobile number"
              value={formData.mobile}
              onChange={handleChange}
            />
            {errors.mobile && <span className="error">⚠ {errors.mobile}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <span className="error">⚠ {errors.location}</span>}
          </div>

          <button type="submit" className="submit-btn">Register Student</button>
        </form>
      </div>

      <div className="students-list">
        <h3>Registered Students</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Register Number</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.registerNumber}</td>
                <td>{student.email}</td>
                <td>{student.mobile}</td>
                <td>{student.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentForm; 