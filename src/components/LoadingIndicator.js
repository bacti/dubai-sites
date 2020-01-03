import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles
(
    theme =>
    ({        
        bgWhite: {
            zIndex: 2000,
            backgroundColor: '#ffffff',
            opacity: '0.9',
            position: 'fixed',
            width: '100%',
            height: '100%'            
        },
        loadingIcon: {
            zIndex: 2001,
            position: 'absolute',
            left: '50%',
            top: '50%',
            textAlign: 'center',
            transform: 'translate(-50%, 0)'
        }
    })
)

export default function LoadingIndicator(props)
{
    const classes = useStyles();
    const { loading } = props;
    
    return (
        <div style={{ display: loading ? 'block' : 'none'}}>
            <div className={classes.bgWhite}></div>
            <CircularProgress className={classes.loadingIcon} />
        </div>
    )    
}