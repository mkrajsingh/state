import { useState, useEffect } from "react";
import styles from "./styles.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const getCountries = async () => {
    try {
      const res = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const getStates = async () => {
    try {
      const res = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      );
      const data = await res.json();
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const getCities = async () => {
    try {
      const res = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      );
      const data = await res.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      getCities();
    }
  }, [selectedCountry, selectedState]);

  return (
    <div className={styles.citySelector}>
      <h1>Select Location</h1>
      <div className={styles.dropdowns}>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className={styles.dropdown}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
          className={styles.dropdown}
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedCountry && !selectedState}
          className={styles.dropdown}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <h2 className={styles.result}>
          You selected
          <span className={styles.highlight}> {selectedCity},</span>
          <span className={styles.fade}>
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
}

export default App;
