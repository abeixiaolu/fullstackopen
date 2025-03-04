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
  const [shows, setShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

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
      c.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setShows(shows);
    if (shows.length === 1) {
      setSelectedCountry(shows[0]);
    } else {
      setSelectedCountry(null);
    }
  }, [searchQuery, countries]);
  const showCountriesCount = shows.length;
  /**
   * 渲染国家列表
   * @returns {JSX.Element|null} 国家列表组件或null
   */
  const renderCountryList = () => {
    // 没有搜索查询时不显示任何内容
    if (!searchQuery) {
      return null;
    }

    // 匹配国家过多时显示提示信息
    if (showCountriesCount > 10) {
      return <p>Too many matches, specify another filter</p>;
    }

    // 匹配国家数量适中时显示列表
    if (showCountriesCount > 1 && showCountriesCount < 10) {
      return (
        <ul>
          {shows.map((c) => (
            <li key={c.cca2}>
              {c.name.common}
              <button onClick={() => setSelectedCountry(c)}>show</button>
            </li>
          ))}
        </ul>
      );
    }

    // 当只有一个国家匹配或没有匹配时，不显示列表
    return null;
  };

  return (
    <div>
      <Filter name={searchQuery} setName={setSearchQuery} />
      {renderCountryList()}
      <Country country={selectedCountry} />
    </div>
  );
}

export default App;
