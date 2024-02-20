const express = require('express');
const app = express();
const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

/*// Connection URL and Database Name
const url = 'mongodb://localhost:27017';
const dbName = 'your_database_name'; // Replace 'your_database_name' with your actual database name

// Route to render the profile.ejs template
app.get('/views/profile', (req, res) => {
    // Connect to MongoDB
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.error('Error connecting to MongoDB:', err);
            return res.status(500).send('Error connecting to MongoDB');
        }

        console.log('Connected to MongoDB');

        const db = client.db(dbName);

        // Fetch staff data from MongoDB
        db.collection('staff').findOne({}, (err, staffData) => {
            if (err) {
                console.error('Error fetching staff data:', err);
                return res.status(500).send('Error fetching staff data');
            }

            // Render the profile.ejs template with the retrieved data
            res.render('profile', { staff: staffData });
        });
    });
});*/


// Sample data (replace this with your actual data)
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
    references: "Available upon request"
};

// Route to render the index.ejs template
app.get('/views/profile', (req, res) => {
    res.render('profile', { staff: staffData });
});

// Define routes
app.get('/index', (req, res) => {
    res.render('index');
});

// Define routes
app.get('/login', (req, res) => {
    res.render('login');
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
