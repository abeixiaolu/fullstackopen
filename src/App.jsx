import { useState } from "react";
import { useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import AddPersonForm from "./components/AddPersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
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
      const confirmed = window.confirm(
        `${name} is already added to phone book, do you surely want to change it?`
      );
      if (!confirmed) return;
      personsService
        .edit(existPerson.id, { ...newPerson, id: existPerson.id })
        .then((data) => {
          setPersons(persons.map((p) => (p.id === existPerson.id ? data : p)));
          setNewPerson({
            name: "",
            number: "",
          });
        });
      return;
    }
    personsService.save(newPerson).then((data) => {
      setPersons(persons.concat(data));
      setNewPerson({
        name: "",
        number: "",
      });
    });
  }

  function handleRemove(id, name) {
    const confirmRemove = window.confirm(`Delete ${name} ?`);
    if (!confirmRemove) return;
    personsService.remove(id).then((data) => {
      console.log(data);
      setPersons(persons.filter((p) => p.id !== id));
    });
  }

  useEffect(() => {
    personsService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

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
      <Persons showList={showList} onRemovePerson={handleRemove} />
    </div>
  );
};

export default App;
