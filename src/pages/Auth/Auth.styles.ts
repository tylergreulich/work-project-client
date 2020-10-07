import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 20%;
  margin: 0 auto;
`

export const MyForm = styled.form`
  width: 100%;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem 0;
`

export const Button = styled.button`
  padding: 0.25rem 0.75rem;
  text-transform: uppercase;
  font-size: 0.8rem;
  border: 2px solid black;
  background-color: #000;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;

  &:disabled {
    background-color: #fff;
    color: grey;
    border: 2px solid grey;
    cursor: not-allowed;
  }
`
