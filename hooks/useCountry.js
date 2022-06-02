import React, { useState, useEffect } from "react";
import axios from "axios";

const UseCountry = () => {
  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.gleif.org/api/v1/countries?page[size]=9999")
      .then((data) => {
          setCountriesList(data.data.data)
          console.log(data.data.data)
      })
  }, []);
  return { countriesList };
};

export default UseCountry;
