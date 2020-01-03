import React from 'react'
import { Typography } from '@material-ui/core'
import { Route, Switch, useParams} from 'react-router-dom'
import { connect } from 'redux-zero/react'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'
import WelcomeScreen from './components/WelcomeScreen'
import GameView from './components/GameView'
import LandingPage from './components/LandingPage'
import Leaderboard from './components/Leaderboard'
import Wallet from './components/Wallet'
import Voucher from './components/Voucher'
import Locations from './components/Locations'
import Help from './components/Help'
import Login from './components/Login'
import Register from './components/Register'
import ForgetPass from './components/ForgetPass'

import LoadingIndicator from './components/LoadingIndicator'
import actions from './generic/Actions'
import { Redirect } from 'react-router'

import TrackingManager from 'ets-tracking'
TrackingManager.SetFormat(window.TRACKING_FORMAT_SITE)
TrackingManager.SendEventTracking(window.TRACKING_ACTION_IMPRESSIONS)
window.startTime = Date.now()

function App(props)
{
    const { gameUrl, loading, locationType, showWC, CheckLocationAndLocalData } = props
    React.useEffect
    (
        _ =>
        {
            let pausedTimestamp = Date.now()
            const UpdateTotalTimeSpent = _ =>
            {
                if (document.hasFocus() && document.visibilityState == 'visible')
                {
                    window.startTime += Date.now() - pausedTimestamp
                    window.startPageTime += Date.now() - pausedTimestamp
                }
                else
                {
                    pausedTimestamp = Date.now()
                }
            }
            window.addEventListener('blur', UpdateTotalTimeSpent, false)
            window.addEventListener('focus', UpdateTotalTimeSpent, false)
            window.addEventListener('visibilitychange', UpdateTotalTimeSpent, false)
        },
        []
    )

    if (locationType == '0')
    {
        CheckLocationAndLocalData()
    }    
    
    if (gameUrl != null)
        return <GameView />
        
    return (
        <Typography component='div' role='presentation'>
            <LoadingIndicator loading={loading} />
            <AppHeader />
            <Switch>               
                <Route path='/welcome'>
                    <WelcomeScreen/>
                </Route>
                <Route path='/wallet'>
                    <Wallet />
                </Route>
                <Route path='/voucher/:id' component={Voucher}>
                </Route>
                <Route path='/locations'>
                    <Locations />
                </Route>
                <Route path='/help'>
                    <Help />
                </Route>
                <Route path='/leaderboard'>
                    <Leaderboard />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/register'>
                    <Register />
                </Route>
                <Route path='/forgetpass'>
                    <ForgetPass />
                </Route>
                <Route path='/' >
                    {
                        (showWC) ? <Redirect to="/welcome"/> : <LandingPage />
                    }
                </Route>
            </Switch>
            <AppFooter />
        </Typography>
    )
}
const mapToProps = ({ gameUrl, loading, locationType, showWC }) => ({ gameUrl, loading, locationType, showWC })
export default connect(mapToProps, actions)(App)