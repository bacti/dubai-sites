import classnames from 'classnames'
import React from 'react'
import { geolocated } from 'react-geolocated'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Divider, Stepper, Step, StepLabel, StepContent } from '@material-ui/core'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import TrackingManager from 'ets-tracking'
import Defines from '../generic/Defines'
import { connect } from 'redux-zero/react'
import actions from '../generic/Actions'
import DialogMessage from './DialogMessage'
import { GetText } from '../generic/Localization'

const { Steps } = Defines
const useStyles = makeStyles
(
    theme =>
    ({
        icon:
        {
            'display': 'inline-block',
            'min-width': 10,
            'align-self': 'baseline',
            'flex': 'none',
            'padding-right': 8,
        },
        text1:
        {
            'font-family': 'Muller',
            'font-size': 14,
            'line-height': '140%',
            'text-align': 'center',
        },
        text2:
        {
            'font-family': 'Muller-ExtraBold',
            'font-size': 18,
            'line-height': '240%',
            'text-align': 'center',
        },
        text3:
        {
            'font-family': 'Muller-ExtraBold',
            'font-size': 14,
            'line-height': '140%',
            'text-align': 'center',
        },
        gutters:
        {
            'padding-left': 0,
            'padding-right': 0,
        }
    })
)

function Tutorial({ tutorialFinished, currentWeek, currentStep, tutorialStep, OnTutorial, EndTutorial })
{
    const classes = useStyles()
    if (tutorialFinished)
        return null
    return (
        <Typography component='div'>
            {
                tutorialStep == -3 &&
                <DialogMessage
                    style={{ marginTop: 190 }}
                    scroll='body'
                    title={GetText('TUTORIAL_PLAY_GAME')}
                    nextLabel={GetText('TUTORIAL_PLAY_GAME_2')}
                    onNext={evt =>
                    {
                        OnTutorial(Steps.UNLOCK_2)
                        TrackingManager.SendEventTracking(window.TRACKING_ACTION_CLICK_ON_BUTTON, 'tutorial_playgame_next')
                        // TrackingManager.SendEventTracking(window.TRACKING_ACTION_CONFIRMED_ENGAGEMENTS)
                    }}
                >
                    <Typography className={classes.text1}>
                        { GetText('TUTORIAL_PLAY_GAME_1') }
                    </Typography>
                </DialogMessage>
            }
            {
                tutorialStep == -2 &&
                <DialogMessage
                    style={{ marginTop: 230 }}
                    scroll='body'
                    title={GetText('TUTORIAL_REWARDS')}
                    nextLabel={GetText('TUTORIAL_REWARDS_4')}
                    onNext={evt =>
                    {
                        OnTutorial(Steps.UNLOCK_2)
                        TrackingManager.SendEventTracking(window.TRACKING_ACTION_CLICK_ON_BUTTON, 'tutorial_rewards_next')
                    }}
                >
                    <ListItem className={classes.gutters}>
                        <ListItemText className={classes.icon}>
                            <img src={require('../assets/voucher-1.png')} />
                        </ListItemText>
                        <ListItemText>
                            <Typography className={classes.text1} style={{ textAlign: 'left' }}>
                                <span className={classes.text3}>{ GetText('TUTORIAL_REWARDS_1a') }</span>
                                { GetText('TUTORIAL_REWARDS_1b') }
                            </Typography>
                            <Typography className={classes.text1} style={{ textAlign: 'left' }}>
                                { GetText('TUTORIAL_REWARDS_1c') }
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem className={classes.gutters}>
                        <ListItemText className={classes.icon}>
                            <img src={require('../assets/voucher-2.png')} />
                        </ListItemText>
                        <ListItemText>
                            <Typography className={classes.text1} style={{ textAlign: 'left' }}>
                                <span className={classes.text3}>{ GetText('TUTORIAL_REWARDS_2a') }</span>
                                { GetText('TUTORIAL_REWARDS_2b') }
                            </Typography>
                            <Typography className={classes.text1} style={{ textAlign: 'left' }}>
                                { GetText('TUTORIAL_REWARDS_2c') }
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem className={classes.gutters}>
                        <ListItemText className={classes.icon}>
                            <img src={require('../assets/voucher-3.png')} />
                        </ListItemText>
                        <ListItemText>
                            <Typography className={classes.text1} style={{ textAlign: 'left' }}>
                                { GetText('TUTORIAL_REWARDS_3a') }
                                <span className={classes.text3}>{ GetText('TUTORIAL_REWARDS_3b') }</span>
                                { GetText('TUTORIAL_REWARDS_3c') }
                            </Typography>
                            <Typography className={classes.text1} style={{ textAlign: 'left' }}>
                                { GetText('TUTORIAL_REWARDS_3d') }
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </DialogMessage>
            }
            {
                tutorialStep == -1 &&
                <DialogMessage
                    style={{ marginTop: 260 }}
                    scroll='body'
                    title={GetText('TUTORIAL_UNLOCK')}
                    nextLabel={GetText('TUTORIAL_UNLOCK_2')}
                    onNext={evt =>
                    {
                        OnTutorial(Steps.PLAY_1)
                        TrackingManager.SendEventTracking(window.TRACKING_ACTION_CLICK_ON_BUTTON, 'tutorial_unlocknewchallenge_next')
                    }}
                >
                    <Typography className={classes.text1}>
                        { GetText('TUTORIAL_UNLOCK_1') }
                    </Typography>
                </DialogMessage>
            }
            {
                tutorialStep == 0 &&
                <DialogMessage
                    style={{ marginTop: 180 }}
                    scroll='body'
                    title={GetText('TUTORIAL_MAP_HELP')}
                    nextLabel={GetText('TUTORIAL_MAP_HELP_2')}
                    onNext={evt =>
                    {
                        Object.assign
                        (
                            document.getElementById('quest-help').style,
                            {
                                zIndex: 0,
                                pointerEvents: 'auto',
                            },
                        )
                        EndTutorial()
                        TrackingManager.SendEventTracking(window.TRACKING_ACTION_CLICK_ON_BUTTON, 'tutorial_challengemaphelp_done')
                    }}
                >
                    <Typography className={classes.text1}>
                        { GetText('TUTORIAL_MAP_HELP_1') }
                        <Typography component='span' className={classes.text1} style={{ textAlign: 'left' }}>
                            { GetText('TUTORIAL_MAP_HELP_1a') }
                            <span style={{ display: 'contents' }}>
                                <img src={require('../assets/icon-help.png')} height='24px' style={{ verticalAlign: 'middle' }} />
                            </span>
                            { GetText('TUTORIAL_MAP_HELP_1b') }
                        </Typography>
                    </Typography>
                </DialogMessage>
            }
        </Typography>
    )
}
const mapToProps = ({ tutorialFinished, tutorialStep, currentWeek, currentStep }) =>
({
    tutorialFinished,
    tutorialStep,
    currentWeek,
    currentStep,
})
export default connect(mapToProps, actions)(Tutorial)
