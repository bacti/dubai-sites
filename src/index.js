import React from 'react'
import ReactDOM from 'react-dom'
import { CookiesProvider } from 'react-cookie'
import { HashRouter as Router } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Provider } from 'redux-zero/react'
import styled from 'styled-components'
import grey from '@material-ui/core/colors/grey'
import green from '@material-ui/core/colors/green'
import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './TrackingDefines'
import App from './App'
import Defines from './generic/Defines'
import * as serviceWorker from './serviceWorker'

import createStore from "redux-zero";
import { applyMiddleware } from "redux-zero/middleware";
import { connect } from "redux-zero/devtools";

const { Steps } = Defines
const Styles = styled.div
`
    body, div {
        &::-webkit-scrollbar {
            width: 0px;
            height: 0px;
            display: none;
        }
        &::-webkit-scrollbar-thumb {
            display: none;
        }
    }
`
const theme = createMuiTheme
({
    palette:
    {
        primary: grey,
        secondary: green,
    },
    status:
    {
        danger: 'orange',
    },
    shadows: [],
    overrides: {
        MuiOutlinedInput: {
            // Name of the rule
            root: {
                borderRadius: 6,
                // width: "100%"
            },
            input: {
                padding: 10                
            }
        },
        MuiPopover: {
            paper: {
                backgroundColor: "#fafafa"
            }
        },
    }
    
})

const initialState = {     
    showWC: true,
    logged: false,
    loading: true,
    locationType: '0',
    menuOpened: false,
    userData: {},
    tutorialFinished: true,
    tutorialStep: -3,
    currentWeek: 0,
    currentStep: Steps.PLAY_1,
    leaderboard: {record: [], my_entry: null},
    vouchers: [],
}

const middlewares = connect ? applyMiddleware(connect(initialState)) : [];
const store = createStore(initialState, middlewares);

const Routes = _ =>
(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <CookiesProvider>
                <Router>
                    <App />
                </Router>
            </CookiesProvider>
        </Provider>
    </MuiThemeProvider>
)
ReactDOM.render(<Routes />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// // special hack to prevent zoom-to-tabs gesture in safari
// document.addEventListener('gesturestart', evt => evt.preventDefault(document.body.style.zoom = 0.999))
// document.addEventListener('gesturechange', evt => evt.preventDefault(document.body.style.zoom = 0.999))
// document.addEventListener('gestureend', evt => evt.preventDefault(document.body.style.zoom = 0.999))
