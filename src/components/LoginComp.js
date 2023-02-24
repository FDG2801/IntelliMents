import {useContext, useState} from 'react';
import {Box, Button, Grid, InputAdornment, Paper, Stack, TextField, Typography} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import {Alert, AlertTitle} from "@mui/material";
import {DataContext} from "../DataContext";
import LoginIcon from '@mui/icons-material/Login';
import isEmail from 'validator/lib/isEmail';
//import { useHistory } from 'react-router-dom'; //login


function ValidateEmail(mail) {
    return isEmail(mail)
}


function LoginComp(props) {

    //login data
    const [emailInput, setEmailInput] = useState('testuser@polito.it');
    const [passwordInput, setPasswordInput] = useState('password');
    //const history = useHistory(); is now navigate
    const navigate = useNavigate();
    const [loginFailed, setLoginFailed] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    //let {setLoggedIn, setStudent, setSearchingPlan} = props
    let emailIsValid = ValidateEmail(emailInput) && emailInput !== ''
    let passwordIsValid = passwordInput !== ''
    //const {setCoursesInContext, setPlanItemsInContext} = useContext(DataContext)
    /**
     * 
     * since there is no backend i need to hardcode it
     */
    const handleEmailChange = (e) => {
        setEmailInput(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordInput(e.target.value);
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        //since it is an example, only one user
        let hardcodedCred = {
            email: 'testuser@polito.it',
            password: 'password'
        }
    
        if ((emailInput === hardcodedCred.email) && (passwordInput === hardcodedCred.password)) {
            //combination is good. Log them in.
            //this token can be anything. You can use random.org to generate a random string;
            const token = '123456abcdef';
            sessionStorage.setItem('auth-token', token);
            sessionStorage.setItem('userData',JSON.stringify(emailInput))
            //go to www.website.com/todo
            navigate('/Stories');
        } else {
            //bad combination
            alert('Wrong email or password combination');
        }
    }
    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     const credentials = {emailInput, passwordInput};
    //     /*
    //     if (emailIsValid && passwordIsValid)

    //         API.logIn(credentials)
    //             .then((student) => {
    //                 setPlanItemsInContext([])
    //                 setCoursesInContext([])
    //                 setSearchingPlan(true)
    //                 setLoggedIn(true)
    //                 setStudent(student)
    //                 navigate('/home')
    //             }).catch((err) => {
    //             setLoginFailed(true)
    //         })*/}



    return (

        <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center">
            <Grid item xs={5}>
                <Box component='form' onSubmit={handleLoginSubmit}>
                    <Paper elevation={24}>
                        <Stack spacing={4} sx={{padding: '25px'}}>
                            <Typography variant='h4'>Login</Typography>
                            {loginFailed ?
                                <Alert severity="error">
                                    <AlertTitle>Errore</AlertTitle>
                                    Hai inserito username e/o password <strong>invalidi</strong>
                                </Alert> :
                                ''}
                            <TextField
                                error={!emailIsValid}
                                helperText={emailInput === '' ? 'Il campo email non può essere vuoto' : !emailIsValid ? 'L\'email non è nel formato corretto' : ''}
                                id="email"
                                label="Email"
                                value={emailInput}
                                variant="outlined"
                                onChange={handleEmailChange}/>
                            <TextField
                                error={!passwordIsValid}
                                helperText={passwordInput === '' ? 'Il campo password non può essere vuoto' : ''}
                                id="password"
                                label="Password"
                                type={!showPassword ? 'password' : 'text'}
                                value={passwordInput}
                                variant="outlined"
                                onChange={setPasswordInput}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onMouseDown={() => setShowPassword(!showPassword)}
                                                onMouseUp={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button startIcon={<LoginIcon></LoginIcon>} type="submit" color={"primary"} size='large' variant="contained">Sign in</Button>
                        </Stack>
                    </Paper>
                </Box>
            </Grid>
        </Grid>

    )
}

export {LoginComp}
