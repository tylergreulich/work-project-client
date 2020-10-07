
import React, { useCallback, useState } from "react";
import { useRegisterMutation } from "../../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import axios from 'axios'
import { Button, FormContainer, InputContainer, MyForm } from "./Auth.styles";

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<null | File>(null);
  const [register] = useRegisterMutation();
  const [loading, setLoading] = useState(false)

const onDrop = useCallback((acceptedFiles: File[]) => {
  console.log(acceptedFiles)
    setImage(acceptedFiles[0])
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop })

  const isDisabled = !email.length || !password.length || !image

  return (
    <FormContainer>
      <MyForm
        onSubmit={async e => {
          e.preventDefault();
          const formData = new FormData();
          formData.append('file', image!);
          formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET!);
          setLoading(true)
          const imageRes = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
            formData,
            );
            
            const variables = {
              email,
              password,
              image: imageRes.data.secure_url
            }
            
            const response = await register({
              variables
            });
            setLoading(false)
            console.log(response);
            
            history.push("/login");
          }}
          >
        <InputContainer>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            name="email"
            placeholder="Email"
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
            name="password"
            placeholder="Password"
            />
        </InputContainer>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
            <p>Drop the files here...</p> : image ? 
            <p>{image.name}</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
        <Button type="submit" disabled={isDisabled || loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </MyForm>
    </FormContainer>
  );
};
