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
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.5 16C12.9183 16 16.5 12.4183 16.5 8C16.5 3.58172 12.9183 0 8.5 0C4.08172 0 0.5 3.58172 0.5 8C0.5 12.4183 4.08172 16 8.5 16Z" fill="#959595"/>
                            <path d="M9.54004 12H8.12891V6.56055L6.44434 7.08301V5.93555L9.38867 4.88086H9.54004V12Z" fill="white"/>
                        </svg>
                    </ListItemAvatar>
                    <ListItemText primary={GetText('HOME_PAGE_REWARD_1')} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.5 16C12.9183 16 16.5 12.4183 16.5 8C16.5 3.58172 12.9183 0 8.5 0C4.08172 0 0.5 3.58172 0.5 8C0.5 12.4183 4.08172 16 8.5 16Z" fill="#959595"/>
                            <path d="M10.9854 12H6.1123V11.0332L8.41211 8.58203C8.72786 8.23698 8.96061 7.93587 9.11035 7.67871C9.26335 7.42155 9.33984 7.17741 9.33984 6.94629C9.33984 6.63053 9.26009 6.38314 9.10059 6.2041C8.94108 6.02181 8.71322 5.93066 8.41699 5.93066C8.09798 5.93066 7.8457 6.04134 7.66016 6.2627C7.47786 6.48079 7.38672 6.76888 7.38672 7.12695H5.9707C5.9707 6.69401 6.07324 6.2985 6.27832 5.94043C6.48665 5.58236 6.77962 5.30241 7.15723 5.10059C7.53483 4.89551 7.96289 4.79297 8.44141 4.79297C9.17383 4.79297 9.74186 4.96875 10.1455 5.32031C10.5524 5.67188 10.7559 6.16829 10.7559 6.80957C10.7559 7.16113 10.6647 7.51921 10.4824 7.88379C10.3001 8.24837 9.98763 8.67318 9.54492 9.1582L7.92871 10.8623H10.9854V12Z" fill="white"/>
                        </svg>
                    </ListItemAvatar>
                    <ListItemText primary={GetText('HOME_PAGE_REWARD_2')} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.5 16C12.9183 16 16.5 12.4183 16.5 8C16.5 3.58172 12.9183 0 8.5 0C4.08172 0 0.5 3.58172 0.5 8C0.5 12.4183 4.08172 16 8.5 16Z" fill="#959595"/>
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
            case Steps.PLAY_3:
            {
                mission = GetText('HOME_PAGE_COMPLETE_LEVEL')
                break
            }
            case Steps.UNLOCK_2:
            case Steps.UNLOCK_3:
            {
                mission = GetText('HOME_PAGE_UNLOCK_LEVEL')
                break
            }
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
                    <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M35.5099 29.8339C35.6019 29.6179 35.7 29.4279 35.814 29.3139C36.084 29.0459 36.718 28.8538 37.332 28.6679C38.352 28.3578 39.51 28.0079 40.092 27.0018C40.666 26.0099 40.3939 24.8418 40.156 23.8118C40.008 23.1798 39.856 22.5258 39.96 22.1438C40.05 21.7938 40.516 21.2998 40.926 20.8638C41.664 20.0779 42.4999 19.188 42.4999 18C42.4999 16.812 41.664 15.922 40.926 15.136C40.516 14.7 40.0519 14.206 39.96 13.858C39.858 13.476 40.0099 12.82 40.156 12.188C40.394 11.158 40.666 9.99008 40.092 8.99605C39.51 7.99002 38.3539 7.64005 37.332 7.33208C36.718 7.14608 36.0859 6.95408 35.8159 6.68605C35.5459 6.41802 35.3559 5.78408 35.1699 5.17002C34.8619 4.15002 34.5119 2.99399 33.506 2.412C32.508 1.83403 31.344 2.106 30.312 2.346C29.68 2.49196 29.028 2.64403 28.644 2.54203C28.294 2.448 27.8 1.98403 27.364 1.57406C26.578 0.835967 25.688 0 24.5 0C23.3139 0 22.424 0.835967 21.638 1.57397C21.2 1.98393 20.706 2.448 20.356 2.54193C19.972 2.6459 19.318 2.49196 18.688 2.3459C17.654 2.1059 16.4879 1.8359 15.494 2.40993C14.49 2.99193 14.14 4.14796 13.832 5.16993C13.646 5.7839 13.454 6.41793 13.186 6.68596C12.916 6.95399 12.2819 7.14599 11.668 7.33199C10.648 7.64202 9.48998 7.99198 8.90799 8.99801C8.33396 9.98998 8.60602 11.158 8.84396 12.188C8.99199 12.82 9.14395 13.474 9.03999 13.856C8.94999 14.206 8.48396 14.7001 8.07399 15.136C7.33608 15.922 6.50002 16.8139 6.50002 18C6.50002 19.186 7.33599 20.0779 8.07399 20.8639C8.48396 21.3 8.94802 21.7939 9.03999 22.1419C9.14199 22.524 8.99002 23.1799 8.84396 23.8119C8.60592 24.8419 8.33396 26.0099 8.90799 27.0039C9.48998 28.0099 10.646 28.3599 11.668 28.6679C12.2819 28.8538 12.914 29.0459 13.184 29.3139C13.298 29.4279 13.396 29.6159 13.488 29.8319L6.57605 46.6179C6.41602 47.0039 6.51409 47.4479 6.81802 47.732C7.00805 47.9079 7.25199 48 7.50005 48C7.65202 48 7.80408 47.966 7.94808 47.892L15.4281 44.152L20.9461 47.83C21.2001 47.998 21.5181 48.04 21.8081 47.95C22.0981 47.856 22.3301 47.6361 22.4362 47.35L24.6202 41.526L26.5502 47.316C26.6502 47.612 26.8822 47.844 27.1762 47.946C27.4702 48.046 27.7942 48.006 28.0541 47.832L33.5721 44.154L41.0522 47.894C41.1962 47.966 41.3481 48 41.5002 48C41.7481 48 41.9922 47.908 42.1801 47.734C42.4842 47.4501 42.5821 47.0061 42.4221 46.62L35.5099 29.8339ZM23.564 38.6459L21.006 45.4659L16.0541 42.166C15.7521 41.968 15.3701 41.942 15.0521 42.104L9.44002 44.9099L14.524 32.56C14.764 32.968 15.0599 33.3359 15.494 33.5879C16.492 34.1659 17.658 33.8939 18.688 33.6539C19.318 33.508 19.97 33.352 20.356 33.4579C20.7059 33.5519 21.2 34.0159 21.6359 34.4259C21.9179 34.6899 22.2199 34.9558 22.5359 35.2018C22.5439 35.2398 22.5379 35.2779 22.5499 35.3158L23.6259 38.5458C23.608 38.5819 23.578 38.608 23.564 38.6459ZM24.498 34C24.104 34 23.52 33.452 23.004 32.968C22.368 32.368 21.708 31.75 20.872 31.526C20.602 31.454 20.3301 31.424 20.0561 31.424C19.4501 31.424 18.8361 31.568 18.2381 31.706C17.598 31.856 16.806 32.04 16.4981 31.858C16.176 31.672 15.948 30.9179 15.7461 30.2519C15.4901 29.4019 15.2261 28.5239 14.6001 27.8999C13.9761 27.2759 13.0981 27.01 12.2481 26.754C11.5821 26.554 10.8281 26.326 10.6401 26.004C10.4621 25.6939 10.6461 24.9019 10.7941 24.264C10.9962 23.392 11.2041 22.492 10.9741 21.6259C10.7481 20.79 10.1301 20.1319 9.53217 19.494C9.04617 18.978 8.49821 18.394 8.49821 18C8.49821 17.6059 9.04824 17.022 9.53217 16.506C10.1302 15.87 10.7502 15.21 10.9741 14.374C11.2041 13.51 10.9962 12.61 10.7941 11.738C10.6461 11.1001 10.4622 10.3081 10.6401 10C10.8281 9.67798 11.5821 9.44998 12.2501 9.24804C13.1001 8.99201 13.9761 8.72605 14.6021 8.10205C15.2241 7.48002 15.4901 6.60008 15.7481 5.75202C15.9501 5.08602 16.1781 4.33002 16.4981 4.14402C16.812 3.96805 17.6021 4.15002 18.2361 4.29805C19.1041 4.50009 20.0021 4.71008 20.872 4.47805C21.708 4.25409 22.368 3.63402 23.0061 3.03609C23.5201 2.55206 24.1041 2.00409 24.4981 2.00409C24.8921 2.00409 25.4761 2.55206 25.9921 3.03609C26.6281 3.63609 27.2881 4.25409 28.1241 4.47805C28.9921 4.71008 29.8921 4.50009 30.7581 4.29805C31.396 4.14805 32.1901 3.96609 32.498 4.14609C32.8201 4.33209 33.0481 5.08612 33.25 5.75211C33.506 6.60214 33.77 7.48011 34.396 8.10411C35.02 8.72811 35.898 8.99408 36.748 9.25011C37.414 9.45008 38.168 9.67807 38.356 10.0001C38.534 10.3101 38.35 11.1021 38.202 11.7401C37.9999 12.6121 37.792 13.5121 38.022 14.3781C38.248 15.2141 38.866 15.8721 39.4639 16.5101C39.9499 17.0261 40.4979 17.6101 40.4979 18.0041C40.4979 18.3981 39.9479 18.9821 39.4639 19.4981C38.8659 20.1341 38.2459 20.7941 38.022 21.6301C37.792 22.4941 37.9999 23.3941 38.202 24.266C38.35 24.904 38.5339 25.696 38.356 26.004C38.168 26.3261 37.414 26.5541 36.746 26.756C35.896 27.012 35.02 27.278 34.394 27.902C33.772 28.524 33.506 29.404 33.248 30.252C33.046 30.918 32.818 31.674 32.498 31.86C32.1901 32.0381 31.396 31.854 30.76 31.706C29.892 31.504 28.9941 31.294 28.1241 31.526C27.2881 31.75 26.6281 32.37 25.99 32.968C25.476 33.4519 24.892 34 24.498 34ZM33.946 42.106C33.626 41.944 33.242 41.9679 32.944 42.1679L28.0341 45.4419L24.8661 35.938C25.8661 35.786 26.662 35.084 27.3621 34.426C27.8001 34.016 28.294 33.5519 28.6441 33.458C29.0301 33.356 29.6821 33.508 30.3121 33.654C31.3461 33.894 32.5121 34.164 33.506 33.59C33.938 33.34 34.234 32.97 34.474 32.562L39.558 44.912L33.946 42.106Z" fill="#666666"/>
                        <path d="M36.4999 18C36.4999 11.382 31.1179 6 24.5 6C17.882 6 12.5 11.382 12.5 18C12.5 24.618 17.882 30 24.5 30C31.1179 30 36.4999 24.618 36.4999 18ZM24.5 28C18.986 28 14.5 23.514 14.5 18C14.5 12.486 18.986 7.99997 24.5 7.99997C30.0139 7.99997 34.5 12.486 34.5 18C34.5 23.514 30.0139 28 24.5 28Z" fill="#666666"/>
                    </svg>
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
