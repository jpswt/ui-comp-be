require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 4005;

const questionsRoutes = require('./src/routes/questions');
const usersRoutes = require('./src/routes/users');
const authRoutes = require('./src/routes/auth');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/questions', questionsRoutes);

app.get('/', (req, res) => {
	res.json('Welcome to my server');
});

app.listen(PORT, () => {
	console.log('server running on port', PORT);
});
