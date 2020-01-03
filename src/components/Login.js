import React from 'react'
import { connect } from 'redux-zero/react'
import actions from '../generic/Actions'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Fab, TextField, FormHelperText, OutlinedInput, InputAdornment, IconButton} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { Redirect } from 'react-router'
import TrackingManager from 'ets-tracking'

const useStyles = makeStyles
(
    theme =>
    ({
        textSignIn: {
            marginTop: '25px',
            marginBottom: '25px',
            fontFamily: 'Muller-ExtraBold, Arial',
            fontStyle: 'normal',
            fontWeight: '800',
            fontSize: '20px'
        },
        formSignIn: {        
            marginLeft: '16px',
            marginRight: '16px',
        },
        textEmail: {
            fontFamily: 'Muller, Arial',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 'normal',
            paddingBottom: '10px'
        },
        textPassword: {
            marginTop: '20px',
            fontFamily: 'Muller, Arial',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 'normal',
            paddingBottom: '10px'
        },
        textFieldEmail: {  
            fontFamily: 'Muller, Arial',
            fontSize: '14px',      
            width: '100%',
        },
        inputEmail: {           
            padding: 0
        },
        textForgotPass: {
            fontFamily: 'Muller, Arial',
            margin: '20px 0px',
            color: '#1691C3',
            fontSize: '12px'
        },
        textPolicy: {
            color: '#666666',
            fontSize: '12px'
        },
        textSignUp: {
            fontFamily: 'Muller, Arial',
            margin: '30px 0px',
            color: '#666666',
            fontSize: '14px'
        },
        btnSignIn: {
            fontFamily: 'Muller-ExtraBold, Arial',
            width: '100%',
            backgroundColor: '#C3163A',
            height: 40,
            color: '#ffffff',
            fontSize: '14px'
        },
        textError: {
            fontFamily: 'Muller, Arial',
            color: '#ff0000'
        }
    })
)

function Login({logged, locationType, SignIn})
{
    React.useEffect
    (
        _ =>
        {
            TrackingManager.SetPageInfo('SignIn')
            TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_IMPRESSION)
            TrackingManager.SendEventTracking(window.TRACKING_ACTION_AD_VIEWABLE)

            return _ =>
            {
                TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_VISITED)
            }
        }
    )
    
    const classes = useStyles()
    const [values, setValues] = React.useState({
        email: {
            isValid: true,
            errorMessage: ''
        },
        password: {
            isValid: true,
            errorMessage1: '',
            errorMessage2: ''
        },
        showPassword: false
    })

    const handleChange = prop => event => {
        validateField(event.target.id);
    }
   
    const handleClickShowPassword = () => {        
        setValues({ ...values, showPassword: !values.showPassword });
    }
    
    const handleMouseDownPassword = event => {
        event.preventDefault();
    }

    const validateField = (type) => {
        let emailRegex, passwordRegex, checkingText;
        let isValid = false;
        let message = "";

        switch (type)
        {
            case "email":
            {
                checkingText = document.getElementById('email').value;
                emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                isValid = emailRegex.test(checkingText);
                message = (isValid) ? "" : "Invalid email";

                setValues({
                    ...values, 
                    email: {
                        isValid: isValid,
                        errorMessage: message
                    }
                })
                break;
            }
            case "password":
            {
                checkingText = document.getElementById('password').value;
                // passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/g;
                passwordRegex = /^([a-zA-Z0-9]{5,30})$/;
                isValid = passwordRegex.test(checkingText);
                message = (isValid) ? "" : "Invalid password";

                setValues({ 
                    ...values,
                    password: {
                        isValid: isValid,
                        errorMessage1: message
                    }
                })
                break;
            }
        }
    } 

    const validateFields = () => {
        
        validateField('email') 
        validateField('password')
        
        if (values.email.isValid && values.password.isValid)
        {
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            let data = {
                email: email,
                password: password
            }
            SignIn(data, _ => {
                setValues({ 
                    ...values,
                    email: {
                        isValid: false                        
                    },
                    password: {
                        isValid: false,
                        errorMessage1: `Your login credential is not correct.`,
                        errorMessage2: `Please check and try again!`                        
                    }
                })
            });
        }        
    }    

    if (logged || locationType=="type_3")
    {
        return (<Redirect to="/"/>)
    }

    return (
        <Grid container spacing={0}>                
            <Grid item xs={12}>
                <Typography component='div' align="center" className={classes.textSignIn}>
                    Sign In
                </Typography>
            </Grid>

            <Grid item xs={12} className={classes.formSignIn} >
                <Typography align="left" className={classes.textEmail}>Email Address</Typography>
                <TextField 
                    inputProps={{ maxLength: 40 }}
                    autoComplete='off'
                    id="email"
                    placeholder="@example.com"
                    variant="outlined"
                    className={classes.textFieldEmail}
                    InputLabelProps={{shrink: false}}
                    onChange={handleChange('email')}
                    error={!values.email.isValid}
                />
                <FormHelperText className={classes.textError} id="email-message" hidden={values.email.isValid}>{values.email.errorMessage}</FormHelperText>
            </Grid>

            <Grid item xs={12} className={classes.formSignIn} >
                <Typography align="left" className={classes.textPassword}>Password</Typography>
                <OutlinedInput
                    inputProps={{ maxLength: 32 }}
                    autoComplete='off'
                    id="password"
                    type={values.showPassword ? 'text' : 'password'}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    placeholder="Enter your password"
                    className={classes.textFieldEmail}
                    error={!values.password.isValid}                    
                    aria-describedby="password-message"                    
                />
                <FormHelperText className={classes.textError} id="password-message" hidden={values.password.isValid}>{values.password.errorMessage1}<br/>{values.password.errorMessage2}</FormHelperText>
            </Grid>

            <Grid item xs={12} className={classes.formSignIn}>
                <Typography align="right" className={classes.textForgotPass}>
                    <Link to="./forgetpass" style={{textDecoration: 'none', color: '#1691C3'}}>
                        Forgot your password?
                    </Link>
                </Typography>
            </Grid>

            {/* <Grid item xs={12} className={classes.formSignIn}>
                <Typography align="center" className={classes.textPolicy}>
                    By logging in, you agree to DTCM's <Link to="/policy">Privacy Policy</Link> and <Link to="#">Terms of Use</Link>
                </Typography>
            </Grid> */}

            <Grid item xs={12} className={classes.formSignIn}>
                <Fab onClick={ _ => {validateFields()} } variant="extended" color="primary" aria-label="add" className={classes.btnSignIn}>SIGN IN</Fab>
            </Grid>

            <Grid item xs={12} className={classes.formSignIn}>
                <Typography align="center" className={classes.textSignUp}>
                    Don't have an account? <Link to='/register' style={{textDecoration: 'none', color: '#C3163A', fontFamily: 'Muller-ExtraBold', fontSize: '14px' }}>Sign Up</Link>
                </Typography>
            </Grid>
        </Grid>
    )
}

const mapToProps = ({logged, locationType}) => ({logged, locationType})
export default connect(mapToProps, actions)(Login)