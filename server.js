const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('./config/passport');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/OrderRoute');
const segmentRoutes = require('./routes/segmentRoute');
const campaignRoutes = require('./routes/CampaignRoute');
const communicationLogRoutes = require('./routes/CommunicationLogRoute');
const authRoutes = require('./routes/AuthRoute');
const app = express();


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // allow cookies to be sent
}));
app.use(bodyParser.json());
app.use(express.json()); // To parse JSON bodies
app.use(cookieParser());


app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', customerRoutes);
app.use('/api', orderRoutes);
app.use('/api', segmentRoutes);
app.use('/api', campaignRoutes);
app.use('/api', communicationLogRoutes);
app.use('/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
