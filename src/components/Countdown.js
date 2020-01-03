import classnames from 'classnames'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Drawer, Button, Typography, Divider, Grid , Paper, Table, TableRow, TableCell } from '@material-ui/core'
import { Route, Switch, Link } from 'react-router-dom'
import { GetText } from '../generic/Localization'

const useStyles = makeStyles
(
    theme =>
    ({
        root:
        {
            width: 240,
            height: 72,
            display: 'flex',
            flexGrow: 1,
            backgroundColor: '#FDEDF1',
            color: '#333333',
            'text-align': 'center',
            'border-radius': 6,
            'margin': '4px auto',
        },
        message:
        {
            'font-family': 'Muller',
            'font-size': 12,
        },
        text:
        {
            padding: 0,
            'font-family': 'Muller',
            'font-size': 8,
            'text-transform': 'uppercase',
            'text-align': 'center',
            border: 'none',
            color: '#959595',
        },
        number:
        {
            padding: 0,
            'font-family': 'Muller',
            'font-size': 24,
            'text-align': 'center',
            // 'line-height': '36px',
            border: 'none',
        },
        timer:
        {
            width: 100,
            padding: '6px 16px 6px 0px',
            'margin-left': 'auto',
            'margin-right': 'auto',
        },
        timerRow:
        {
            display: 'flex',
            'justify-content': 'space-between',
            'line-height': 1.2,
            'place-content': 'space-between',
        },
    })
)

export default function Countdown()
{
    const classes = useStyles()
    const { root, text, number, timer, timerRow } = classes
    return (
        <Typography component='div' classes={{ root }}>
            <Typography component='div' style={{ padding: '4px 8px 0px 8px' }}>
                <svg width="49" height="64" viewBox="0 0 49 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.2113 31.392C19.2113 31.7273 19.4831 31.9974 19.8173 31.9974C20.1514 31.9974 20.4232 31.7256 20.4232 31.392C20.4238 30.6828 20.6757 29.9935 21.133 29.4511C22.1502 28.2449 22.9127 26.9372 23.3956 25.5642C23.4608 25.3787 23.4324 25.1733 23.319 25.0127C23.2049 24.8522 23.0211 24.7568 22.8242 24.7568H16.8097C16.6129 24.7568 16.4285 24.8522 16.3144 25.0127C16.201 25.1733 16.1726 25.3787 16.2378 25.5642C16.7218 26.9372 17.4832 28.2449 18.5004 29.4511C18.9583 29.9935 19.2108 30.6834 19.2113 31.392Z" fill="#C3163A"/>
                    <path d="M20.4232 33.8202C20.4232 33.4855 20.1515 33.2148 19.8173 33.2148C19.4831 33.2148 19.2113 33.4866 19.2113 33.8202C19.2108 34.6951 18.6883 35.5603 17.7402 36.2621C15.7125 37.7593 14.1948 39.3859 13.2292 41.0959C13.1231 41.2843 13.1248 41.5135 13.2343 41.6985C13.3421 41.8851 13.5418 41.9992 13.7574 41.9992H25.8783C26.0933 41.9992 26.2925 41.8851 26.4014 41.6985C26.5098 41.5135 26.5115 41.2843 26.4059 41.0959C25.4409 39.3859 23.9226 37.7593 21.8955 36.2621C20.9463 35.5603 20.4238 34.6951 20.4232 33.8202Z" fill="#C3163A"/>
                    <path d="M30.4223 42.9089H30.0598C29.6433 38.1925 26.8815 34.5716 24.7346 31.9998C26.882 29.4286 29.6428 25.8072 30.0609 21.0908H30.4234C31.0929 21.0908 31.6353 20.5478 31.6353 19.8784C31.6353 19.2089 31.0929 18.6665 30.4234 18.6665H9.21186C8.54239 18.6665 8 19.2095 8 19.8784C8 20.5478 8.54239 21.0908 9.21186 21.0908H9.5744C9.9914 25.8078 12.7521 29.4292 14.8996 31.9998C12.7527 34.5711 9.9914 38.1919 9.57383 42.9089H9.21186C8.54239 42.9089 8 43.4507 8 44.1202C8 44.7902 8.54239 45.3332 9.21186 45.3332H10.7273H28.9075H30.4234C31.0929 45.3332 31.6353 44.7902 31.6353 44.1202C31.6353 43.4507 31.0923 42.9089 30.4223 42.9089ZM12.0038 42.9089C12.4594 38.6475 15.2298 35.3659 17.3 32.9138L17.4107 32.7828C17.7919 32.3317 17.7919 31.6713 17.4107 31.2197L17.3006 31.0892C15.2309 28.6366 12.4594 25.355 12.0038 21.0931H27.6309C27.1754 25.355 24.4038 28.6366 22.3341 31.0892L22.2246 31.2197C21.8434 31.6708 21.8434 32.3312 22.2246 32.7828L22.3353 32.9138C24.405 35.3659 27.1754 38.6475 27.6309 42.9089H12.0038Z" fill="#333333"/>
                    <rect x="44" y="4" width="1" height="56" fill="#C3163A" fillOpacity="0.3"/>
                </svg>
            </Typography>
            <Typography component='div'>
                <Typography component='div' className={classes.message}>
                    { GetText('HOME_PAGE_MESSAGE1') }
                </Typography>
                <Typography component='div' className={timer}>
                    <Typography component='div' className={timerRow}>
                        <div className={number}>9</div>
                        <div className={number}>:</div>
                        <div className={number}>15</div>
                        <div className={number}>:</div>
                        <div className={number}>37</div>
                    </Typography>
                    <Typography component='div' className={timerRow}>
                        <div className={text}>
                            { GetText('HOME_PAGE_DAY') }
                        </div>
                        <div className={text}>
                            { GetText('HOME_PAGE_HOUR') }
                        </div>
                        <div className={text}>
                            { GetText('HOME_PAGE_MINUTE') }
                        </div>
                    </Typography>
                </Typography>
            </Typography>
        </Typography>
    )
}
