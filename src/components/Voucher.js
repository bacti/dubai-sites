import React from 'react'
import { connect } from 'redux-zero/react'
import actions from '../generic/Actions'
import classnames from 'classnames'
import Barcode from 'react-barcode'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { Typography, ListItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { GetLang } from '../generic/Localization';

const styles = theme =>
    ({
        title: {
            textAlign: "center",
            backgroundColor: "#FDEDF1",
            paddingTop: "10vh",
            paddingBottom: "10vh"
        },
        name: {
            fontSize: "20px",
            padding: "10px"
        },
        time: {
            display: "inline-flex"
        },
        info: {
            padding: "10px"
        },
        logo:{
            padding: "50px",
            backgroundColor: "#FDEDF1"
        }
    })

const theme = createMuiTheme
    ({
        overrides:
        {
            MuiListItem:
            {
                root:
                {
                    'justify-content': 'center',
                },
            },
        },
    })

class Voucher extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {


    }


    render() {
        const { classes } = this.props;
        let id = this.props.match.params.id;
        let voucher = this.props.vouchers.find(voucher => voucher.id == id) || {};

        return (
            voucher ? <MuiThemeProvider theme={theme}>
                <div style={{ textAlign: "center" }}>
                    <div className={classes.logo}>
                        <img width="100%" src={'/images/logos/' + (voucher.brand || "").toUpperCase() + ' '+ GetLang() + ".png"}></img>
                    </div>
                    {/* <div className={classes.title}>{voucher.brand}</div> */}
                    <div>
                        <div className={classes.name}>ADE100 Voucher</div>
                        <div className={classes.time}>
                            <div className={classes.info}>Received on <br /> {new Date(voucher.time).toLocaleDateString()}</div>
                            <div className={classes.info}>Valid date <br /> 31/12/2020</div>
                        </div>

                    </div>
                    <hr />
                    <Barcode value={voucher.id} displayValue={false} />
                </div>
            </MuiThemeProvider> : ""
        )

    }

}


const mapToProps = ({ vouchers }) => ({ vouchers })
export default connect(mapToProps, actions)(withStyles(styles)(Voucher))