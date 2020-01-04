import React from 'react'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { Button, Paper, Typography, Divider, List, ListItem, ListItemText } from '@material-ui/core'
import { Route, Switch, Link } from 'react-router-dom'
import { connect } from 'redux-zero/react'
import TrackingManager from 'ets-tracking'
import Defines from '../generic/Defines'
import { GetText } from '../generic/Localization'
import actions from '../generic/Actions'

import DialogMessage from './DialogMessage'
import Tutorial from './Tutorial'
import Countdown from './Countdown'
import Quest from './Quest'
import Leaderboard from './Leaderboard'
import Wallet from './Wallet'

const { APP_BAR_HEIGHT, PAGE_PADDING } = Defines
const useStyles = makeStyles
(
    theme =>
    ({
        content:
        {
            'margin-bottom': APP_BAR_HEIGHT,
            'display': 'flex',
            'flex-direction': 'column',
        },
        dubai:
        {
            width: '100%',
            height: 280,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            textAlign: 'center',
            background: '#EBEBEB',
        },
        map:
        {
            height: 288,
            'overflow-y': 'hidden',
        },
        banner:
        {
            width: window.innerWidth,
            height: window.innerWidth * 94 / 375,
            backgroundImage: `url(${require('../assets/top-banner.png')})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
        },
        text1:
        {
            // width: '100vw',
            // height: 280,
            // display: 'table-cell',
            // verticalAlign: 'middle',
            'color': '#C3163A',
            'font-family': 'Muller-ExtraBold',
            'font-weight': 600,
            'font-size': 18,
            'line-height': '27px',
            'text-align': 'center',
            'text-transform': 'capitalize',
            'padding-top': 12,
        },
        text2:
        {
            'font-family': 'Muller',
            'font-size': 14,
            'line-height': '17px',
            'text-align': 'center',
        },
        text3:
        {
            'font-family': 'Muller-ExtraBold',
            'font-size': 18,
            'line-height': '240%',
            'text-align': 'center',
            'text-transform': 'capitalize',
        },
        textLeft:
        {
            fontFamily: 'Muller-ExtraBold',
            textAlign: 'left',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            fontSize: 18,
            lineHeight: '27px',
            color: '#333333',
        },
        textRight:
        {
            fontFamily: 'Muller',
            textAlign: 'right',
            fontSize: 12,
            color: '#959595',
        },
        textButton:
        {
            textTransform: 'none',
            padding: 0,
        },
    })
)
const theme = createMuiTheme
({
    overrides:
    {
        MuiDivider:
        {
            root:
            {
                height: 8,
                backgroundColor: '#fafafa',
            },
        },
        MuiList:
        {
            padding:
            {
                padding: PAGE_PADDING,
            },
        },
        MuiListItem:
        {
            gutters:
            {
                'padding-top': 0,
                'padding-bottom': 0,
                'padding-left': 0,
                'padding-right': 0,
            },
        },
    },
})

function LandingPage({ logged, vouchers, showReward, HideReward })
{
    React.useEffect
    (
        _ =>
        {
            TrackingManager.SetPageInfo('Homepage')
            TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_IMPRESSION)
            logged && TrackingManager.SendEventTracking(window.TRACKING_ACTION_AD_VIEWABLE)

            return _ =>
            {
                TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_VISITED)
            }
        }
    )

    const classes = useStyles()
    const Category = ({ labelLeft, labelRight, rout }) =>
    (
        <ListItem>
            <ListItemText>
                <Button component={Link} to={`/help/${rout}`} className={classes.textLeft}
                    // onClick={evt => TrackingManager.SendEventTracking(window.TRACKING_ACTION_CONFIRMED_ENGAGEMENTS)}
                >
                    { labelLeft }
                    <svg width="32" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="8" fill="#959595"/>
                        <path d="M9.49516 8.22386L10.1509 7.55357C10.5662 7.131 10.8285 6.55543 10.8285 5.91429C10.8285 5.14137 10.5214 4.40011 9.97488 3.85357C9.42834 3.30704 8.68708 3 7.91416 3C7.14125 3 6.39999 3.30704 5.85345 3.85357C5.30692 4.40011 4.99988 5.14137 4.99988 5.91429H6.45702C6.45702 5.52783 6.61054 5.1572 6.88381 4.88393C7.15708 4.61066 7.52771 4.45714 7.91416 4.45714C8.71559 4.45714 9.37131 5.10557 9.37131 5.91429C9.37131 6.21104 9.2834 6.48782 9.1283 6.71799C9.07397 6.79862 9.01139 6.87353 8.94145 6.94157L8.03802 7.85957C7.51345 8.38414 7.18559 9.11271 7.18559 9.92143V10.2857H8.64274C8.64274 9.19286 8.97059 8.74843 9.49516 8.22386Z" fill="white"/>
                        <path d="M7.1853 13.2001H8.64245V11.7429H7.1853V13.2001Z" fill="white"/>
                    </svg>
                    {
                        rout == 'wallet' &&
                        <Typography component='div' className={classes.textRight}>
                            Sponsored by
                            <span style={{ display: 'contents' }}>
                                <img src={require('../assets/logo-club-apparel.png')} height='32px' style={{ verticalAlign: 'middle' }} />
                            </span>
                        </Typography>
                    }
                </Button>
            </ListItemText>
            <Button className={classes.textButton} component={Link} to={`/${rout}`}
                // onClick={evt => TrackingManager.SendEventTracking(window.TRACKING_ACTION_CONFIRMED_ENGAGEMENTS)}
            >
                <ListItemText>
                    <Typography component='div' className={classes.textRight}>
                        { labelRight }
                    </Typography>
                </ListItemText>
            </Button>
        </ListItem>
    )

    return (
        <MuiThemeProvider theme={theme}>
            {
                showReward &&
                <DialogMessage
                    nextLabel={GetText('REWARD_5')}
                    onNext={evt =>
                    {
                        HideReward()
                        TrackingManager.SendEventTracking(window.TRACKING_ACTION_CLICK_ON_BUTTON, 'reward_voucher_continue')
                    }}
                >
                    <Typography>
                        <img src={require('../assets/reward.png')} height='100%' />
                    </Typography>
                    <Typography className={classes.text3}>
                        { GetText('REWARD_1') }
                    </Typography>
                    <Typography className={classes.text2}>
                        { GetText('REWARD_2') }
                    </Typography>
                    <Typography className={classes.text2}>
                        { GetText('REWARD_3').replace('%%s', showReward) }
                    </Typography>
                    <Typography className={classes.text2}>
                        { GetText('REWARD_4') }
                    </Typography>
                </DialogMessage>
            }
            <Tutorial />
            <Typography component='div' className={classes.content}>
                <Typography component='div' className={classes.banner} />
                <Quest />
                <Divider />
                <List style={{ display: logged ? 'block' : 'none'}}>
                    <Category labelLeft='Wallet' labelRight='View All' rout='wallet' />
                    <Wallet home />
                </List>
                <Divider />
                <List>
                    <Category labelLeft='Leaderboard' labelRight='View All' rout='leaderboard' />
                    <Leaderboard home />
                </List>
            </Typography>
        </MuiThemeProvider>
    )
}
const mapToProps = ({ logged, vouchers, showReward }) => ({ logged, vouchers, showReward })
export default connect(mapToProps, actions)(LandingPage)
