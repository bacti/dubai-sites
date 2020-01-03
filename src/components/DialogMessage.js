import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'

const theme = createMuiTheme
({
    overrides:
    {
        MuiDivider:
        {
            root:
            {
                'margin-top': 16,
            },
        },
        MuiDialog:
        {
            scrollBody:
            {
                height: 'auto !important',
            },
            paperWidthSm:
            {
                'min-width': 300,
            },
        },
        MuiDialogTitle:
        {
            root:
            {
                'font-family': 'Muller-ExtraBold',
                'font-size': 18,
                'line-height': '22px',
                'text-align': 'center',
                'text-transform': 'capitalize',
                'padding': '16px 0px',
            },
        },
        MuiDialogContent:
        {
            root:
            {
                'display': 'flex',
                'flex-direction': 'column',
                'align-items': 'center',
                'padding': '0px 24px',
            },
        },
        MuiDialogActions:
        {
            root:
            {
                'justify-content': 'center',
                'padding-bottom': 20,
            },
        },
        MuiButton:
        {
            root:
            {
                'font-family': 'Muller-ExtraBold',
                'font-size': 14,
                'color': '#FFFFFF',
                'background': '#C3163A',
                'border-radius': 30,
                '&:hover':
                {
                    'background-color': '#C3163A !important',
                }
            },
        },
    },
})

export default function DialogMessage({ children, title, nextLabel, scroll = 'paper', style, onNext })
{
    return (
        <MuiThemeProvider theme={theme}>
            <Dialog style={style} scroll={scroll} open={true} >
                {
                    title &&
                    <DialogTitle disableTypography>
                        { title }
                        <Divider />
                    </DialogTitle>
                }
                <DialogContent>{ children }</DialogContent>
                <DialogActions>
                    {
                        typeof onNext == 'string'
                            ? <Button component={Link} to={onNext}>{ nextLabel }</Button>
                            : <Button onClick={onNext}>{ nextLabel }</Button>
                    }
                </DialogActions>
            </Dialog>
        </MuiThemeProvider>
    )
}
