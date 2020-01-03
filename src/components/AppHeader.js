import classnames from 'classnames'
import React from 'react'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Drawer, Button, Typography, Divider } from '@material-ui/core'
import { Route, Switch, Link } from 'react-router-dom'
import { connect } from 'redux-zero/react'
import TrackingManager from 'ets-tracking'
import Defines from '../generic/Defines'
import actions from '../generic/Actions'
import UserMenu from './UserMenu'

const { APP_BAR_HEIGHT } = Defines
const useStyles = makeStyles
(
    ({ palette }) =>
    ({
        buttonRoot:
        {
            'margin-left': 'auto',
            'margin-right': 0,
        },
        title:
        {
            'font-family': 'Muller',
            fontSize: 18,
            color: '#333333',
            'margin-left': 'auto',
            'margin-right': 'auto',
            'padding-right': 64,
            'text-transform': 'capitalize',
        },
        visible:
        {
            display: 'none',
        },
        logo:
        {
            height: APP_BAR_HEIGHT * 0.7,
        },
        drawerPaper:
        {
            top: APP_BAR_HEIGHT,
            zIndex: 2000,
            width: '100%',
        },
    })
)

const theme = createMuiTheme
({
    overrides:
    {
        MuiToolbar:
        {
            gutters:
            {
                'justify-content': 'space-between',
                'padding-left': 0,
                'padding-right': 0,
            },
        },
        MuiPaper:
        {
            elevation4:
            {
                'box-shadow': 'none',
            },
        },
    },
})

function AppHeader({ menuOpened, ToggleMenu })
{
    const { buttonRoot: root, logo, title, right, visible, drawerPaper: paper } = useStyles()
    const NavBar = ({ match }) =>
    (
        <React.Fragment>
            <Toolbar>
                <Button component={Link} to='/'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.67 3.77L14.9 2L5 11.9L14.9 21.8L16.67 20.03L8.54 11.9L16.67 3.77Z" fill="#333333"/>
                    </svg>
                </Button>
                <Typography className={title}>
                    { match.params.title }
                </Typography>
            </Toolbar>
            <Divider />
        </React.Fragment>
    )

    return (
        <MuiThemeProvider theme={theme}>
            <AppBar color='inherit' position='sticky'>
                <Toolbar>
                    <Button component={Link} to='/' disabled={window.location.hash != '#/welcome'}>
                        <Typography component='div' className={logo}>
                            <img src={require('../assets/logo.png')} height='100%' />
                        </Typography>
                    </Button>
                    <Switch>
                        <Route path='/login' />
                        <Route path='/register' />
                        <Route path='/forgetpass' />
                        <Route path='/welcome'>
                            <Button disabled={true}>
                                <Typography component='div' className={logo}>
                                    <img src={require('../assets/logo-club-apparel.png')} height='100%' />
                                </Typography>
                            </Button>
                        </Route>
                        <Route path='/'>
                            <Button classes={{ root, text: menuOpened ? visible : null }}
                                onClick={evt =>
                                {
                                    ToggleMenu(true)
                                    // TrackingManager.SendEventTracking(window.TRACKING_ACTION_CONFIRMED_ENGAGEMENTS)
                                }}
                            >
                                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M5 3H19C20.103 3 21 3.897 21 5C21 6.103 20.103 7 19 7H5C3.897 7 3 6.103 3 5C3 3.897 3.897 3 5 3Z' fill='#C3163A'/>
                                    <path d='M5 10H19C20.103 10 21 10.897 21 12C21 13.103 20.103 14 19 14H5C3.897 14 3 13.103 3 12C3 10.897 3.897 10 5 10Z' fill='#C3163A'/>
                                    <path d='M5 17H19C20.103 17 21 17.897 21 19C21 20.103 20.103 21 19 21H5C3.897 21 3 20.103 3 19C3 17.897 3.897 17 5 17Z' fill='#C3163A'/>
                                </svg>
                            </Button>
                            <Button classes={{ root, text: menuOpened ? null : visible }} onClick={evt => ToggleMenu(false)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.81457 3.95666L20.0139 17.156C21.0538 18.1959 21.2652 19.6759 20.4853 20.4558C19.7054 21.2358 18.2254 21.0243 17.1855 19.9844L3.98615 6.78509C2.94623 5.74517 2.7348 4.2652 3.51474 3.48526C4.29468 2.70532 5.77465 2.91674 6.81457 3.95666Z" fill="#C3163A"/>
                                    <circle cx="12" cy="11.9705" r="2" transform="rotate(45 12 11.9705)" fill="#C3163A"/>
                                    <path d="M20.014 6.78503L6.81471 19.9844C5.77479 21.0243 4.29482 21.2357 3.51488 20.4558C2.73494 19.6758 2.94637 18.1958 3.98629 17.1559L17.1856 3.9566C18.2255 2.91669 19.7055 2.70526 20.4854 3.4852C21.2654 4.26514 21.054 5.74511 20.014 6.78503Z" fill="#C3163A"/>
                                </svg>
                            </Button>
                        </Route>
                    </Switch>
                </Toolbar>
                <Divider />
                <Switch>
                    <Route path='/login' />
                    <Route path='/register' />
                    <Route path='/forgetpass' />
                    <Route path='/welcome' />
                    <Route path='/:title' component={NavBar} />
                </Switch>
            </AppBar>
            <Drawer classes={{ paper }} anchor='right' variant='persistent' open={menuOpened}>
                <UserMenu />
            </Drawer>
        </MuiThemeProvider>
    )
}
const mapToProps = ({ menuOpened }) => ({ menuOpened })
export default connect(mapToProps, actions)(AppHeader)
