import React from 'react'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Drawer, Button, Typography, Divider, ListItem, ListItemText } from '@material-ui/core'
import { Route, Switch, Link } from 'react-router-dom'

const useStyles = makeStyles
(
    ({ palette }) =>
    ({
        root:
        {
            position: 'fixed',
            width: '100%',
            bottom: 0,
            backgroundColor: 'white',
            zIndex: 10,
        },
        anonymous : 
        {
            color: '#ff0000 !important', 
            fontFamily: 'Muller-ExtraBold', 
            fontSize: 10
        }
    })
)

const theme = createMuiTheme
({
    overrides:
    {
        MuiButton:
        {
            label:
            {
                'font-family': 'Muller-ExtraBold',
                'font-size': 10,
                'line-height': '12px',
                'text-transform': 'capitalize',
                color: '#333333',
            },
        },
        MuiToolbar:
        {
            gutters:
            {
                padding: '0px !important',
                'flex-direction': 'row-reverse',
            },
        },
    },
})

export default function AppFooter()
{
    const { root, anonymous } = useStyles()
    let ano = window.anonymous;
    
    return (
        <MuiThemeProvider theme={theme}>
            <Switch>
                <Route exact path='/'>
                    <Typography component='div' classes={{ root }}>
                        <AppBar color='inherit' position='static'>
                            <Divider />
                            <Toolbar>
                                <Button component={Typography}>
                                    Term Of Use
                                </Button>
                                <Typography>|</Typography>
                                <Button component={Typography}>
                                    Privacy Policy
                                </Button>
                                <Typography className={anonymous}>{ano}</Typography>
                            </Toolbar>
                            <Divider />
                        </AppBar>
                    </Typography>
                </Route>
            </Switch>
        </MuiThemeProvider>
    )
}
