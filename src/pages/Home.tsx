import React from "react";
import { useHistory } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";
import styled from 'styled-components'

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const LoadingWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`


export const Home = () => {
  const { data } = useMeQuery({ fetchPolicy: "network-only" });
  const history = useHistory()

  if (!data) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  if (!data.me) {
    history.push('/register')
  }

  return (
    <HomeContainer>
      <h1>User Info</h1>
      <p>Email: {data.me?.email}</p>
      <img src={data.me?.image} width={500} height={500} alt={`uploaded by ${data.me?.email}`} />
    </HomeContainer>
  );
};
