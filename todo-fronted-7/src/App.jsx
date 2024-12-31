import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState({ _id: "", name: "", qualification: "", contact: "", date: "" });
  const [btn, setBtn] = useState("Save");

  // Handle input changes
  function handleChange(e) {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  }

  // Handle form submission (create or update)
  function handleSubmit(e) {
    e.preventDefault();
    if (todo._id) {
      updateTodo();
    } else {
      postTodo();
    }
    cls();
  }

  // Fetch all todos (doctors data)
  async function getTodo() {
    try {
      const res = await axios.get("https://five-crud.onrender.com/api/doctorss");
      const data = res.data;
      setData(data.data);  // Correctly set the data array
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getTodo();
  }, []);

  // Function to create a new todo
  async function postTodo() {
    try {
      const newTodo = {
        name: todo.name,
        qualification: todo.qualification,
        contact: todo.contact
      };

      // Make the POST request
      await axios.post("https://five-crud.onrender.com/api/doctorss", newTodo);

      // Fetch updated list after adding new data
      getTodo();

    } catch (error) {
      console.log(error.message);
    }
  }

  // Function to update an existing todo
  async function updateTodo() {
    try {
      const updatedTodo = { ...todo };

      await axios.put(`https://five-crud.onrender.com/api/doctorss/${todo._id}`, updatedTodo);
      getTodo();  // Fetch updated list

    } catch (error) {
      console.log(error.message);
    }
  }

  // Function to delete a todo
  async function deleteTodo(id) {
    try {
      await axios.delete(`https://five-crud.onrender.com/api/doctorss/${id}`);
      getTodo();
    } catch (error) {
      console.log(error.message);
    }
  }

  // Function to edit a todo (set values in the form)
  function editData(el) {
    setTodo({
      _id: el._id,
      name: el.name,
      qualification: el.qualification,
      contact: el.contact,
      date: el.createdAt  // Use the createdAt date from the backend
    });
    setBtn("Update");
  }

  // Function to clear form
  function cls() {
    setTodo({ _id: "", name: "", qualification: "", contact: "", date: "" });
    setBtn("Save");
  }

  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter name' name='name' value={todo.name} onChange={handleChange} className='form-control my-2' />
            <input type="text" placeholder='Enter qualification' value={todo.qualification} name='qualification' onChange={handleChange} className='form-control my-2' />
            <input type="text" placeholder='Enter contact' name='contact' value={todo.contact} onChange={handleChange} className='form-control my-2' />
            <input type="submit" value={btn} className='btn btn-primary my-2' />
          </form>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Qualification</th>
                <th>Contact</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map(el => (
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td>{el.qualification}</td>
                  <td>{el.contact}</td>
                  <td>{new Date(el.createdAt).toDateString()}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => { editData(el) }}>Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => { deleteTodo(el._id) }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
