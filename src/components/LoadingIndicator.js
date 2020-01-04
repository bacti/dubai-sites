import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles
(
    theme =>
    ({        
        bgWhite:
        {
            zIndex: 2000,
            backgroundColor: '#ffffff',
            opacity: '0.9',
            position: 'fixed',
            width: '100%',
            height: '100%',
            display: 'flex',
            'flex-direction': 'column',
            'justify-content': 'center',
        },
        loadingIcon:
        {
            'z-index': 3001,
            'align-self': 'center',
            'color': '#C3163A',
        }
    })
)

export default function LoadingIndicator({ loading })
{
    const classes = useStyles();
    if (!loading)
        return null
    
    return (
        <Typography component='div' className={classes.bgWhite}>
            <CircularProgress className={classes.loadingIcon} />
        </Typography>
    )    
}