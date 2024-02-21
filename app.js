const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));



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
    references: "Available upon request",
    status: "In review"
};

// Route to render the index.ejs template
app.get('/views/profile', (req, res) => {
    res.render('profile', { staff: staffData });
});
// Define routes
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.redirect('/dashboard');
  } else {
      res.render('login.ejs', { error: 'Invalid email or password' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});


// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
