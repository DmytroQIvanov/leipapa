import React, { useState, useEffect } from "react";
import axios from "axios";

const UseCountry = ({ companyTextInput, selectedCountry }) => {
  const arrayCountriesWithState = ["CA", "US"];

  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.gleif.org/api/v1/countries?page[size]=9999")
      // .get("https://countriesnow.space/api/v0.1/countries")
      .then((data) => {
        setCountriesList(data.data.data);
        // console.log(data.data.data);
      });
  }, []);

  const [companyList, setCompanyList] = useState([]);
  const [companyText, setCompanyText] = useState("");
  const [statesList, setStatesList] = useState([]);

  useEffect(() => {
    if (arrayCountriesWithState.includes(selectedCountry.id)) {
      axios
        // .post(`https://countriesnow.space/api/v0.1/countries/states`, {
        .get(
          `https://api.gleif.org/api/v1/regions?page[number]=1&page[size]=9999`,
          {
            headers: {
              Accept: "application/vnd.api+json",
              // Authorization:
              //   "PMAK-62a334814c44f23118257d31-1550170493281ca28dae6571183a64e8d1",
              // "Content-Type": "application/json",
            },
          }
        )
        .then((elem) => {
          // console.log(elem);
          const result = elem.data.data.filter((elem) =>
            elem.id.includes("US-")
          );
          console.log("States result", result);
          setStatesList(result);
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
