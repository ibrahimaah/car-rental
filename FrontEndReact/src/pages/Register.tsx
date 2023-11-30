import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink, useNavigate } from 'react-router-dom';
import axios,{ AxiosError } from 'axios';
import { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

// type FormErrorType = {
//   [key:string] : {
//     isError : boolean
//     helperText : string
//   }
// }

// const validation_errors: FormErrorType = {}

// validation_errors['name'] = {
//   isError : false,
//   helperText :'name is required'
// }

// function getErrorMsg(fieldName:string,errType:string):string|undefined{
//   switch(errType){
//     case 'required':
//       return `${fieldName} is required`
//     case 'test':
//       return `${fieldName} test`
//   }
// }


export default function Register() {

  let navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const [isError,setIsError] = useState({name:false,email:false})
  const [helperText,setHelperText] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name')
    const email = data.get('email')
    const password = data.get('password')
    const c_password = data.get('c_password')
    

    if (!name) {
      setIsError({...isError,name:true})
      setHelperText('Name is required')
    }
    else{
      setIsLoading(true)
      axios.post('http://127.0.0.1:8000/api/register',
      { name,email,password,c_password })
      .then(()=>{ 
        
        navigate('/login')
        setIsLoading(false)
      })
      .catch((error:AxiosError) => {
        console.log(error.message)
      })
      .finally(()=>setIsLoading(false))
    }

  };

  
  return (
    <>
      {isLoading && (
        <Box sx={{ width: '100%' }}>
         <LinearProgress />
        </Box>
      )}



      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={isError.name}
                  helperText={ isError ? helperText : ''}
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="c_password"
                  label="Confirm Password"
                  type="password"
                  id="c_password"
                  autoComplete="new-confirm-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to='/login' className='text-primary'>
                  {"Already have an account? Sign in"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}