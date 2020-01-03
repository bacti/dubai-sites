import React from 'react'
import classnames from 'classnames'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'

const useStyles = makeStyles
(
    theme =>
    ({
        medal: {
            fontWeight: 'bold',
            width: 30,
            height: 30,
            fontSize: 14,
            fontFamily: 'Muller, Arial',
            border: '#fff 1px solid'
        },
        medalGold: {
            backgroundColor: '#FFCD33'
        },
        medalSilver: {
            backgroundColor: '#D4D4D4',
        },
        medalBronze: {
            backgroundColor: '#F08B42',
        }
    })
)

export default function Medal(props)
{
    const classes = useStyles();
    const { rank } = props;
    
    if (rank <= 3)
    {
        var medalClass = (rank==1) ? classes.medalGold : (rank==2) ? classes.medalSilver : classes.medalBronze;
        return (<Avatar className={ classnames(classes.medal, medalClass) }>{rank}</Avatar>);
    }
    else
    {
        return (rank+'');
    }    
}
