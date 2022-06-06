import React, { useState, useEffect } from "react";
import axios from "axios";

const UseCountry = ({ companyTextInput, selectedCountry }) => {
  const arrayCountriesWithState = ["CA", "US"];

  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    axios
      // .get("https://api.gleif.org/api/v1/countries?page[size]=9999")
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((data) => {
        setCountriesList(data.data.data);
        console.log(data.data.data);
      });
  }, []);

  const [companyList, setCompanyList] = useState([]);
  const [companyText, setCompanyText] = useState("");
  const [statesList, setStatesList] = useState([]);

  useEffect(() => {
    if (arrayCountriesWithState.includes(selectedCountry.iso2)) {
      axios
        .post(`https://countriesnow.space/api/v0.1/countries/states`, {
          country: selectedCountry.country,
        })
        .then((elem) => {
          setStatesList(elem.data.data.states);
          console.log(elem.data.data.states);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    setCompanyText(companyTextInput);
  }, [companyTextInput]);

  useEffect(() => {
    axios
      .get(
        `https://api.gleif.org/api/v1/fuzzycompletions?field=fulltext&q=${companyText}`
      )
      .then((data) => {
        setCompanyList(data.data.data);
        console.log(data.data.data);
      });
  }, [companyText]);
  return { countriesList, companyList, statesList };
};

export default UseCountry;
