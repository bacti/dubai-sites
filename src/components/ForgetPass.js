import React from 'react'
import { connect } from 'redux-zero/react'
import actions from '../generic/Actions'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid, Fab, TextField, FormHelperText} from '@material-ui/core'
import { Link } from 'react-router-dom'
import TrackingManager from 'ets-tracking'

const useStyles = makeStyles
    (
        theme =>
            ({
                textSignIn: {
                    marginTop: '25px',
                    marginBottom: '25px',
                    fontFamily: 'Muller, Arial',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontSize: '24px'
                },
                formSignIn: {
                    marginLeft: '16px',
                    marginRight: '16px',
                },
                textEmail: {
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 'normal'
                },
                textFieldEmail: {
                    width: '100%',
                },
                inputEmail: {
                    padding: 0
                },
                textForgotPass: {
                    color: '#959595',
                    fontSize: '12px'
                },
                textPolicy: {
                    color: '#666666',
                    fontSize: '12px'
                },
                btnSignIn: {
                    width: '100%',
                    backgroundColor: '#C3163A',
                    height: 40,
                    color: '#ffffff'
                },
                textError: {
                    color: '#ff0000'
                },
                hideLegend: {
                    width: '0.01px'
                }
            })
    )

function ForgetPass({ ForgetPass })
{
    React.useEffect
    (
        _ =>
        {
            TrackingManager.SetPageInfo('ForgotPasword')
            TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_IMPRESSION)

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
        result: 0
    })

    const handleChange = prop => event => {
        validateField(event.target.id);
    }

    const validateField = (type) => {
        let emailRegex, checkingText;
        let isValid = false;
        let message = "";

        switch (type) {
            case "email":
                {
                    checkingText = document.getElementById('email').value;
                    emailRegex = /^([a-zA-Z0-9_.+-]{2,})\@([a-zA-Z0-9]{3,})(((\.)([a-zA-Z]{2,})){1,2})$/;
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
        }
    }

    const validateFields = () => {
        validateField('email');

        if (values.email.isValid) {
            let email = document.getElementById('email').value;
            let data = {
                email: email
            }
            ForgetPass(data, (result) => {
                if (result) {
                    setValues({
                        ...values,
                        result: 1
                    });
                }
                else {
                    setValues({
                        ...values,
                        result: 2
                    });
                }

            }, () => {
                setValues({
                    ...values,
                    result: 2
                });
            });
        }
    }

    const RenderInputEmail = () => {
        return <Grid item xs={12} className={classes.formSignIn}>
            <Grid item xs={12}>
                <Typography component='div' align="center" className={classes.textSignIn}>
                    Forget Password
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.formSignIn}>
                <Typography align="center" className={classes.textPolicy}>
                    If you can't remember your password, please fill in your email address and you will recivice instructions to get back your password.
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
                    InputLabelProps={{ shrink: false }}
                    onChange={handleChange('email')}
                    error={!values.email.isValid}
                />
                <FormHelperText className={classes.textError} id="email-message" hidden={values.email.isValid}>{values.email.errorMessage}</FormHelperText>
            </Grid>
            <br />
            <Grid item xs={12} className={classes.formSignIn}>
                <Fab variant="extended" color="primary" aria-label="add" className={classes.btnSignIn}
                    onClick={evt =>
                    {
                        TrackingManager.SendEventTracking(window.TRACKING_ACTION_CLICK_ON_BUTTON, 'password_reset')
                        validateFields()
                    }}
                >
                    RESET PASSWORD
                </Fab>
            </Grid>
        </Grid>
    }

    const RenderFail = () => {
        return <Grid item xs={12} className={classes.formSignIn}>
            <Grid item xs={12}>
                <Typography component='div' align="center" className={classes.textSignIn}>
                Forget Password
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.formSignIn}>
                <Typography align="center" className={classes.textPolicy}>
                    If you can't remember your password, please fill in your email address and you will recivice instructions to get back your password.
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
                    InputLabelProps={{ shrink: false }}
                    onChange={handleChange('email')}
                    error={!values.email.isValid}
                />
                <FormHelperText className={classes.textError} id="email-message" hidden={values.email.isValid}>{values.email.errorMessage}</FormHelperText>
            </Grid>
            <br />
            <Grid item xs={12} className={classes.formSignIn}>
                <Fab onClick={validateFields} variant="extended" color="primary" aria-label="add" className={classes.btnSignIn}>RESET PASSWORD</Fab>
            </Grid>
            <Grid item xs={12} className={classes.formSignIn}>
                <Typography align="center" className={classes.textPolicy}>
                    Something went wrong please retry again!
            </Typography>
            </Grid>
        </Grid>
    }

    const RenderSuccess = () => {
        return <Grid item xs={12} className={classes.formSignIn}>
            <Grid item xs={12}>
                <Typography component='div' align="center" className={classes.textSignIn}>
                Forget Password
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.formSignIn}>
                <Typography align="center" className={classes.textPolicy}>
                    Check your email to get the password and <Link to='/login'>Sign In</Link>
                </Typography>
            </Grid>
        </Grid>
    }

    if (values.result == 1) {
        return RenderSuccess()
    }
    else if (values.result == 2) {
        return RenderFail()
    }
    else {
        return RenderInputEmail()
    }
}

const mapToProps = ({ values }) => ({ values })
export default connect(mapToProps, actions)(ForgetPass)