import { TextField, Typography } from '@mui/material';
import React, {useState} from 'react'
import "./LoginRegister.css"

function LoginPage() {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  
  const onEmailHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  }

  const onPasswordHandler = (event : React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value)
}

  const onSubmit = (event : React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  return (
      <div className="loginregister">
        <Typography variant="h2" gutterBottom className='div-wrapper'>
          Quiz platform
        </Typography>
        <form>
            <div className='div-wrapper'>
                <TextField 
                name="email" 
                type="email" 
                placeholder="Email..." 
                value={email} 
                onChange={onEmailHandler} 
                className="loginregister-input">

                </TextField>
            </div>
            <div className='div-wrapper'>
                <TextField 
                name="password"
                type="password" 
                placeholder="Password..." 
                value={password} 
                onChange={onPasswordHandler} 
                className="loginregister-input"></TextField>
            </div>
            <div className='div-wrapper'>
                <button type="submit" onSubmit={onSubmit} className="submit-button">Login</button>
            </div>
        </form>
      </div>
    );
  }

export default LoginPage;