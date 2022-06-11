import React, { useState, useEffect } from "react";
import axios from "axios";

const UseCountry = ({ selectedCountry }) => {
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

  // const [companyText, setCompanyText] = useState("");
  const [statesList, setStatesList] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.gleif.org/api/v1/entity-legal-forms?page[size]=9999`, {
        headers: {
          Accept: "application/vnd.api+json",
        },
      })
      .then((elem) => {
        console.log("companies", elem.data.data);
        setCompaniesList(elem.data.data);
      });
  }, []);

  useEffect(() => {
    if (arrayCountriesWithState.includes(selectedCountry.id)) {
      axios
        .get(
          `https://api.gleif.org/api/v1/regions?page[number]=1&page[size]=9999`,
          {
            headers: {
              Accept: "application/vnd.api+json",
            },
          }
        )
        .then((elem) => {
          const result = elem.data.data.filter((elem) =>
            elem.id.includes("US-")
          );
          setStatesList(result);
        });
    }
  }, [selectedCountry]);

  // useEffect(() => {
  //   setCompanyText(companyTextInput);
  // }, [companyTextInput]);

  return { countriesList, statesList, companiesList };
};

export default UseCountry;
