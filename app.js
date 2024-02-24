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

// Route to render the profile.ejs template
app.get('/views/profile', (req, res) => {
    res.render('profile', { staff: staffData });
});

// Route to render the kar.ejs template
app.get('/views/kar', (req, res) => {
  res.render('kar', { staff: staffData });
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




let applications = [
    { applicationNumber: 1, name: 'A', designation: 'Asst. Professor', department: 'IT', description: 'desc' },
    { applicationNumber: 2, name: 'B', designation: 'Asst. Professor', department: 'CSE', description: 'desc' }
];
let acceptedApplications = [];


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const schema = new mongoose.Schema({
    applicationnumber: Number,
    name: String,
    designation: String,
    department: String,
    description:String,
    hra: Number,
    pa:Number,
    ma:Number


});
const mod = mongoose.model('applications', schema);
app.get('/views/kar', async (req, res) => {
    try{
    await mongo.connect(connectionuri);
    applications=await mod.find({hra:0,pa:0,ma:0});
    acceptedApplications=await mod.find({hra:1});
    //console.log(applications);
    res.render('', { applications, acceptedApplications });
    }
    catch{

    }

    
});
//submit button
app.post('/accept/:applicationnumber', async(req, res) => {
    const applicationnumber = parseInt(req.params.applicationnumber);
    try{
        await mongo.connect(connectionuri);
        await mod.updateMany({applicationnumber:applicationnumber},{hra:1,description:"Accepted By HR"});
        
    }
    catch{

    }
    
    res.redirect('/');
});
//reject button
app.post('/reject/:applicationnumber',async (req, res) => {
    const applicationnumber = parseInt(req.params.applicationnumber);
    try{
        await mongo.connect(connectionuri);
        await mod.updateMany({applicationnumber:applicationnumber},{hra:1,description:"Rejected by HR"});
        
    }
    catch{

    }
    res.redirect('/');
    
});


// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
