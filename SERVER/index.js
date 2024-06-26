const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PhoneBook = require('./model/phonebook.js');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const DB = 'mongodb://localhost:27017/kokila';

mongoose.connect(DB)
  .then(() => {
    console.log('Database connected..');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

// POST: Add a new phone book entry
app.post('/add-phone', async (req, res) => {
  const data = req.body
  console.log(data)
  try {
    const newPhoneBook = new PhoneBook(data);
    await newPhoneBook.save();
    res.status(201).json({
      status: 'Success',
      data: {
        phoneBook: newPhoneBook
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message // This will include Mongoose validation errors
    });
  }
});

// GET: Retrieve all phone book entries
app.get('/get-phone', async (req, res) => {
  try {
    const phoneBooks = await PhoneBook.find();
    res.status(200).json({
      status: 'Success',
      data: {
        phoneBooks
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message
    });
  }
});

// PATCH: Update a phone book entry by ID
app.patch('/update-phone/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPhoneBook = await PhoneBook.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'Success',
      data: {
        phoneBook: updatedPhoneBook
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message
    });
  }
});

// DELETE: Delete a phone book entry by ID
app.delete('/delete-phone/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await PhoneBook.findByIdAndDelete(id);
    res.status(204).json({
      status: 'Success',
      data: null
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
