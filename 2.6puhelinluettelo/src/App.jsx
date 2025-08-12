import { useState, useEffect } from "react";
import Notification from "./services/Notification";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from "./services/PersonDB";
import "./index.css";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [noteMessage, setNoteMessage] = useState({ text: null, type: "" });

  useEffect(() => {
    console.log("effect");
    personService
      .getAll()
      .then((initialPersons) => {
        console.log("promise fulfilled");
        setPersons(initialPersons);
      })
      .catch((error) => {
        const msg = error?.response?.data?.error || "Fetching persons failed";
        showNotification(`Error: ${msg}`, "error");
        console.log(error);
      });
  }, []);

  // Ilmoitusviesti
  const showNotification = (text, type = "success") => {
    setNoteMessage({ text, type });
    setTimeout(() => {
      setNoteMessage({ text: null, type: "" });
    }, 4000);
  };

  // Henkilön poisto
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification(`Deleted ${name}`, "error");
        })
        .catch((error) => {
          const msg = error?.response?.data?.error || "Deleting failed";
          showNotification(`Error: ${msg}`, "error");
          console.log(error);
        });
    }
  };

  // Filtteröinti
  // includes etsii koko sanasta ja startswith etsii alusta
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().startsWith(filter.toLowerCase())
  );

  // Listaan lisääminen
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };
    const existingPerson = persons.find((p) => p.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook. Replace the old number with a new one?`
      );
      if (confirmUpdate) {
        personService
          .update(existingPerson.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== existingPerson.id ? p : updatedPerson
              )
            );
            showNotification(
              `Updated number for ${updatedPerson.name}`,
              "success"
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            const msg =
              error?.response?.data?.error ||
              `Information of ${newName} has already been removed from server`;
            showNotification(`Error: ${msg}`, "error");
            // Poista listasta vain jos backend palautti 404
            if (error?.response?.status === 404) {
              setPersons(persons.filter((p) => p.id !== existingPerson.id));
            }
            console.log(error);
          });
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          showNotification(`Added ${returnedPerson.name}`, "success");
        })
        .catch((error) => {
          // NÄYTÄ Mongoosen validaatiovirhe, esim. minLength < 3
          const msg = error?.response?.data?.error || "Creating person failed";
          showNotification(`Error: ${msg}`, "error");
          console.log(error.response.data);
        });
    }
  };

  return (
    <div>
      <h2>Phonebookk</h2>
      <Notification message={noteMessage} />
      <Filter filter={filter} setFilter={setFilter} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
