import React from 'react'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { Button, Typography} from '@material-ui/core'
import { Link } from 'react-router-dom'
import TrackingManager from 'ets-tracking'
import { GetText } from '../generic/Localization'
import { connect } from 'redux-zero/react'
import actions from '../generic/Actions'
import { Redirect } from 'react-router'

const useStyles = makeStyles
(
    theme =>
    ({
        banner:
        {
            width: window.innerWidth,
            height: window.innerWidth * 173 / 559,
            backgroundImage: `url(${require('../assets/top-banner-welcome-screen.png')})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            'color': '#FFFFFF',
            'font-family': 'Muller-ExtraBold',
            'text-align': 'center',
            'text-transform': 'uppercase',
            'display': 'flex',
            'flex-direction': 'column',
            'justify-content': 'space-around',
        },
        trophy:
        {
            padding: 0,
            minWidth: 0,
            pointerEvents: 'none',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            transform: 'translate(0%, -30%)',
            'font-family': 'Muller-ExtraBold',
            'font-size': 14,
            'line-height': '60px',
            'color': '#FFFFFF',
            'text-align': 'center',
        },
        gold:
        {
            width: 113,
            height: 115,
            backgroundImage: `url(${require('../assets/gold.png')})`,
        },
        silver:
        {
            width: 107,
            height: 109,
            backgroundImage: `url(${require('../assets/silver.png')})`,
        },
        bronze:
        {
            width: 86,
            height: 88,
            backgroundImage: `url(${require('../assets/bronze.png')})`,
        },
        reward:
        {
            display: 'flex',
            margin: '4rem 0',
            padding: '0.5rem',
            'background-color': '#FDEDF1',
        },
        text1:
        {
            'font-family': 'Muller-ExtraBold',
            'font-size': '3rem',
            'line-height': 0,
        },
        text2:
        {
            'font-family': 'Muller-ExtraBold',
        },
        text3:
        {
            'font-family': 'Muller-ExtraBold',
            'color': '#C3163A',
        },
    })
)
const theme = createMuiTheme
({
    overrides:
    {
        MuiTypography:
        {
            body1:
            {
                'font-family': 'Muller',
                'text-align': 'center',
            },
        },
        MuiButton:
        {
            root:
            {
                'font-family': 'Muller-ExtraBold',
                'font-size': 14,
                'color': '#FFFFFF',
                'background': '#C3163A',
                'border-radius': 30,
                '&:hover':
                {
                    'background-color': '#C3163A !important',
                }
            },
        },
    },
})

function WelcomeScreen({showWC, logged, locationType, CloseWC})
{
    React.useEffect
    (
        _ =>
        {
            TrackingManager.SetPageInfo('Welcome')
            TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_IMPRESSION)
            TrackingManager.SendEventTracking(window.TRACKING_ACTION_AD_VIEWABLE)

            return _ =>
            {
                TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_VISITED)
            }
        }
    )
    const classes = useStyles()

    const Close = () => {
        CloseWC();
    }

    if (!showWC)
    {
        console.log("WelcomeScreen logged: " + logged);
        console.log("WelcomeScreen locationType: " + locationType);
        if (!logged && locationType != 'type_3')
        {
            return (<Redirect to="/login"/>)
        }
        else
        {
            return (<Redirect to="/"/>)
        }
         
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Typography component='div' className={classes.banner}>
                <Typography component='div'>
                    { GetText('WELCOME_1') }
                </Typography>
                <Typography component='div' className={classes.text1}>
                    { GetText('WELCOME_2') }
                </Typography>
                <Typography component='div'>
                    { GetText('WELCOME_3') }
                    <span className={classes.text2}> { GetText('WELCOME_4') }</span>
                </Typography>
            </Typography>
            <Typography component='div' style={{ padding: '0.5rem 4.5rem', textAlign: 'center' }}>
                { GetText('WELCOME_5') }
            </Typography>
            <Typography component='div' className={classes.reward} style={{ marginTop: '2rem' }}>
                <Typography component='div' className={`${classes.trophy} ${classes.gold}`} />
                <Typography component='div' style={{ padding: '0px 3rem 0px 8rem', textAlign: 'left' }}>
                    { GetText('WELCOME_6') }
                    <span className={classes.text3}> AED 25,000 </span>
                    { GetText('WELCOME_7') }
                </Typography>
            </Typography>
            <Typography component='div' className={classes.reward}>
                <Typography component='div' className={`${classes.trophy} ${classes.silver}`} style={{ right: '1rem' }} />
                <Typography component='div' style={{ padding: '0px 8rem 0px 6rem', textAlign: 'right' }}>
                    <span className={classes.text3}>AED 1,000 </span>
                    { GetText('WELCOME_8') }
                </Typography>
            </Typography>
            <Typography component='div' className={classes.reward}>
                <Typography component='div' className={`${classes.trophy} ${classes.bronze}`} />
                <Typography component='div' style={{ padding: '0px 3rem 0px 8rem', textAlign: 'left' }}>
                    <span className={classes.text3}>AED 100 </span>
                    { GetText('WELCOME_9') }
                </Typography>
            </Typography>
            <Typography component='div'>
                <Button onClick={Close}>{ GetText('WELCOME_LABEL') }</Button>
            </Typography>
        </MuiThemeProvider>
    )
}

const mapToProps = ({ showWC, logged, locationType }) => ({ showWC, logged, locationType })
export default connect(mapToProps, actions)(WelcomeScreen)