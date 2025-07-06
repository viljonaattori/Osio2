import { useState } from "react";
import Filter from "./Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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

  // Name input tapahtumankäsittelijä
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  // Number input tapahtumankäsittelijä
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <form onSubmit={addPerson}>
        <h2>Add a new</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} – {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
