import React, { useState, useEffect } from "react";
import '../Home/Home.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function Home({ email }) {
  const [data, setData] = useState([{ name: "", phone: "" }]);
  const [display, setDisplay] = useState([]);

  
  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:3001/get-people');
      const people = await response.json();
      setDisplay(people);
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const addPerson = () => {
    const newPerson = { name: "", phone: "" };
    setData([...data, newPerson]);
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    let updatedData = [...data];
    updatedData[index][name] = value;
    setData(updatedData);
  };

  const deletePerson = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const deletePersonOnServer = async (id) => {
    try {
      await fetch(`http://localhost:3001/delete-person/${id}`, {
        method: 'DELETE',
      });
      
      setDisplay(display.filter((person) => person._id !== id));
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  const logData = () => {
    let persons = data.map((obj) => ({ name: obj.name, phone: obj.phone }));
    console.log(persons);


    fetch("http://localhost:3001/add-person", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(persons),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Connected successfully");
        
        fetchPeople();
      })
      .catch(() => {
        console.log("Connection failed");
      });
  };

  return (
    <div className="Container-Home">
      <h1>Welcome🙏, <b>{email}!</b></h1>
      <div className="Table-Container">
        <Button variant="primary" size="lg" onClick={addPerson}>
          Add Person
        </Button>
      </div>
      <div className="table-container">
      <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Tittle</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((person, index) => (
              <tr key={index}>
                <td>
                  <input
                    name="name"
                    value={person.name}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Tittle"
                  />
                </td>
                <td>
                  <input
                    name="phone"
                    value={person.phone}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Description"
                  />
                </td>
                <td>
                  <Button type="button" onClick={() => deletePerson(index)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Button type="button" onClick={logData}>Submit</Button>

      <Table className="table-2" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Tittle</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {display.map((person) => (
            <tr key={person._id}>
              <td className="size-1">{person.name}</td>
              <td className="size-1">{person.phone}</td>
              <td className="size-1">
                <Button  className="btn-2" variant='danger' onClick={() => deletePersonOnServer(person._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
