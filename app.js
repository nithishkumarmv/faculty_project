const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Sample data for staff
const staffData = {
    name: "NITHISHKUMAR MV",
    gender: "Male",
    maritalStatus: "Single",
    fatherName: "Vadivel M",
    dob: "2004-02-14",
    address: "Singanallur,Coimbatore",
    contact: "+1234567890",
    personalDetails: "Full Stack Developer",
    education: "Bachelor's Degree in Computer Science",
    workExperience: "5 years in web development",
    references: "Available upon request",
    status: "In review"
};

// Sample data for application
let applications = [
    { applicationNumber: 1, name: 'A', designation: 'Asst. Professor', department: 'IT', description: 'desc', status: 'Pending' },
    { applicationNumber: 2, name: 'B', designation: 'Asst. Professor', department: 'CSE', description: 'desc', status: 'Pending' }
];
let acceptedApplications = [];

// Route to render the profile.ejs template
app.get('/profile', (req, res) => {
    res.render('profile', { staff: staffData });
});

// Route to render the kar.ejs template with applications data
app.get('/kar', (req, res) => {
    res.render('kar', { applications: applications, acceptedApplications: acceptedApplications });
});

// Route to render the login.ejs template
app.get('/login', (req, res) => {
    res.render('login');
});

// Login route (not implemented yet)
app.post('/login', async (req, res) => {
    // Add your login logic here
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Accept button route
app.post('/accept/:applicationnumber', (req, res) => {
    const applicationNumber = parseInt(req.params.applicationnumber);
    // Find the application and update its status
    const application = applications.find(app => app.applicationNumber === applicationNumber);
    if (application) {
        application.status = 'Accepted';
        acceptedApplications.push(application);
    }
    res.redirect('/kar');
});

// Reject button route
app.post('/reject/:applicationnumber', (req, res) => {
    const applicationNumber = parseInt(req.params.applicationnumber);
    // Find the application and update its status
    const application = applications.find(app => app.applicationNumber === applicationNumber);
    if (application) {
        application.status = 'Rejected';
    }
    res.redirect('/kar');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
