import { useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import AddPersonForm from "./components/AddPersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const [filter, setFilter] = useState("");
  const showList = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  function handleSubmit(e) {
    e.preventDefault();
    const name = newPerson.name.trim();
    const existPerson = persons.find((p) => p.name === name);
    if (existPerson) {
      alert(`${name} is already added to phone book`);
      return;
    }
    setPersons(persons.concat({ ...newPerson, name: newPerson.name.trim() }));
    setNewPerson({
      name: "",
      number: "",
    });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h4>add a new</h4>
      <AddPersonForm
        handleSubmit={handleSubmit}
        newPerson={newPerson}
        setNewPerson={setNewPerson}
      />
      <h2>Numbers</h2>
      <Persons showList={showList} />
    </div>
  );
};

export default App;
