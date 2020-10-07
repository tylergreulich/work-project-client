
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { useLoginMutation, MeDocument, MeQuery } from "../../generated/graphql";
import { setAccessToken } from "../../accessToken";
import { Button, FormContainer, InputContainer, MyForm } from "./Auth.styles";

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const [loading, setLoading] = useState(false)

  const isDisabled = !email.length || !password.length

  return (
    <FormContainer>
      <h1>Please Login</h1>
      <MyForm
        onSubmit={async e => {
          e.preventDefault();
          setLoading(true)
          const response = await login({
            variables: {
              email,
              password
            },
            update: (store, { data }) => {
              if (!data) {
                return null;
              }
              
              store.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: data.login.user
                }
              });
            }
          });
          
          console.log(response);
          
          if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
          }

          setLoading(false)
          
          history.push("/");
        }}
        >
        <InputContainer>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            name="email"
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            name="password"
            />
        </InputContainer>
        <Button type="submit" disabled={isDisabled || loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </MyForm>
    </FormContainer>
  );
};