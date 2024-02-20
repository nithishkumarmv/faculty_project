// app.js

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();

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

// Routes
app.get('/login', (req, res) => {
    res.render('login.ejs');
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

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});