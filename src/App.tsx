import React, { useState, useEffect } from "react";
import { Routes } from "./Routes";
import { setAccessToken } from "./accessToken";
import styled from 'styled-components'

const LoadingWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`

export const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://work-project-server.herokuapp.com/refresh_token", {
      method: "POST",
      credentials: "include"
    }).then(async res => {
      const { accessToken } = await res.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  return <Routes />;
};