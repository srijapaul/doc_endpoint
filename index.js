const express = require('express');
const bodyParser = require('body-parser');
const doctorsData = require('./doctorsData.json');

const app = express();
const port = 8888;

app.use(bodyParser.json());

// Endpoint to get all doctors
app.get('/api/doctors', (req, res) => {
  res.json(doctorsData.doctors);
});

// Endpoint to get doctor by id
app.get('/api/doctors/:id', (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctor = doctorsData.doctors.find(doc => doc.id === doctorId);
  if (!doctor) {
    res.status(404).json({ error: 'Doctor not found' });
  } else {
    res.json(doctor);
  }
});

// Endpoint to get doctor's availability
app.get('/api/doctors/:id/availability', (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctor = doctorsData.doctors.find(doc => doc.id === doctorId);
  if (!doctor) {
    res.status(404).json({ error: 'Doctor not found' });
  } else {
    res.json(doctor.schedule);
  }
});

// Endpoint to book an appointment with a doctor
app.post('/api/doctors/:id/book-appointment', (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctor = doctorsData.doctors.find(doc => doc.id === doctorId);
  if (!doctor) {
    res.status(404).json({ error: 'Doctor not found' });
  } else {
    const { slot } = req.body;
    const dayOfWeek = new Date().getDay(); // Get current day of the week
    const currentDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][dayOfWeek];

    if (!doctor.schedule[currentDay].includes(slot)) {
      res.status(400).json({ error: 'Invalid time slot' });
    } else {
      // Here you can implement the logic to book the appointment
      res.json({ message: 'Appointment booked successfully', slot });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
