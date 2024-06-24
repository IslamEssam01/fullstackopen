import { useEffect, useState } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const personIndex = persons.findIndex((person) => person.name === newName);
    if (personIndex != -1) {
      if (
        window.confirm(
          `${persons[personIndex].name} is alread added to phonebook, repalce the old number with a new one?`,
        )
      ) {
        personsService
          .updateNumber(persons[personIndex], newNumber)
          .then((newPerson) => {
            setPersons((persons) =>
              persons.map((person) =>
                person.id !== newPerson.id ? person : newPerson,
              ),
            );
            setNewName("");
            setNewNumber("");
            setSuccessMessage(`Updated ${newName} number`);
            setTimeout(() => {
              setSuccessMessage("");
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of  ${newName} has already ben removed from the server`,
            );
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
            setPersons((persons) =>
              persons.filter((person) => person.name !== newName),
            );
          });
      }
      return;
    }
    personsService.create(newName, newNumber).then((newPerson) => {
      setPersons((persons) => [...persons, newPerson]);
      setNewName("");
      setNewNumber("");
    });
    setSuccessMessage(`Added ${newName} number`);
    setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  };

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personsService.deletePerson(person.id).then((deletedPerson) => {
        setPersons((persons) =>
          persons.filter((person) => person.id !== deletedPerson.id),
        );
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type="success" />
      <Notification message={errorMessage} type="error" />
      <Filter
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        searchKeyword={searchKeyword}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
