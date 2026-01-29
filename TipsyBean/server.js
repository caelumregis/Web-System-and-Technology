const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("TipsyBean Database Connected!"))
  .catch(err => console.log("Connection Error: ", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));


