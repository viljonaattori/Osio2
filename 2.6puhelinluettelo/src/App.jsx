import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Person";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/Persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  // Palauttaa true tai false
  const alreadyExist = (name) => persons.some((p) => p.name === name);

  // Filtteröinti
  // includes etsii koko sanasta ja startswith etsii alusta
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().startsWith(filter.toLowerCase())
  );

  // Listaan lisääminen
  const addPerson = (event) => {
    event.preventDefault(); // Estää oletusarvoisen toiminnan
    if (alreadyExist(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = { name: newName, number: newNumber };
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
