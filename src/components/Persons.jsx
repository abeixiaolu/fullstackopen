function Persons({ showList }) {
  return (
    <ul>
      {showList.map((p) => (
        <li key={p.name}>
          {p.name} - {p.number}
        </li>
      ))}
    </ul>
  );
}

export default Persons;
