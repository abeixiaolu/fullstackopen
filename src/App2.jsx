import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Filter({ name, setName }) {
  return (
    <div>
      find countries:
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}

function Country({ country }) {
  if (!country) return null;
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>{country.capital[0]}</p>
      <span style={{ fontSize: 50 }}>{country.flag}</span>
      <ul>
        {Object.entries(country.languages).map(([, value]) => {
          return <li key={value}>{value}</li>;
        })}
      </ul>
    </div>
  );
}

function App() {
  const [countries, setCountries] = useState([]);
  const [show, setShows] = useState([]);
  const [name, setName] = useState("");
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        console.log("response: ", response.data);
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    const shows = countries.filter((c) =>
      c.name.common.toLowerCase().includes(name.toLowerCase())
    );
    setShows(shows);
    if (shows.length === 1) {
      setCurrent(shows[0]);
    } else {
      setCurrent(null);
    }
  }, [name, countries, setShows]);
  const showCountriesCount = show.length;
  return (
    <div>
      <Filter name={name} setName={setName} />
      {!name ? null : showCountriesCount > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        showCountriesCount < 10 &&
        showCountriesCount > 1 && (
          <ul>
            {show.map((c) => (
              <li key={c.cca2}>
                {c.name.common}
                <button onClick={() => setCurrent(c)}>show</button>
              </li>
            ))}
          </ul>
        )
      )}
      <Country country={current} />
    </div>
  );
}

export default App;
