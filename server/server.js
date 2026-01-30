const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

const userRoutes = require('./routes/user.routes'); 
app.use('/api', userRoutes); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("TipsyBean Database Connected!"))
  .catch(err => console.log("Connection Error: ", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));