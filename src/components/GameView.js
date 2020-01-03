import React from 'react'
import { Typography} from '@material-ui/core'
import { connect } from 'redux-zero/react'
import TrackingManager from 'ets-tracking'
import actions from '../generic/Actions'

import Defines from '../generic/Defines'
const { Steps } = Defines

function GameView({ gameUrl, currentWeek, currentStep, FinishGame, ExitGame, UpdateStep })
{
    React.useEffect
    (
        _ =>
        {
            TrackingManager.SetPageInfo(`Game ${currentWeek+1}-Challenge ${~~currentStep}`)
            TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_IMPRESSION)
            window.addEventListener('message', messageHandler, false)

            return _ =>
            {
                TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_VISITED)
                window.removeEventListener('message', messageHandler, false)
            }
        }
    )

    const messageHandler = evt =>
    {
        switch (evt.data.command)
        {
            case 'complete_engagements':
                console.log('complete_engagements')
                UpdateStep()
                break
            case 'exit_no_reward':
                console.log('no_reward')
                ExitGame()
                break
            case 'exit_with_reward':
                console.log('reward')
                ExitGame(evt.data.brand)
                break
        }
    }

    return <Typography component='iframe' src={gameUrl} />
}
const mapToProps = ({ gameUrl, currentWeek, currentStep }) => ({ gameUrl, currentWeek, currentStep })
export default connect(mapToProps, actions)(GameView)
