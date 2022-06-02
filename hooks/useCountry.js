import React, { useState, useEffect } from "react";
import axios from "axios";

const UseCountry = ({companyTextInput}) => {
  const [countriesList, setCountriesList] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.gleif.org/api/v1/countries?page[size]=9999")
      .then((data) => {
          setCountriesList(data.data.data)
          console.log(data.data.data)
      })
  }, []);

  const [companyList, setCompanyList] = useState([]);
  const [companyText,setCompanyText] = useState('');

  useEffect(()=>{
      setCompanyText(companyTextInput);
  },[companyTextInput])

  useEffect(() => {
    axios
      .get(`https://api.gleif.org/api/v1/fuzzycompletions?field=fulltext&q=${companyText}`)
      .then((data) => {
          setCompanyList(data.data.data)
          console.log(data.data.data)
      })
  }, [companyText]);
  return { countriesList,companyList };
};

export default UseCountry;
