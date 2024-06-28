import  { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css'; 

function App() {
const [formData,setFormData]=useState({
  name:"",
  phone:"",
  email:"",
  rollno:"", 
  Branch:"",
})
  const [phonebook, setPhonebook] = useState([]);
  const [newPhone, setNewPhone] = useState('');

  // Fetch phonebook data on component mount
  useEffect(() => {
    fetchPhonebookData();
  }, []);

  // Function to fetch phonebook data from the server
  const fetchPhonebookData = () => {
    Axios.get('http://localhost:3000/get-phone')
      .then(res => {
        console.log('Phonebook data fetched:', res.data);
        setPhonebook(res.data.data.phoneBooks);
      })
      .catch(err => {
        console.error('Error fetching phonebook data:', err);
      });
  };

  // Function to add a new phone number entry
  const addNewNumber = () => {
    Axios.post('http://localhost:3000/add-phone', formData)
      .then(res => {
        console.log('Phone number added:', res.data);
        // Clear input fields after successful addition
        setFormData({})
        // Refresh phonebook data
        fetchPhonebookData();
      })
      .catch(err => {
        console.error('Error adding phone number:', err);
      });
  };

  // Function to update a phone number entry
  const updatePhone = (id) => {
    Axios.put('http://localhost:3000/update-phone', { id, newPhone })
      .then(res => {
        console.log('Phone number updated:', res.data);
        // Refresh phonebook data
        fetchPhonebookData();
      })
      .catch(err => {
        console.error('Error updating phone number:', err);
      });
  };

  // Function to delete a phone number entry
  const deletePhone = (id) => {
    Axios.delete(`http://localhost:3000/delete-phone/${id}`)
      .then(res => {
        console.log('Phone number deleted:', res.data);
        // Refresh phonebook data
        fetchPhonebookData();
      })
      .catch(err => {
        console.error('Error deleting phone number:', err);
      });
  };

  const handleChange=(event) => {
    const {name, value} = event.target
    setFormData({...formData, [name] : value})
  }

  return (
    <div className="container">
      <h1>PhoneBook List</h1>
      {/* Form for adding new phone number */}
      <form onSubmit={addNewNumber} className="add-form">
        <label htmlFor="name">Name:</label>
        <input name='name' required type="text" id="name" value={formData.name} onChange={handleChange} /><br/><br/>
        <label htmlFor="Branch">Branch</label>
        <input name='Branch' required type="text" id="Branch" value={formData.Branch} onChange={handleChange} /><br/><br/>
        <label htmlFor="Rollno">Rollno:</label>
        <input name='rollno'required  type="text" id="Rollno" value={formData.rollno} onChange={handleChange} minLength={10} maxLength={10}/><br/><br/> 
        <label htmlFor="phone">Phone:</label>
        <input name='phone' required type="text" id="phone" value={formData.phone} onChange={handleChange} minLength={10} maxLength={10}/><br/><br/>
        <label htmlFor="email">Email:</label>
        <input name='email' required type="email" id="email" value={formData.email} onChange={handleChange} /><br/><br/>
        <button>Add New Number</button>
      </form>

      {/* List of phonebook entries */}
      {phonebook.map((entry, idx) => (
        <div key={idx} className="phone-entry">
          <h2>{entry.name}</h2>
          <p>Phone: {entry.phone}</p>
          <p>Email: {entry.email}</p>
          <p>Branch:{entry.Branch}</p>
          <p>rollno:{entry.rollno}</p>
          {/* Update and delete buttons */}
          <div className="actions">
            <input type="text" placeholder="Update Phone..." onChange={(e) => setNewPhone(e.target.value)} />
            <button className="update-btn" onClick={() => updatePhone(entry._id)}>Update</button>
            <button className="delete-btn" onClick={() => deletePhone(entry._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
