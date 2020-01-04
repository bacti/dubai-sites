import classnames from 'classnames'
import React from 'react'
import { connect } from 'redux-zero/react'
import actions from '../generic/Actions'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, ListItem } from '@material-ui/core'
import TrackingManager from 'ets-tracking'
import Defines from '../generic/Defines'

import Slider from 'react-slick'
import Coupon from './Coupon'

const { APP_BAR_HEIGHT, PAGE_PADDING } = Defines
const useStyles = makeStyles
(
    theme =>
    ({
        root:
        {
            paddingLeft: PAGE_PADDING,
            paddingRight: PAGE_PADDING,
        },        
        container: {
            backgroundColor: '#FFFFFF',
            padding: '20px 0px',
            height: '100%'
        },
        coupon: {
            display: 'flex',
            justifyContent: 'center'
        },
        gridContainer: {
            overflow: 'hidden',
            height: 140
        },
        sponsor:
        {
            'display': 'flex',
            'padding-bottom': 20,
            'justify-content': 'center',
        },
        text:
        {
            fontFamily: 'Muller',
            textAlign: 'right',
            fontSize: 12,
            color: '#959595',
        },
    })
)

function createData(type, name, quantity, validDate) {
    return { type, name, quantity, validDate };
}

const rows = [
    createData(1, "10% Discounts At Outlets", 2, "02/15/2020"),
    createData(1, "Cash Voucher", 1, "02/15/2020"),
    createData(1, "Entry To Grand Prize", 1, "02/15/2020"),
    createData(1, "30% Discounts At Outlets", 1, "02/15/2020"),
    createData(1, "50% Discounts At Outlets", 2, "02/15/2020")
];

function Wallet({ home, vouchers})
{
    React.useEffect
    (
        _ =>
        {
            if (!home)
            {
                TrackingManager.SetPageInfo('Wallet')
                TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_IMPRESSION)

                return _ =>
                {
                    TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_VISITED)
                }
            }
        }
    )

    const classes = useStyles();
    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        variableWidth: true
    };
    
    if (home)
    {
        return (
            <Grid container spacing={0} className={classes.gridContainer}>
                <Grid item xs={12}>
                    <Slider {...settings}>
                        {
                            vouchers.map((row, i) => (
                                <Coupon key={i} id={row.id} brand={row.brand} quantity={row.quantity || 1} validDate={row.time} />
                            ))
                        }
                    </Slider>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container spacing={0} className={classes.container}>
            <ListItem className={classes.sponsor}>
                <Typography component='div' className={classes.text}>
                    Sponsored by
                    <span style={{ display: 'contents' }}>
                        <img src={require('../assets/logo-club-apparel.png')} height='32px' style={{ verticalAlign: 'middle' }} />
                    </span>
                </Typography>
            </ListItem>
            {
                vouchers.map((row, i) => (
                    <Grid item xs={12} sm={6} md={6} className={classes.coupon} key={i}>
                        <Coupon id={row.id} brand={row.brand} quantity={row.quantity || 1} validDate={row.time} />
                    </Grid>
                ))
            }
        </Grid>
    )
}
const mapToProps = ({ vouchers }) => ({ vouchers })
export default connect(mapToProps, actions)(Wallet)