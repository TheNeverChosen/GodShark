const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./features/auth/routes');
const userRoutes = require('./features/user/routes');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(cookieParser());
app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);

app.listen(3220);