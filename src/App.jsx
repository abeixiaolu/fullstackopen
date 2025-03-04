import { useState } from "react";
import { useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import AddPersonForm from "./components/AddPersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: "",
  });
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const showList = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  function showMessage(message, msgType = "success") {
    setMessage(message);
    setMessageType(msgType);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

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
          showMessage(`${data.name} updated success!`);
        })
        .catch(() => {
          showMessage(`${name} has already been removed from server`, "error");
        });
      return;
    }
    personsService.save(newPerson).then((data) => {
      setPersons(persons.concat(data));
      setNewPerson({
        name: "",
        number: "",
      });
      showMessage(`${data.name} added success!`);
    });
  }

  function handleRemove(id, name) {
    const confirmRemove = window.confirm(`Delete ${name} ?`);
    if (!confirmRemove) return;
    personsService.remove(id).then((data) => {
      setPersons(persons.filter((p) => p.id !== id));
      showMessage(`${data.name} removed success!`);
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
      <Notification message={message} type={messageType} />
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
