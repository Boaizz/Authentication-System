const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');

function generateJwtSecret() {
    const byteLength = 64;
    return crypto.randomBytes(byteLength).toString('hex');
}

// User data (Replace this with a database in production)
const users = [];
const changelog = [];

// Secret key generation for JWT 
const jwtSecret = generateJwtSecret();
console.log('Generated JWT Secret:', jwtSecret);

// Input validation and sanitization
const validatedInput = [
    body('username')
    .notEmpty()
    .withMessage('Username is required!')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric!').trim().escape(),
    body('password')
    .notEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters!').trim().escape(),
    body('dob')
    .notEmpty()
    .withMessage('Date of Birth is required.')
    .custom((value) => {
        const dobDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            return age - 1 > 18;
        }
        return age > 18;

    }).withMessage('You must be at least 18 years old to register.')
];;

// User registration
router.post('/register', validatedInput, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Check if the username already exists
    if (users.some(user => user.username === username)) {
        return res.status(409).json({ message: 'Username already exists.' });
    }

    const newUser = { username, password };
    users.push(newUser);

    // Create a JWT token for the new user
    const token = jwt.sign({ username }, jwtSecret);
    res.status(201).json({ message: 'Registration successful.', token });
    changelog.push({
        action: 'User Registration',
        username,
        timestamp: new Date().toISOString(),
    });


});

// User login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Find the user by username and password
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Wrong username or password.' });
    }
    // Create a JWT token for the authenticated user
    const token = jwt.sign({ username }, jwtSecret);
    res.json({ message: 'Login successful.', token });

    changelog.push({
        action: 'User Login',
        username,
        timestamp: new Date().toISOString(),
    });
});

// Update user profile/password route
router.post('/update-profile', [
    body('username')
    .notEmpty()
    .withMessage('Username is required!')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric!').trim().escape(),
    body('password')
    .notEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 8 })
    .withMessage('Password Must Be at Least 8 Characters!').trim().escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    const token = req.header('Authorization');

    changelog.push({
        action: 'Profile Update',
        username,
        timestamp: new Date().toISOString(),
    });

    // Validate the token 
    jwt.verify(token.replace('Bearer ', ''), jwtSecret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        // Find the user
        const user = users.find(user => user.username === decodedToken.username);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update the user's profile/password
        user.username = username;
        user.password = password;

        return res.json({ message: 'Profile updated successfully.' });


    });
});


// User profile route
router.get('/profile', (req, res) => {
    const token = req.header('Authorization');

    jwt.verify(token.replace('Bearer ', ''), jwtSecret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        const user = users.find(user => user.username === decodedToken.username);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Respond with the user's profile information
        res.json({ username: user.username });
    });
});

// Changelog route
router.get('/changelog', (req, res) => {
    res.json(changelog);
});
module.exports = router;