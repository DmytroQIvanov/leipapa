import React, { useEffect, useState } from "react";
import FormikWrapper from "./FormikWrapper";
import Component from "./Component";

const MainPage = (data) => {
  console.log(data);
  // console.log(errors);
  return (
    <FormikWrapper>{(data) => <Component data={data.formikData} />}</FormikWrapper>
  );
};

export default MainPage;
