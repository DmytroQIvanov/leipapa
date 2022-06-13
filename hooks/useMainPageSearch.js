import React, { useState, useEffect } from "react";
import axios from "axios";
import { string } from "yup";

const UseMainPageSearch = ({ selectedCountry }) => {
  const arrayCountriesWithState = ["CA", "US"];

  const [countriesList, setCountriesList] = useState([]);

  //VALUES FOR SEARCH
  const [companiesText, setCompaniesText] = useState("");
  const [companiesLoading, setCompaniesLoading] = useState(false);

  const handleChangeCompaniesText = (text) => {
    setCompaniesText(text);
  };

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
    setCompaniesLoading(true);
    axios
      // .get(`https://api.gleif.org/api/v1/entity-legal-forms?page[size]=9999`, {
      .get(
        `https://api.gleif.org/api/v1/lei-records${
          !companiesText
            ? `?page[number]=1&page[size]=35`
            : `?filter[entity.legalName]=${companiesText}&page[number]=1&page[size]=35`
        }`,
        {
          headers: {
            Accept: "application/vnd.api+json",
          },
        }
      )
      .then((elem) => {
        console.log("companies", elem.data.data);
        setCompaniesList(elem.data.data);
      })
      .finally(() => {
        setCompaniesLoading(false);
      });
  }, [companiesText]);

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

  return {
    countriesList,
    statesList,
    companiesList,
    states: {
      companies: {
        handleChange: handleChangeCompaniesText,
        value: companiesText,
        loading: companiesLoading,
      },
    },
  };
};

export default UseMainPageSearch;