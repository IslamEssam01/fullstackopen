import axios from "axios";
import { useEffect, useState } from "react";

function Country({ country }) {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <b>languages</b>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags?.png} alt={`${country.name.common} flag`} />
    </div>
  );
}
function Countries({ countries, searchKey }) {
  const foundCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(searchKey.toLowerCase());
  });

  const [shownCountry, setShownCountry] = useState(null);

  // HACK: to remove shown country when searching again
  useEffect(() => setShownCountry(null), [searchKey]);

  if (foundCountries.length === 1)
    return <Country country={foundCountries[0]} />;

  if (foundCountries.length > 10)
    return <p>Too many matches , specify another filter</p>;
  else
    return (
      <>
        {foundCountries.map((country) => (
          <div key={country.name.common}>
            <span>{country.name.common}</span>
            <button onClick={() => setShownCountry(country)}>show</button>
          </div>
        ))}
        {shownCountry && <Country country={shownCountry} />}
      </>
    );
}

function App() {
  const [searchKey, setSearchKey] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (countries === null || countries.length === 0)
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => response.data)
        .then((data) => {
          setCountries(data);
        })
        .catch((error) => {
          setCountries(null);
        });
    // I KNOW that the countries should be added to dependencies but i want it to be activated only when search keyword changes and the countries weren't fetched already
  }, [searchKey]);

  return (
    <>
      <div>
        <span>find countries</span>
        <input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </div>
      {countries === null && <p>couldn't fetch countries</p>}
      {countries !== null && countries.length === 0 && (
        <p>still fetching countries</p>
      )}
      {countries !== null && countries.length > 0 && (
        <Countries countries={countries} searchKey={searchKey} />
      )}
    </>
  );
}

export default App;
