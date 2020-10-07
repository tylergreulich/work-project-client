import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import styled from 'styled-components'
import { setAccessToken } from "../accessToken";

const StyledNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  ul {
    display: flex;
    padding: 0 4rem;

    li {
      margin: 0 1rem;
      list-style: none;
      
      a {
        text-decoration: none;
      }
    }

    a, button {
      text-transform: uppercase;
      background-color: #fff;
      border: 2px solid black;
      padding: 0.25rem 1rem;
      cursor: pointer;
      color: #000;

      &:hover {
        background-color: #000;
        color: #fff;
        transition: all 0.3s ease-in-out;
      }
    }
  }
`

export const Navigation = () => {
  const { data } = useMeQuery({ fetchPolicy: "network-only" });
  const [logout, { client }] = useLogoutMutation();
  const history = useHistory()

  if (!data) {
    return null
  }

  return (
    <StyledNav>
      <ul>
        {!data?.me ? (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">
                Login
              </Link>
            </li>
          </>
        ) : (
          <button 
            onClick={async () => {
              await logout();
              setAccessToken('');
              await client!.resetStore();
              history.push('/register')
            }}>
              Logout
          </button>
        )}
      </ul>
    </StyledNav>
    )
}
