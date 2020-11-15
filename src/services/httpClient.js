import { Redirect } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React from "react";

let instance = axios.create({
  baseURL: "https://royal-forest-wpasclefbxlm.vapor-farm-a1.com/",
  //baseURL: "https://tcatlogistics.com/",
});

instance.interceptors.request.use(
  async (config) => {
    const jwtToken = await localStorage.getItem("token");

    if (jwtToken != null) {
      config.headers = { Authorization: `bearer ${jwtToken}` };
      const dateExp = jwtDecode(jwtToken.replace("bearer ", "")).exp;
      const dateNow = Math.trunc(Date.now() / 1000);

      if (dateExp < dateNow) {
        return <Redirect to={{ pathname: "/login" }} />;
      }
    }

    return config;
  },

  function(error) {
    const code = parseInt(error.response && error.response.status);
    if ([401, 403].includes(code)) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    return Promise.reject(error);
  },
);

export default instance;
