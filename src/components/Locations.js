import classnames from 'classnames'
import React from 'react'
import { geolocated } from 'react-geolocated'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { Button, Typography, Drawer, ListItem, Step, StepLabel, StepContent } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Cookie from 'js-cookie'
import TrackingManager from 'ets-tracking'
import Defines from '../generic/Defines'
import { connect } from 'redux-zero/react'
import actions from '../generic/Actions'
import DialogMessage from './DialogMessage'
import { GetText } from '../generic/Localization'

const { APP_BAR_HEIGHT, PAGE_PADDING, PLACES, GetDistance } = Defines
const useStyles = makeStyles
(
    theme =>
    ({
        root:
        {
            width: '100%',
            backgroundPosition: 'center',
            textAlign: 'center',
            'overflow-y': 'hidden',
            
        },
        map:
        {
            height: '100%',
            width: 'fit-content',
            'overflow-x': 'auto',
            'overflow-y': 'hidden',
        },
        marker:
        {
            'min-width': 0,
            padding: 0,
            backgroundImage: `url(${require('../assets/marker.png')})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        },
        button:
        {
            position: 'fixed',
            bottom: 0,
            color: '#333333',
        },
        unlock:
        {
            'font-family': 'Muller-ExtraBold',
            'font-size': 14,
            'line-height': '17px',
            'color': '#C3163A',
            'background': '#FFFFFF',
            'box-shadow': '0px 2px 3px rgba(0, 0, 0, 0.1)',
            'border-radius': 56,
            'padding': '8px 12px',
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
        name:
        {
            'font-size': 18,
            'line-height': '22px',
            'text-transform': 'capitalize',
            'padding-bottom': 12,
        },
        key:
        {
            'font-size': 12,
            'line-height': '20px',
            'text-transform': 'capitalize',
            'min-width': 80,
            'color': '#959595',
        },
        value:
        {
            'font-size': 12,
            'line-height': '14px',
        },
        link:
        {
            'font-size': 12,
            'line-height': '14px',
            'text-transform': 'none',
            color: '#1691C3',
        },
    })
)

const theme = createMuiTheme
({
    overrides:
    {
        MuiListItem:
        {
            gutters:
            {
                padding: '0px !important',
            },
        },
        MuiTypography:
        {
            body1:
            {
                'font-family': 'Muller',
                'color': '#333333',
            },
        },
        MuiButton:
        {
            text:
            {
                padding: '0px !important',
            },
        },
    },
})

let [scrollLeft, scrollTop] = [0, 0]
function Locations({ currentStep, coords, isGeolocationAvailable, isGeolocationEnabled, UnlockMap })
{
    const classes = useStyles()
    const mapHeight = window.innerHeight - (APP_BAR_HEIGHT * 2 + 2)
    const mapScale = mapHeight / 606
    const scrollHandler = event =>
    {
        scrollLeft = event.target.scrollLeft
        scrollTop = event.target.scrollTop
        event.preventDefault()
        event.stopPropagation()
        PLACES.forEach((_, id) =>
        {
            const { style } = document.getElementById('marker-' + id)
            const { x, y } = PLACES[id]
            const left = x * mapScale - scrollLeft
            const marginTop = y * mapScale - scrollTop
            style.left = left + 'px'
            style.marginTop = marginTop + 'px'
            style.position = left > window.innerWidth ? 'fixed' : 'absolute'
            style.display = left + 47 * mapScale > window.innerWidth ? 'none' : 'block'
        })
    }

    const unlockable = currentStep != ~~currentStep
    const [state, setState] = React.useState({ info: unlockable })
    React.useEffect
    (
        _ =>
        {
            TrackingManager.SetPageInfo('Locations')
            TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_IMPRESSION)
            window.addEventListener('scroll', scrollHandler, true)

            return _ =>
            {
                TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_VISITED)
                window.removeEventListener('scroll', scrollHandler, true)
            }
        }
    )

    const Marker = ({ id }) =>
    {
        const { x, y } = PLACES[id]
        const left = x * mapScale - scrollLeft
        const marginTop = y * mapScale - scrollTop
        return (
            <Button
                id={'marker-'+id}
                className={classes.marker}
                style={{
                    left: left + 'px',
                    marginTop: marginTop + 'px',
                    width: mapScale * 47 + 'px',
                    height: mapScale * 54 + 'px',
                    position: left > window.innerWidth ? 'fixed' : 'absolute',
                    display: left + 47 * mapScale > window.innerWidth ? 'none' : 'block',
                    zIndex: id == state.currentMarkerId ? 3000 : 0,
                }}
                onClick={evt =>
                {
                    setState({ currentMarkerId: id })
                    TrackingManager.SendEventTracking(window.TRACKING_ACTION_CLICK_ON_BUTTON, `locations_${PLACES[id].name}_detail`)
                }}
            >
                <React.Fragment />
            </Button>
        )
    }

    const MarkerDetail = _ =>
    {
        const map = document.getElementById('map')
        if (!map)
            return null
        else
        if (state.currentMarkerId == undefined)
        {
            map.style.marginTop = '0px'
            return null
        }

        const { name, address, website, phone, googlemap } = PLACES[state.currentMarkerId]
        const onClick = _ =>
        {
            window.open(googlemap)
            TrackingManager.SendEventTracking(window.TRACKING_ACTION_CLICK_THROUGHS_START)
            .then(evt => TrackingManager.SendEventTracking(window.TRACKING_ACTION_CLICK_THROUGHS))
        }
        PLACES[state.currentMarkerId].y > mapHeight / 2 && (map.style.marginTop = '-100px')
        return (
            <MuiThemeProvider theme={theme}>
                <Drawer anchor='bottom' variant='temporary'
                    open={state.currentMarkerId != undefined}
                    style={{ textAlign: 'left' }}
                    onClose={evt => setState({ currentMarkerId: undefined })}
                >
                    <Typography component='div' style={{ padding: PAGE_PADDING + 'px' }}>
                        <Typography component='div' className={classes.name}>
                            { name }
                        </Typography>
                        <ListItem>
                            <Typography className={classes.key}>Address</Typography>
                            <Typography className={classes.value}>{ address }</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.key}>Phone</Typography>
                            <Typography className={classes.value}>{ phone }</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography className={classes.key}>Website</Typography>
                            <Typography className={classes.value}>{ website }</Typography>
                        </ListItem>
                        <Typography className={classes.key} style={{ width : 'auto' }}>
                            { 'View in Google Maps' }
                            <br/ >
                            <Button onClick={onClick}>
                                <Typography className={classes.link}>{ googlemap }</Typography>
                            </Button>
                        </Typography>
                    </Typography>
                </Drawer>
            </MuiThemeProvider>
        )
    }

    const AttemptUnlock = _ =>
    {
        const lastCheckpoint = Cookie.get('checkpoint')
        const verified = PLACES.filter
        (
            ({ name, latitude, longitude, radius }) => name != lastCheckpoint && radius > GetDistance
            (
                { longitude: coords.longitude, latitude: coords.latitude },
                { longitude, latitude },
            )
        )
        verified.length > 0
            ? Cookie.set('checkpoint', verified[0].name) && UnlockMap(setState({ unlocked: true }))
            : setState({ failed: true })
        TrackingManager.SendEventTracking(window.TRACKING_ACTION_CLICK_ON_BUTTON, 'locations_unlockchallenge')
    }

    return (
        <Typography component='div' className={classes.root} style={{ height: mapHeight + 'px' }}>
            {
                state.info &&
                <DialogMessage
                    title={GetText('LOCATION_INFO_1')}
                    nextLabel={GetText('LOCATION_INFO_3')}
                    onNext={evt =>
                    {
                        setState({ info: false })
                        TrackingManager.SendEventTracking(window.TRACKING_ACTION_CLICK_ON_BUTTON, 'locations_info_done')
                    }}
                >
                    <Typography className={classes.text1}>
                        { GetText('LOCATION_INFO_2') }
                    </Typography>
                </DialogMessage>
            }
            {
                state.unlocked &&
                <DialogMessage
                    nextLabel={GetText('LOCATION_UNLOCK_SUCCESS_3')}
                    onNext='/'
                >
                    <Typography>
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M47.2204 0.764649C47.7202 -0.00696887 48.7527 -0.234004 49.5279 0.265405C50.3031 0.764814 50.5265 1.79763 50.0271 2.57282L45.9845 8.8479C45.4803 9.62592 44.4501 9.84396 43.6771 9.34714C42.9019 8.84773 42.6784 7.81492 43.1778 7.03973L47.2204 0.764649ZM51.2685 17.7676L58.7142 17.2367C59.634 17.1711 60.4324 17.8633 60.498 18.7831C60.5622 19.6967 59.8789 20.4983 58.9516 20.5669L51.506 21.0978C50.5862 21.1634 49.7877 20.4712 49.7221 19.5514C49.6571 18.6293 50.3496 17.8346 51.2685 17.7676ZM40.0841 20.4382L18.5435 33.1994L14.1764 25.8278C11.8309 21.8687 13.1439 16.7392 17.1028 14.3939C21.0617 12.0485 26.1914 13.3614 28.5367 17.3203L30.2382 20.1924C30.7085 20.9862 31.7313 21.248 32.525 20.7777L38.2692 17.3747C39.0629 16.9045 39.3247 15.8817 38.8545 15.0879L37.153 12.2158C31.9928 3.50568 20.7085 0.617502 11.9983 5.77762C3.28817 10.9377 0.399992 22.2221 5.56012 30.9322L10.084 38.5684C8.76844 40.1513 8.49975 42.4438 9.60738 44.3135L19.8163 61.5459C21.2237 63.9215 24.3011 64.7091 26.6766 63.3018L55.3975 46.2868C57.7731 44.8794 58.5606 41.8021 57.1533 39.4266L46.9443 22.1941C45.537 19.8185 42.4597 19.0309 40.0841 20.4382ZM47.1331 12.2522L52.8772 8.84922C53.6709 8.37898 54.6938 8.64077 55.164 9.43452C55.6342 10.2283 55.3725 11.2511 54.5787 11.7213L48.8346 15.1243C48.0408 15.5945 47.018 15.3328 46.5478 14.539C46.0775 13.7452 46.3393 12.7224 47.1331 12.2522Z" fill="#16C39F"/>
                        </svg>
                    </Typography>
                    <Typography className={classes.text2}>
                        { GetText('LOCATION_UNLOCK_SUCCESS_1') }
                    </Typography>
                    <Typography className={classes.text1}>
                        { GetText('LOCATION_UNLOCK_SUCCESS_2') }
                    </Typography>
                </DialogMessage>
            }
            {
                state.failed &&
                <DialogMessage
                    nextLabel={GetText('LOCATION_UNLOCK_FAIL_3')}
                    onNext={evt =>
                    {
                        setState({ failed: false })
                        TrackingManager.SendEventTracking(window.TRACKING_ACTION_CLICK_ON_BUTTON, 'locations_fail_tryagain')
                    }}
                >
                    <Typography>
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="32" cy="32" rx="32" ry="31.9998" fill="#C39F16"/>
                            <rect x="29.0002" y="17" width="6.73909" height="21.5651" rx="3" fill="white"/>
                            <circle cx="32.3697" cy="44.6303" r="3.36955" fill="white"/>
                        </svg>
                    </Typography>
                    <Typography className={classes.text2}>
                        { GetText('LOCATION_UNLOCK_FAIL_1') }
                    </Typography>
                    <Typography className={classes.text1}>
                        { GetText('LOCATION_UNLOCK_FAIL_2') }
                    </Typography>
                </DialogMessage>
            }
            <Typography component='div' id='map' className={classes.map}>
                { PLACES.map((_, id) => <Marker id={id} key={id} />) }
                <img src={require('../assets/map.png')} height='100%' />
            </Typography>
            <Button className={classes.button} style={{ left: '0px', padding: 24 }} onClick={evt => unlockable && AttemptUnlock()}>
                <Typography component='div' className={classes.unlock}>
                    { GetText('QUEST_UNLOCK_CHALLENGE') }
                </Typography>
            </Button>
            <Button className={classes.button} style={{ right: '0px' }} component={Link} to='/help/locations'>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d)">
                        <circle cx="32" cy="32" r="16" fill="white"/>
                        <path d="M30.4758 40.0081C30.4758 40.4038 30.633 40.7832 30.9128 41.063C31.1926 41.3428 31.5721 41.5 31.9677 41.5C32.3634 41.5 32.7429 41.3428 33.0227 41.063C33.3025 40.7832 33.4597 40.4038 33.4597 40.0081C33.4597 39.6124 33.3025 39.2329 33.0227 38.9531C32.7429 38.6733 32.3634 38.5161 31.9677 38.5161C31.5721 38.5161 31.1926 38.6733 30.9128 38.9531C30.633 39.2329 30.4758 39.6124 30.4758 40.0081ZM36.1302 24.518C35.0113 23.5408 33.5343 23 31.9677 23C30.4012 23 28.9242 23.5371 27.8052 24.518C26.6415 25.5363 26 26.9051 26 28.371V28.6544C26 28.8185 26.1343 28.9528 26.2984 28.9528H28.0887C28.2528 28.9528 28.3871 28.8185 28.3871 28.6544V28.371C28.3871 26.7261 29.9947 25.3871 31.9677 25.3871C33.9408 25.3871 35.5484 26.7261 35.5484 28.371C35.5484 29.5309 34.7278 30.594 33.4597 31.0826C32.669 31.3847 31.9976 31.9143 31.5164 32.6081C31.0241 33.3167 30.7742 34.1671 30.7742 35.0287V35.8306C30.7742 35.9948 30.9085 36.129 31.0726 36.129H32.8629C33.027 36.129 33.1613 35.9948 33.1613 35.8306V34.984C33.1632 34.6219 33.2742 34.2688 33.4798 33.9707C33.6854 33.6726 33.976 33.4434 34.3138 33.313C36.5144 32.4663 37.9355 30.5268 37.9355 28.371C37.9355 26.9051 37.294 25.5363 36.1302 24.518Z" fill="#C3163A" />
                    </g>
                    <defs>
                        <filter id="filter0_d" x="13" y="15" width="38" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                            <feOffset dy="2"/>
                            <feGaussianBlur stdDeviation="1.5"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                        </filter>
                    </defs>
                </svg>
            </Button>
            <MarkerDetail />
        </Typography>
    )
}
const mapToProps = ({ currentStep }) => ({ currentStep })
export default geolocated()(connect(mapToProps, actions)(Locations))
