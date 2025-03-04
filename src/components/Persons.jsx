function Persons({ showList, onRemovePerson }) {
  return (
    <ul>
      {showList.map((p) => (
        <li key={p.id}>
          <span>
            {p.name} - {p.number}
          </span>
          <button onClick={() => onRemovePerson(p.id, p.name)}>delete</button>
        </li>
      ))}
    </ul>
  );
}

export default Persons;
