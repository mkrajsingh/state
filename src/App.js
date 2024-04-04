import React, { useState, useEffect } from "react";
import "./styles.css";

function LocationSelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  };

  const fetchStates = async (country) => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      );
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Failed to fetch states:", error);
    }
  };

  const fetchCities = async (country, state) => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedState("");
    setSelectedCity("");
    if (selectedCountry) {
      fetchStates(selectedCountry);
    } else {
      setStates([]);
      setCities([]);
    }
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    setSelectedCity("");
    if (selectedState) {
      fetchCities(selectedCountry, selectedState);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="container">
      <h1>Location Selector</h1>
      <div className="dropdown-container">
        <label>Select Country:</label>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">-- Select Country --</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div className="dropdown-container">
        <label>Select State:</label>
        <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="">-- Select State --</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div className="dropdown-container">
        <label>Select City:</label>
        <select
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option value="">-- Select City --</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && selectedState && selectedCountry && (
        <p>
          You selected: {selectedCity}, {selectedState}, {selectedCountry}
        </p>
      )}
    </div>
  );
}

export default LocationSelector;
