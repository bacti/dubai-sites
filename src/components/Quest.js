import React from 'react'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Divider, List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'redux-zero/react'
import TrackingManager from 'ets-tracking'
import actions from '../generic/Actions'
import Defines from '../generic/Defines'
import { GetText } from '../generic/Localization'

const { PAGE_PADDING, Steps, GAME_URLS } = Defines
const useStyles = makeStyles
(
    theme =>
    ({
        map:
        {
            height: 288,
            'overflow-y': 'hidden',
        },
        help:
        {
            'position': 'absolute',
            'right': 0,
            'margin-top': -60,
        },
        marker:
        {
            width: 60,
            height: 60,
            padding: 0,
            minWidth: 0,
            pointerEvents: 'none',
            transform: 'translate(-50%, -50%)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            'font-family': 'Muller-ExtraBold',
            'font-size': 14,
            'line-height': '60px',
            'color': '#FFFFFF',
            'text-align': 'center',
        },
        complete:
        {
            backgroundImage: `url(${require('../assets/quest-complete.png')})`,
        },
        current:
        {
            backgroundImage: `url(${require('../assets/quest-current.png')})`,
        },
        upcoming:
        {
            backgroundImage: `url(${require('../assets/quest-upcoming.png')})`,
        },
        reward:
        {
            backgroundImage: `url(${require('../assets/voucher-0.png')})`,
        },
        bronzeGet:
        {
            backgroundImage: `url(${require('../assets/voucher-1.png')})`,
        },
        silverGet:
        {
            backgroundImage: `url(${require('../assets/voucher-2.png')})`,
        },
        goldGet:
        {
            backgroundImage: `url(${require('../assets/voucher-3.png')})`,
        },
        action:
        {
            padding: '4px 8px',
            minWidth: 0,
            transform: 'translate(-50%, -430%)',
            'font-family': 'Muller-ExtraBold',
            'font-size': 10,
            'line-height': '168%',
            'color': '#FFFFFF',
            'border-radius': 14,
            'background': '#C3163A',
            'box-shadow': '0px 3px 10px rgba(0, 0, 0, 0.15)',
            '&:hover':
            {
                'background': '#C3163A',
            }
        },
        quest:
        {
            background: '#EDF9FD',
            'padding': 8,
            'justify-content': 'center',
        },
        heading:
        {
            'font-family': 'Muller-ExtraBold',
            'font-size': 14,
            'line-height': '17px',
        },
        avatar:
        {
            'padding-right': 8,
        },
    })
)

const theme = createMuiTheme
({
    overrides:
    {
        MuiList:
        {
            padding:
            {
                'padding': '0px !important',
            },
        },
        MuiListItem:
        {
            gutters:
            {
                'padding-left': 0,
                'padding-right': 0,
                'padding-top': 0,
                'padding-bottom': 0,
            },
        },
        MuiListItemAvatar:
        {
            root:
            {
                'min-width': 24,
                'display': 'flex',
            },
        },
        MuiListItemText:
        {
            root:
            {
                'margin-top': 0,
                'margin-bottom': 0,
            },
            primary:
            {
                'font-family': 'Muller',
                'font-size': 10,
                'line-height': '14px',
            },
            secondary:
            {
                'font-family': 'Muller',
                'font-size': 12,
                'line-height': '14px',
                'color': '#959595',
            },
        },
    },
})

const MAX_QUEST = 9
const markers =
[
    { x: 81, y: 74 },
    { x: 159, y: 144 },
    { x: 263, y: 217 },
    { x: 314, y: 81 },
    { x: 475, y: 123 },
    { x: 583, y: 212 },
    { x: 614, y: 96 },
    { x: 766, y: 85 },
    { x: 814, y: 199 },

    { x: 161, y: 73, angle: 0 },
    { x: 176, y: 212, angle: 10 },
    { x: 316, y: 164, angle: 20 },
    { x: 324, y: 183, angle: 20 },
    { x: 300, y: 146, angle: 0 },

    { x: 386, y: 78, angle: 20 },
    { x: 492, y: 205, angle: 30 },
    { x: 649, y: 179, angle: -30 },
    { x: 651, y: 160, angle: 60 },
    { x: 644, y: 145, angle: 20 },

    { x: 707, y: 66, angle: 0 },
    { x: 770, y: 151, angle: 40 },
    { x: 886, y: 159, angle: -30 },
    { x: 915, y: 168, angle: 30 },
    { x: 898, y: 166, angle: 0 },
]

function Quest({ currentWeek, currentStep, tutorialFinished, tutorialStep, StartGame })
{
    const classes = useStyles()
    const currentQuest = ~~currentStep + 3 * currentWeek - 1
    const Voucher = _ =>
    {
        switch (currentStep)
        {
            case Steps.PLAY_1:
            case Steps.UNLOCK_2:
            case Steps.PLAY_2:
                return <ListItemText primary={GetText('HOME_PAGE_REWARD_3')} />
        }
        return (
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.5 16C12.9183 16 16.5 12.4183 16.5 8C16.5 3.58172 12.9183 0 8.5 0C4.08172 0 0.5 3.58172 0.5 8C0.5 12.4183 4.08172 16 8.5 16Z" fill="#C3163A"/>
                            <path d="M9.54004 12H8.12891V6.56055L6.44434 7.08301V5.93555L9.38867 4.88086H9.54004V12Z" fill="white"/>
                        </svg>
                    </ListItemAvatar>
                    <ListItemText primary={GetText('HOME_PAGE_REWARD_1')} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.5 16C12.9183 16 16.5 12.4183 16.5 8C16.5 3.58172 12.9183 0 8.5 0C4.08172 0 0.5 3.58172 0.5 8C0.5 12.4183 4.08172 16 8.5 16Z" fill="#C3163A"/>
                            <path d="M10.9854 12H6.1123V11.0332L8.41211 8.58203C8.72786 8.23698 8.96061 7.93587 9.11035 7.67871C9.26335 7.42155 9.33984 7.17741 9.33984 6.94629C9.33984 6.63053 9.26009 6.38314 9.10059 6.2041C8.94108 6.02181 8.71322 5.93066 8.41699 5.93066C8.09798 5.93066 7.8457 6.04134 7.66016 6.2627C7.47786 6.48079 7.38672 6.76888 7.38672 7.12695H5.9707C5.9707 6.69401 6.07324 6.2985 6.27832 5.94043C6.48665 5.58236 6.77962 5.30241 7.15723 5.10059C7.53483 4.89551 7.96289 4.79297 8.44141 4.79297C9.17383 4.79297 9.74186 4.96875 10.1455 5.32031C10.5524 5.67188 10.7559 6.16829 10.7559 6.80957C10.7559 7.16113 10.6647 7.51921 10.4824 7.88379C10.3001 8.24837 9.98763 8.67318 9.54492 9.1582L7.92871 10.8623H10.9854V12Z" fill="white"/>
                        </svg>
                    </ListItemAvatar>
                    <ListItemText primary={GetText('HOME_PAGE_REWARD_2')} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.5 16C12.9183 16 16.5 12.4183 16.5 8C16.5 3.58172 12.9183 0 8.5 0C4.08172 0 0.5 3.58172 0.5 8C0.5 12.4183 4.08172 16 8.5 16Z" fill="#C3163A"/>
                            <path d="M7.54785 7.82031H8.2998C8.65788 7.82031 8.92318 7.73079 9.0957 7.55176C9.26823 7.37272 9.35449 7.13509 9.35449 6.83887C9.35449 6.55241 9.26823 6.32943 9.0957 6.16992C8.92643 6.01042 8.69206 5.93066 8.39258 5.93066C8.1224 5.93066 7.89616 6.00553 7.71387 6.15527C7.53158 6.30176 7.44043 6.49382 7.44043 6.73145H6.0293C6.0293 6.36035 6.12858 6.02832 6.32715 5.73535C6.52897 5.43913 6.80892 5.20801 7.16699 5.04199C7.52832 4.87598 7.92546 4.79297 8.3584 4.79297C9.11035 4.79297 9.69954 4.97363 10.126 5.33496C10.5524 5.69303 10.7656 6.18783 10.7656 6.81934C10.7656 7.14486 10.6663 7.44434 10.4678 7.71777C10.2692 7.99121 10.0088 8.20117 9.68652 8.34766C10.0869 8.49089 10.3848 8.70573 10.5801 8.99219C10.7786 9.27865 10.8779 9.61719 10.8779 10.0078C10.8779 10.6393 10.6468 11.1455 10.1846 11.5264C9.72559 11.9072 9.11686 12.0977 8.3584 12.0977C7.64876 12.0977 7.06771 11.9105 6.61523 11.5361C6.16602 11.1618 5.94141 10.667 5.94141 10.0518H7.35254C7.35254 10.3187 7.45182 10.5368 7.65039 10.7061C7.85221 10.8753 8.09961 10.96 8.39258 10.96C8.72786 10.96 8.98991 10.8721 9.17871 10.6963C9.37077 10.5173 9.4668 10.2812 9.4668 9.98828C9.4668 9.27865 9.07617 8.92383 8.29492 8.92383H7.54785V7.82031Z" fill="white"/>
                        </svg>
                    </ListItemAvatar>
                    <ListItemText primary={GetText('HOME_PAGE_REWARD_3')} />
                </ListItem>
            </List>
        )
    }
    const Mission = _ =>
    {
        let mission
        switch (+currentStep)
        {
            case Steps.PLAY_1:
            case Steps.PLAY_2:
                mission = GetText('HOME_PAGE_COMPLETE_LEVEL')
            break
            case Steps.PLAY_3:
                mission = GetText('HOME_PAGE_COMPLETE_WEEK')
            break
            case Steps.UNLOCK_2:
            case Steps.UNLOCK_3:
                mission = GetText('HOME_PAGE_UNLOCK_LEVEL')
            break
        }
        return <ListItemText secondary={mission.replace('%%d', ~~currentStep + 3 * currentWeek)} />
    }
    const QuestPlay = ({ id }) =>
    (
        <Button id={'action-'+id}
            className={classes.action}
            onClick={evt =>
            {
                StartGame(`${GAME_URLS[currentWeek]}&game_level=${~~currentStep}`)
                // TrackingManager.SendEventTracking(window.TRACKING_ACTION_CONFIRMED_ENGAGEMENTS)
            }}
        >
            { GetText('QUEST_PLAY_NOW') }
        </Button>
    )
    const QuestUnlock =({ id }) =>
    (
        <Button id={'action-'+id}
            className={classes.action}
            component={Link} to='/locations'
            // onClick={evt => TrackingManager.SendEventTracking(window.TRACKING_ACTION_CONFIRMED_ENGAGEMENTS)}
        >
            { GetText('QUEST_UNLOCK_CHALLENGE') }
        </Button>
    )
    const Marker = ({ id }) =>
    {
        const index = id - MAX_QUEST + 1
        const relevantWeek = ~~((index - 1) / 5)
        const relevantQuest = index % 5 || 5 
        const type =
            index <= 0
            ?
            (
                id < currentQuest
                ? 'complete'
                : (id == currentQuest ? 'current' : 'upcoming')
            )
            :
            (
                relevantWeek > currentWeek
                ? 'reward'
                :
                (
                    relevantQuest + 3 * relevantWeek > currentQuest
                    ? 'reward'
                    :
                    (
                        relevantQuest < 4
                        ? 'bronzeGet'
                        : (relevantQuest > 4 ? 'goldGet' : 'silverGet')
                    )
                )
            )
        const { x, y, angle = 0 } = markers[id]

        return (
            <Typography component='div'
                id={'quest-'+id}
                style={{
                    left: x,
                    marginTop: y,
                    position: x > window.innerWidth ? 'fixed' : 'absolute',
                    transformOrigin: '0 0',
                    transform: `rotate(${angle}deg)`,
                    pointerEvents: id == currentQuest ? 'auto' : 'none',
                }}
            >
                <Typography
                    component='div'
                    id={'marker-'+id}
                    className={`${classes.marker} ${classes[type]}`}
                    style={{
                        display: x + 60 > window.innerWidth ? 'none' : 'block',
                    }}
                >
                    { id >= currentQuest && id < MAX_QUEST && id + 1 }
                </Typography>
                {
                    id == currentQuest
                        ? currentStep == ~~currentStep ? <QuestPlay id={id} /> : <QuestUnlock id={id} />
                        : null
                }
            </Typography>
        )
    }

    const scrollHandler = event =>
    {
        event.preventDefault()
        event.stopPropagation()
        if (event.target.id != 'map')
            return
        markers.forEach((_, id) =>
        {
            const { style } = document.getElementById('quest-' + id)
            const { x, y } = markers[id]
            const left = x - event.target.scrollLeft
            const marginTop = y - event.target.scrollTop
            style.left = left + 'px'
            style.marginTop = marginTop + 'px'
            style.position = left > window.innerWidth ? 'fixed' : 'absolute'
            document.getElementById('marker-' + id).style.display = left + 60 > window.innerWidth ? 'none' : 'block'
            id == currentQuest
                && (document.getElementById('action-' + id).style.display = left + 150 > window.innerWidth ? 'none' : 'block')
        })
    }
    React.useEffect
    (
        _ =>
        {
            if (!tutorialFinished)
            {
                switch (tutorialStep)
                {
                    case -3:
                        Object.assign(document.getElementById('quest-0').style, { zIndex: 3000, pointerEvents: 'none' })
                        document.getElementById('marker-0').style.visibility = 'hidden'
                    break
                    case -2:
                        Object.assign(document.getElementById('quest-9').style, { zIndex: 3000, pointerEvents: 'none' })
                    break
                    case -1:
                        Object.assign(document.getElementById('quest-1').style, { zIndex: 3000, pointerEvents: 'none' })
                        document.getElementById('marker-1').style.visibility = 'hidden'
                    break
                    case 0:
                        Object.assign(document.getElementById('quest-help').style, { zIndex: 3000, pointerEvents: 'none' })
                    break
                }
            }
            window.addEventListener('scroll', scrollHandler, true)
            return _ => window.removeEventListener('scroll', scrollHandler, true)
        }
    )

    return (
        <MuiThemeProvider theme={theme}>
            <Typography component='div' className={classes.map} id='map'>
                { markers.map((_, id) => <Marker id={id} key={id} />) }
                <img src={require('../assets/quest-map.png')} height='100%' />
                <Button id='quest-help' className={classes.help} component={Link} to='/help/challenge-map'
                    // onClick={evt => TrackingManager.SendEventTracking(window.TRACKING_ACTION_CONFIRMED_ENGAGEMENTS)}
                >
                    <img src={require('../assets/icon-help.png')} />
                </Button>
            </Typography>
            <ListItem className={classes.quest}>
                <ListItemAvatar className={classes.avatar}>
                {
                    ~~currentStep < 3
                    ? <img src={require('../assets/reward.png')} height='100%' />
                    : <img src={require('../assets/reward-gold.png')} height='100%' />
                }
                </ListItemAvatar>
                <List>
                    <Typography component='div' className={classes.heading}>
                        { GetText('HOME_PAGE_NEXT_REWARD') }
                    </Typography>
                    <Voucher />
                    <Mission />
                </List>
            </ListItem>
        </MuiThemeProvider>
    )
}
const mapToProps = ({ currentWeek, currentStep, tutorialFinished, tutorialStep }) =>
({
    currentWeek,
    currentStep,
    tutorialFinished,
    tutorialStep,
})
export default connect(mapToProps, actions)(Quest)
