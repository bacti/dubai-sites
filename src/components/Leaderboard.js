import React from 'react'
import { connect } from 'redux-zero/react'
import actions from '../generic/Actions'
import classnames from 'classnames'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Grid, Table, TableHead, TableBody, TableRow, TableCell, Typography, Badge, Box, Avatar, Divider } from '@material-ui/core'
import TrackingManager from 'ets-tracking'
import Defines from '../generic/Defines'

const { PAGE_PADDING } = Defines
const useStyles = makeStyles
(
    theme =>
    ({
        tableLeaderBoard: {
            width: '100%'
        },        
        cellTitleRank: {
            width: '60px'
        },
        cellTitleHead: {
            color: '#959595',
            fontWeight: 'bold'            
        },
        cellMedal: {
            justifyContent: 'center', 
            display: 'flex'
        },
        removeBorderBottom: {
            'font-family': 'Muller',
            'font-size': 14,
            borderBottom: 'none'
        },
        rowNormal: {
            backgroundColor: '#ffffff',
            'border-bottom': 'solid 1px #F6F6F6',
        },
        rowUser: {
            backgroundColor: '#EDF9FD'
        },
        avatarSide: {
            width: 56,
            height: 56
        },
        avatarMiddle: {
            width: 84,
            height: 84
        },
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 140,
            display: 'flex',
            'align-items': 'flex-end',
        },
        userName: {
            'font-family': 'Muller',
            fontSize: 14,
            color: '#333333'
        },
        userScore: {
            'font-family': 'Muller',
            fontSize: 14,
            color: '#959595'
        },
        topPlayers:
        {
            'justify-content': 'center',
            'text-align': 'center',
            'padding-bottom': 12,
        },
    })
)

function Leaderboard({ leaderboard, home })
{
    React.useEffect
    (
        _ =>
        {
            if (!home)
            {
                TrackingManager.SetPageInfo('Leaderboard')
                TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_IMPRESSION)

                return _ =>
                {
                    TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_VISITED)
                }
            }
        }
    )

    const classes = useStyles();
    let shouldAddPlayer = false;
    const LeaderboardInfo = (key, rank, name, score) =>
    (
        <Grid item xs={4} className={classes.container} key={key}>
            <Box>
                <Badge>
                    <Avatar
                        alt='Stock avatar'
                        src={require(`../assets/leaderboard-${rank}.png`)}
                        className={rank > 1 ? classes.avatarSide : classes.avatarMiddle}
                    />
                </Badge>
                <Typography className={classes.userName}>{name}</Typography>
                <Typography className={classes.userScore}>{score}</Typography>
            </Box>
        </Grid>
    )

    const TopPlayers = _ =>
    (
        <Grid container spacing={0} className={classes.topPlayers}>
        {
            [...leaderboard.record]
            .filter((row, i) => i < 3)
            .sort((x, y) => (x.rank == 2 ? -1 : y.rank == 2 ? 1 : 0))
            .map((row, i) => LeaderboardInfo(i, row.rank, row.display_name, row.score))
            
        }
        </Grid>
    )

    const IsPlayer=(item)=>
    {
        if(!leaderboard.my_entry)
        {
            return false;
        }   
        return item.userid == leaderboard.my_entry.userid;
    }

    const GetList=()=>
    {
        if(!leaderboard.my_entry)
        {
            return leaderboard.record;
        }
        let items = [...leaderboard.record];
        let shouldAdd = true;
        items.forEach(element => {
            if(IsPlayer(element))
            {
                shouldAdd = false;
                return true;
            }
        });

        if(shouldAdd)
        {
             items.push(leaderboard.my_entry);
        }
        return items;
    }

    if (home)
        return <TopPlayers />    

    return (
        <Grid container spacing={0}>
            <Typography component='div' style={{ width: '100%', background: '#FDEDF1' }}>
                <TopPlayers  />
            </Typography>
            <Grid item xs={12} style={{ paddingBottom: PAGE_PADDING }}>
                <Table className={classes.tableLeaderBoard} aria-label='simple table'>
                    <TableBody>
                    {
                        GetList().slice(3).map((row, i) =>
                        (
                            <TableRow key={i} className={ IsPlayer(row) ? classes.rowUser : classes.rowNormal }>
                                <TableCell align='left' component='th' scope='row' className={classes.removeBorderBottom}
                                    style={{ paddingLeft: PAGE_PADDING }}
                                >
                                    { i + 4 }
                                </TableCell>
                                <TableCell align='left' className={classnames(classes.removeBorderBottom)}
                                    style={{ padding: 0 }}
                                >
                                    {row.display_name}
                                </TableCell>
                                <TableCell align='right' className={classnames(classes.removeBorderBottom)}
                                    style={{ paddingRight: PAGE_PADDING }}
                                >
                                    {row.score}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    )
}

const mapToProps = ({ leaderboard }) => ({ leaderboard })
export default connect(mapToProps, actions)(Leaderboard)