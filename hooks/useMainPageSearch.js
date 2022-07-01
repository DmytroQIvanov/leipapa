import React, { useState, useEffect } from "react";
import axios from "axios";
// import { env } from "eslint-config-next";

const UseMainPageSearch = ({ values, setFieldValue }) => {
  const arrayCountriesWithState = ["CA", "US"];

  const [countriesList, setCountriesList] = useState([]);

  //VALUES FOR SEARCH
  const [companiesText, setCompaniesText] = useState("");
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [companiesOfficersLoading, setCompaniesOfficersLoading] =
    useState(false);

  const handleChangeCompaniesText = (text) => {
    setCompaniesText(text);
  };

  useEffect(() => {
    axios
      .get("https://api.gleif.org/api/v1/countries?page[size]=9999")
      .then((data) => {
        setCountriesList(data.data.data);
      });
  }, []);

  // const [companyText, setCompanyText] = useState("");
  const [statesList, setStatesList] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);
  const [companiesOfficersList, setCompaniesOfficersList] = useState([]);

  useEffect(() => {
    setCompaniesLoading(true);
    axios
      .get(
        `https://api.company-information.service.gov.uk/search/companies?q=${companiesText}`,
        {
          headers: {
            Authorization: "a0a093ec-5597-40b6-94ec-967e8016c28a",
          },
        }
      )
      .then((elem) => {
        console.log("companies", elem.data.items);
        setCompaniesList(elem.data.items);
      })
      .finally(() => {
        setCompaniesLoading(false);
      });
  }, [companiesText]);

  useEffect(() => {
    if (
      values.country?.id &&
      arrayCountriesWithState.includes(values.country.id)
    ) {
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
  }, [values.country]);

  useEffect(() => {
    let data = JSON.stringify({
      client_id: "Makhmud.Makhmudov.LEIPapa@rapidlei-staging.com",
      client_secret: "gYuexPg9Qc9dtiH03ZGlycQ73pQjq4aToj9ECNkZg",
      grant_type: "client_credentials",
    });
    console.log(data);
    let config = {
      url: "https://apistaging.rapidlei.com/v1/auth/token",
      // headers: {
      //   "Access-Control-Allow-Origin": "https://leipapa.vercel.app/",
      //   "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      //   "Access-Control-Request-Headers": "Authorization, Content-Type",
      //   "Content-Type": "application/json",
      //   Origin: "https://leipapa.vercel.app/",
      // },
      data,
    };
    axios
      .patch("https://apistaging.rapidlei.com/v1/auth/token", data, {
        headers: {
          client_id: "Makhmud.Makhmudov.LEIPapa@rapidlei-staging.com",
          client_secret: "gYuexPg9Qc9dtiH03ZGlycQ73pQjq4aToj9ECNkZg",
          grant_type: "client_credentials",
          Origin: "https://leipapa.vercel.app",
          "Access-Control-Request-Method": "PATCH",
          "Access-Control-Request-Headers": "Content-Type,API-Key",
        },
      })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (values.company) {
      setCompaniesOfficersLoading(true);
      axios
        .get(
          `https://api.company-information.service.gov.uk/company/${values.company.company_number}/officers`,
          {
            headers: {
              Authorization: "a0a093ec-5597-40b6-94ec-967e8016c28a",
            },
          }
        )
        .then((elem) => {
          console.log("officers", elem.data.items);
          setCompaniesOfficersList(elem.data.items);
        })
        .finally(() => {
          setCompaniesOfficersLoading(false);
        });
    }
  }, [values.company]);

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
      company: {
        officers: {
          list: companiesOfficersList,
          loading: companiesOfficersLoading,
        },
      },
    },
  };
};

export default UseMainPageSearch;
