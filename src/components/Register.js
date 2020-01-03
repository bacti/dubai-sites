import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Typography, Grid, Fab, TextField, FormControl, FormHelperText, OutlinedInput, InputAdornment, IconButton, InputBase, Select, MenuItem, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import TrackingManager from 'ets-tracking'
import { connect } from 'redux-zero/react'
import actions from '../generic/Actions'
import { ListCountries } from '../generic/Countries'

const useStyles = makeStyles
(
    theme =>
    ({
        textSignUp: {
            marginTop:      "25px",
            marginBottom:   "25px",
            fontFamily:     "Muller, Arial",
            fontStyle:      "normal",
            fontWeight:     "bold",
            fontSize:       "24px"
        },
        formSignUp: {        
            marginLeft:     "16px",
            marginRight:    "16px",
        },
        textEmail: {        
            fontSize:       "14px",
            fontStyle:      "normal",
            fontWeight:     "normal"
        },
        textFieldEmail: {        
            width:          "100%",
        },
        inputEmail: {           
            padding: 0
        },
        textForgotPass: {
            color: '#959595',
            fontSize:  '12px'
        },
        textPolicy: {
            color: '#666666',
            fontSize: 12
        },
        btnSignUp: {
            width: '100%',
            height: 40,
            backgroundColor: '#C3163A',
            color: '#ffffff'
        },
        btnHightlight: {
            border: '2px solid #1691C3'
        },
        textError: {
            color: '#ff0000'
        }
    })
)

const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
    //   backgroundColor: theme.palette.background.paper1,
      backgroundColor: '#fafafa',
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        'Muller',
        'Arial',
        'sans-serif'
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#fafafa',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
}))(InputBase);

function Register({logged, locationType, CreateUser})
{
    React.useEffect
    (
        _ =>
        {
            TrackingManager.SetPageInfo('SignUp')
            TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_IMPRESSION)

            return _ =>
            {
                TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_VISITED)
            }
        }
    )

    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: {
            isValid: true,
            errorMessage: ''
        },
        password: {
            isValid: true,
            errorMessage: ''
        },
        showPassword: false,
        firstName: {
            isValid: true,
            errorMessage: ''
        },
        lastName: {
            isValid: true,
            errorMessage: ''
        },
        resident: true,
        male: true,
        nation: '',
        yob: ''
    });

    const handleChange = prop => event => {
        validateField(event.target.id);
        // console.log(event.target.id);
    }
  
    const handleClickShowPassword = () => {        
        setValues({ ...values, showPassword: !values.showPassword });
    }
    
    const handleMouseDownPassword = event => {
        event.preventDefault();
    }

    var nation = [
        {id: 1, value: 'USA'},
        {id: 2, value: 'France'},
        {id: 3, value: 'China'}        
    ];
    var resident = [
        {id: 1, value: 'yes'},
        {id: 2, value: 'no'}
    ];    

    const GenerateYOB = (startYear, endYear) => {
        let arrResult = [];
        for (let i = 0; i <= endYear - startYear; i++)
        {
            arrResult.push({id: i, value: startYear + i});
        }
        return arrResult;
    }    

    const renderOptions = (arrOption, labelId, id) => (
        <Select
            labelId={labelId}
            id={id}
            // value={arrOption[0]}
            // onChange={handleChange(id)}
            input={<BootstrapInput />}
            className={classes.textFieldEmail}
        >
            {
                arrOption.map( (data, i) => (
                    <MenuItem key={i} value={data.id}>{data.value}</MenuItem>
                ))
            }
        </Select>
    );

    const validateField = (type) => {
        let emailRegex, passwordRegex, nameRegex, checkingText;
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
                        errorMessage: message
                    }
                })
                break;
            }
            case "firstName":
            {
                checkingText = document.getElementById('firstName').value;                
                nameRegex = /^([a-zA-Z0-9_ ]{5,30})$/;
                isValid = nameRegex.test(checkingText);
                message = (isValid) ? "" : "Invalid First Name";

                setValues({ 
                    ...values,
                    firstName: {
                        isValid: isValid,
                        errorMessage: message
                    }
                })
                break;
            }
            case "lastName":
            {
                checkingText = document.getElementById('lastName').value;                
                nameRegex = /^([a-zA-Z0-9_ ]{5,30})$/;
                isValid = nameRegex.test(checkingText);
                message = (isValid) ? "" : "Invalid Last Name";

                setValues({ 
                    ...values,
                    lastName: {
                        isValid: isValid,
                        errorMessage: message
                    }
                })
                break;
            }
            case "nationId":
            {
                break;
            }
            case "":
            {
                break;
            }            
        }
    };

    const validateFields = () => {
        
        validateField('email');
        validateField('password');
        validateField('firstName');
        validateField('lastName');
        // validateField('nationality');
        // validateField('resident');
        // validateField('phone');
        // validateField('yearOfBirth');
        // validateField('gender');
        
        if (
            values.email.isValid && 
            values.password.isValid && 
            values.firstName.isValid && 
            values.lastName.isValid
            // values.nationality.isValid && 
            // values.resident.isValid && 
            // values.phone.isValid && 
            // values.yearOfBirth.isValid && 
            // values.gender.isValid
             )
        {
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;
            let firstName = document.getElementById('firstName').value;
            let lastName = document.getElementById('lastName').value;
            let nationality = document.getElementById('nationId').innerHTML || '';
            let resident = values.resident ? "yes" : "no";
            let phone = document.getElementById('phone').value;
            let yearOfBirth = document.getElementById('yobId').innerHTML || '';
            let gender = values.male ? "male" : "female"
                                
            let data = {
                email : email,
                password: password,
                name : firstName,
                surname : lastName,
                nationality : nationality,
                resident : resident,
                phone : phone,
                age : yearOfBirth,
                gender : gender
            }

            console.log('CreateUser:');
            console.log(data);
            
            CreateUser(data)
        }        
    };


    if (logged || locationType=="type_3")
    {
        return (<Redirect to="/"/>)
    }

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Typography align="center" className={classes.textSignUp}>
                    Sign Up
                </Typography>
            </Grid>

            <Grid item xs={12} className={classes.formSignUp} >
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

            <Grid item xs={12} className={classes.formSignUp} >
                <Typography align="left" className={classes.textEmail}>Password</Typography>
                <OutlinedInput
                    inputProps={{ maxLength: 40 }}
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
                <FormHelperText className={classes.textError} id="password-message" hidden={values.password.isValid}>{values.password.errorMessage}</FormHelperText>
            </Grid>

            <Grid item xs={12} className={classes.formSignUp} >
                <Typography variant="h6" align="left" className={classes.textEmail}>First Name</Typography>
                <TextField 
                    inputProps={{ maxLength: 40 }}
                    id="firstName" 
                    placeholder="Name" 
                    variant="outlined" 
                    className={classes.textFieldEmail} 
                    InputLabelProps={{shrink: false}}
                    onChange={handleChange('firstName')}
                />
                <FormHelperText className={classes.textError} id="first-message" hidden={values.firstName.isValid}>{values.firstName.errorMessage}</FormHelperText>
            </Grid>

            <Grid item xs={12} className={classes.formSignUp} >
                <Typography variant="h6" align="left" className={classes.textEmail}>Last Name</Typography>
                <TextField 
                    inputProps={{ maxLength: 40 }}
                    id="lastName"
                    placeholder="Name" 
                    variant="outlined" 
                    className={classes.textFieldEmail} 
                    InputLabelProps={{shrink: false}}
                    onChange={handleChange('lastName')}
                />
                <FormHelperText className={classes.textError} id="last-message" hidden={values.lastName.isValid}>{values.lastName.errorMessage}</FormHelperText>
            </Grid>

            <Grid item xs={12} className={classes.formSignUp}>
                <FormControl variant="outlined" className={classes.textFieldEmail} >
                    <Typography align="left" className={classes.textEmail}>Nationality</Typography>                    
                    {renderOptions(ListCountries(), 'nationLabelId', 'nationId')}
                </FormControl>
            </Grid>
            
            <Grid item xs={12} className={classes.formSignUp}>
                <Typography align="left" className={classes.textEmail}>Are You A Resident?</Typography>
                <Grid container spacing={0}>
                    <Grid item xs={6} >
                        <Button className={ values.resident ? classes.btnHightlight : '' } variant="outlined" onClick={ _ => setValues({...values, resident : true}) }>Yes</Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button className={ !values.resident ? classes.btnHightlight : '' } variant="outlined" onClick={ _ => setValues({...values, resident : false}) }>No</Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} className={classes.formSignUp} >
                <Typography variant="h6" align="left" className={classes.textEmail}>Phone Number (Optional)</Typography>
                <TextField 
                    id="phone" 
                    placeholder="Enter Number" 
                    variant="outlined" 
                    className={classes.textFieldEmail} 
                    InputLabelProps={{shrink: false}}                     
                />
            </Grid>

            <Grid item xs={12} className={classes.formSignUp}>
                <FormControl variant="outlined" className={classes.textFieldEmail} >
                    <Typography align="left" className={classes.textEmail}>Year Of Birth</Typography>
                    {renderOptions(GenerateYOB(1900, 2020), 'yobLabelId', 'yobId')}
                </FormControl>
            </Grid>

            <Grid item xs={12} className={classes.formSignUp}>
                <Typography align="left" className={classes.textEmail}>Gender</Typography>
                <Grid container spacing={0}>
                    <Grid item xs={6} >
                        <Button className={ values.male ? classes.btnHightlight : '' } variant="outlined" onClick={ _ => setValues({...values, male : true}) }>Male</Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button className={ !values.male ? classes.btnHightlight : '' } variant="outlined" onClick={ _ => setValues({...values, male : false}) }>Female</Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} className={classes.formSignUp}>
                <Typography variant="h6" align="center" className={classes.textPolicy}>
                    By creating an account, you agree to DTCM's <Link to="/policy">Privacy Policy</Link> and <Link to="/terms">Terms of Use</Link>
                </Typography>
            </Grid>

            <Grid item xs={12} className={classes.formSignUp}>
                <Fab variant="extended" color="primary" aria-label="add" className={classes.btnSignUp}
                    onClick={evt =>
                    {
                        // TrackingManager.SendEventTracking(window.TRACKING_ACTION_CONFIRMED_ENGAGEMENTS)
                        validateFields()
                    }}
                >
                    SIGN UP
                </Fab>
            </Grid>

            <Grid item xs={12} className={classes.formSignUp}>
                <Typography variant="h6" align="center" className={classes.textPolicy}>
                    Already have an account? <Link to='/login'>Sign In</Link>
                </Typography>
            </Grid>
        </Grid>
    )
}

const mapToProps = ({logged, locationType}) => ({logged, locationType})
export default connect(mapToProps, actions)(Register)