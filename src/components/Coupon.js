import React from 'react'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { red } from '@material-ui/core/colors'
import {GetLang} from '../generic/Localization';

const useStyles = makeStyles
(
    theme =>
    ({
        card: {
            width: 347,
            height: 146,
            display: 'flex',
            // backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left',
            // border: '#ff0000 1px solid',
            borderRadius: '0px',
            fontSize: 12,
            fontFamily: 'Muller, Arial',
            fontWeight: '800'
        },
        cardBgNormal: {
            backgroundImage: `url(${require('../assets/Voucher_01.png')})`,
            backgroundColor: 'transparent'
        },
        cardBgMulti: {
            backgroundImage: `url(${require('../assets/Voucher_Many.png')})`,
            backgroundColor: 'transparent'
        },
        details: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap'
        },
        quantityCoupon: {
            color: '#ffffff',
            background: '#959595',
            borderRadius: '6px 0px 0px 6px',
            padding: '4px 14px',
            top: '16px',
            height: 20,
            right: 12,
            position: "absolute"
        },
        content: {
            width: "100%",
            display: "flex",
            // paddingTop: "40px"
        },
        logo: {
            width: "35%",
            height: "130px",
            lineHeight: "130px",
            display: "flex",
            // flexDirection: "column",
            justifyContent: "center"
        },
        logoImage:{
            width: "60%",
            // padding: "20%",
            // maxHeight: "120px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        },
        detail: {
            paddingTop: "40px",
            padding: "20px"
        },
        nameCoupon: {
            width: '100%',
            fontSize: 14,
            fontWeight: '800',
            color: '#333333'
        },
        dateCoupon: {
            fontSize: 10,
            fontWeight: 'normal',
            color: '#959595'
        },
        btnUseNow: {
            position: "sticky",
            fontSize: 12,
            fontFamily: 'Muller, Arial',
            fontWeight: '800',
            right: 30,
            bottom: 10,
            color: 'red'
        }
    })
)

export default function Coupon(props)
{
    const classes = useStyles();
    const { id, brand, quantity, validDate } = props;

    return (
        <Card className={ classnames(classes.card, (quantity > 1) ? classes.cardBgMulti : classes.cardBgNormal) }>
            <div className={classes.details}>
                <div className={classes.quantityCoupon}>x{quantity}</div>
                <div className={classes.content}>
                    <div className={classes.logo}>
                        <div className={classes.logoImage}>
                            <img width="100%" src={'/images/logos/' + (brand || "").toUpperCase() + ' '+ GetLang() + ".png"}></img>
                            {/* <img width="100%" src={'/images/logos/AEROPODTALE AR.png'}></img> */}
                        </div>
                        
                        
                    </div>
                    <div className={classes.detail}>
                        <div className={classes.nameCoupon}>
                            {"ADE100 Voucher"}
                        </div>
                        <div className={classes.dateCoupon}>
                            Valid date: {new Date(validDate).toLocaleDateString()}
                        </div>
                    </div>
                </div>
                <Button className={classes.btnUseNow} component={Link}  to={'/voucher/' + id}>
                    USE NOW
                </Button>
            </div>
        </Card>
    );
}
