import classnames from 'classnames'
import React from 'react'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { Divider, Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Defines from '../generic/Defines'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TrackingManager from 'ets-tracking'
import { GetText } from '../generic/Localization'

const { APP_BAR_HEIGHT, PAGE_PADDING } = Defines
const useStyles = makeStyles
(
    theme =>
    ({
        root:
        {
            padding: PAGE_PADDING,
        },
        sumary:
        {
            fontSize: theme.typography.pxToRem(16),
            lineHeight: theme.typography.pxToRem(22),
        },
        details:
        {
            fontSize: theme.typography.pxToRem(14),
            lineHeight: '140%',
        },
        icon:
        {
            'display': 'inline-block',
            'min-width': 10,
            'align-self': 'baseline',
            'flex': 'none',
            'padding-right': 8,
        },
    })
)
const theme = createMuiTheme
({
    overrides:
    {
        MuiPaper:
        {
            elevation1:
            {
                'box-shadow': 'none',
            },
        },
        MuiExpansionPanel:
        {
            root:
            {
                margin: '0px !important',
                border: 'none !important',
            },
        },
        MuiExpansionPanelSummary:
        {
            root:
            {
                padding: 0,
            },
            content:
            {
                margin: 0,
            },
        },
        MuiExpansionPanelDetails:
        {
            root:
            {
                padding: 0,
            },
        },
        MuiCollapse:
        {
            container:
            {
                'padding-bottom': 12,
                'margin-top': -12,
            },
        },
        MuiTypography:
        {
            body1:
            {
                'font-family': 'Muller',
            },
        },
        MuiList:
        {
            padding:
            {
                padding: '0px !important',
            },
        },
        MuiListItem:
        {
            gutters:
            {
                'padding-top': 0,
                'padding-left': 0,
                'padding-right': 0,
            },
        },
        MuiListItemText:
        {
            root:
            {
                margin: '0px !important',
            },
        },
    },
})

export default function Help(props)
{
    React.useEffect
    (
        _ =>
        {
            TrackingManager.SetPageInfo('Help')
            TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_IMPRESSION)

            return _ =>
            {
                TrackingManager.SendEventTracking(window.TRACKING_ACTION_TYPE_PAGE_VISITED)
            }
        }
    )

    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(window.location.hash)
    const handleChange = panel => (event, newExpanded) => setExpanded(newExpanded ? panel : false)

    return (
        <MuiThemeProvider theme={theme}>
            <Typography component='div' className={classes.root}>
                <ExpansionPanel expanded={expanded == '#/help/challenge-map'} onChange={handleChange('#/help/challenge-map')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                    <Typography className={classes.sumary}>
                        { GetText('HELP_QUESTMAP_LABEL') }
                    </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List>
                            <ListItem>
                                <ListItemText className={classes.icon}>
                                    <Typography component='span'>
                                        <svg width="81" height="24" viewBox="0 0 81 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 12C0 5.37258 5.37258 0 12 0H68.1951C74.8225 0 80.1951 5.37258 80.1951 12C80.1951 18.6274 74.8225 24 68.1951 24H12C5.37259 24 0 18.6274 0 12Z" fill="#C3163A"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.3661 8.29871V6.9208C13.3588 6.91568 13.2484 6.24335 13.6584 5.7296C13.9288 5.39197 14.3424 5.22097 14.8883 5.22097C15.9352 5.22097 16.2009 4.97487 16.2499 4.17014C16.2622 3.96871 16.4229 3.80469 16.6247 3.80469C16.8265 3.80469 16.9921 3.96848 16.9799 4.16992C16.9116 5.29479 16.4743 5.97588 14.8883 5.97588C14.5734 5.97588 14.3497 6.05407 14.2255 6.20827C14.0267 6.45309 14.091 6.84772 14.091 6.84772L14.0963 8.3188C14.5607 8.29282 14.9032 8.19676 15.2099 8.11069C15.5075 8.02728 15.7889 7.94858 16.1119 7.94858C16.3563 7.94745 16.5996 7.98181 16.8341 8.0506C17.9498 8.38001 18.7019 9.58595 19.2017 11.8454C19.4545 12.9877 19.5478 13.8692 19.4873 14.5402C19.4076 15.4153 19.0589 15.9641 18.4505 16.1717C18.0643 16.3044 17.6666 16.253 17.2686 16.0216C16.9694 15.8475 16.6694 15.5709 16.352 15.1755C15.8471 14.5466 15.2625 14.355 13.8499 14.355C12.2684 14.355 11.7573 14.6312 11.3207 15.1755C10.9343 15.6564 10.3688 16.2438 9.66353 16.2438C9.51391 16.2433 9.36543 16.2177 9.22432 16.1679C8.19487 15.8117 7.92649 14.2761 8.47173 11.844C8.9788 9.58383 9.73044 8.37836 10.8402 8.05037C11.0835 7.98196 11.3352 7.9477 11.5879 7.94858C11.91 7.94858 12.1911 8.02728 12.4889 8.11093C12.7415 8.18164 13.0179 8.25899 13.3661 8.29871ZM11.9649 11.7186H12.7189C12.8189 11.7186 12.9148 11.6789 12.9855 11.6082C13.0562 11.5375 13.0959 11.4416 13.0959 11.3416C13.0959 11.2416 13.0562 11.1457 12.9855 11.075C12.9148 11.0043 12.8189 10.9646 12.7189 10.9646H11.9649V10.2106C11.9649 10.1106 11.9252 10.0147 11.8545 9.94401C11.7838 9.87331 11.6879 9.83359 11.5879 9.83359C11.4879 9.83359 11.392 9.87331 11.3213 9.94401C11.2506 10.0147 11.2109 10.1106 11.2109 10.2106V10.9646H10.4569C10.3569 10.9646 10.261 11.0043 10.1903 11.075C10.1196 11.1457 10.0799 11.2416 10.0799 11.3416C10.0799 11.4416 10.1196 11.5375 10.1903 11.6082C10.261 11.6789 10.3569 11.7186 10.4569 11.7186H11.2109V12.4726C11.2109 12.5726 11.2506 12.6685 11.3213 12.7392C11.392 12.8099 11.4879 12.8496 11.5879 12.8496C11.6879 12.8496 11.7838 12.8099 11.8545 12.7392C11.9252 12.6685 11.9649 12.5726 11.9649 12.4726V11.7186ZM14.4363 11.7334C14.5138 11.7852 14.6049 11.8128 14.6982 11.8128C14.8231 11.8128 14.943 11.7632 15.0314 11.6748C15.1198 11.5864 15.1694 11.4666 15.1694 11.3416C15.1694 11.2484 15.1418 11.1573 15.09 11.0798C15.0382 11.0023 14.9646 10.9419 14.8785 10.9062C14.7924 10.8705 14.6976 10.8612 14.6062 10.8794C14.5148 10.8976 14.4308 10.9425 14.3649 11.0084C14.299 11.0743 14.2541 11.1582 14.236 11.2497C14.2178 11.3411 14.2271 11.4358 14.2628 11.5219C14.2984 11.608 14.3588 11.6816 14.4363 11.7334ZM15.473 12.7701C15.5505 12.8219 15.6417 12.8496 15.7349 12.8496C15.8597 12.8496 15.9794 12.8001 16.0677 12.712C16.1561 12.6239 16.2058 12.5043 16.2062 12.3795C16.2064 12.2863 16.179 12.195 16.1273 12.1174C16.0757 12.0397 16.0022 11.9792 15.9161 11.9433C15.83 11.9075 15.7352 11.898 15.6437 11.916C15.5522 11.9341 15.4681 11.9789 15.4021 12.0447C15.3361 12.1106 15.2911 12.1945 15.2728 12.286C15.2545 12.3774 15.2638 12.4722 15.2994 12.5584C15.335 12.6446 15.3954 12.7183 15.473 12.7701ZM15.4731 10.6967C15.5506 10.7485 15.6417 10.7761 15.7349 10.7761C15.8599 10.7761 15.9798 10.7264 16.0681 10.6381C16.1565 10.5497 16.2062 10.4298 16.2062 10.3048C16.2062 10.2116 16.1785 10.1205 16.1267 10.043C16.075 9.96553 16.0014 9.90513 15.9152 9.86946C15.8291 9.83379 15.7344 9.82446 15.643 9.84264C15.5516 9.86083 15.4676 9.90571 15.4017 9.97162C15.3358 10.0375 15.2909 10.1215 15.2727 10.2129C15.2545 10.3043 15.2639 10.3991 15.2995 10.4852C15.3352 10.5713 15.3956 10.6449 15.4731 10.6967ZM16.5098 11.7334C16.5873 11.7852 16.6785 11.8128 16.7717 11.8128C16.8966 11.8128 17.0165 11.7632 17.1049 11.6748C17.1933 11.5864 17.2429 11.4666 17.2429 11.3416C17.2429 11.2484 17.2153 11.1573 17.1635 11.0798C17.1117 11.0023 17.0381 10.9419 16.952 10.9062C16.8659 10.8705 16.7711 10.8612 16.6797 10.8794C16.5883 10.8976 16.5043 10.9425 16.4384 11.0084C16.3725 11.0743 16.3276 11.1582 16.3095 11.2497C16.2913 11.3411 16.3006 11.4358 16.3363 11.5219C16.372 11.608 16.4324 11.6816 16.5098 11.7334Z" fill="white"/>
                                            <path d="M26.2599 9.28783H23.9898V15.0244H25.5059V13.2215H26.2599C27.6777 13.2133 28.7594 12.7626 28.7594 11.2547C28.7594 9.74675 27.6777 9.28783 26.2599 9.28783ZM27.2023 11.2547C27.2023 11.771 26.7926 11.9103 26.3337 11.9103H25.5059V10.599H26.3337C26.7926 10.599 27.2023 10.7384 27.2023 11.2547ZM30.98 9.28783H29.4639V15.0244H33.6025V13.6722H30.98V9.28783ZM33.7171 15.0244H35.2741L35.602 14.123H37.9785L38.3063 15.0244H39.8634L37.6098 9.28783H35.9707L33.7171 15.0244ZM36.0527 12.8937L36.6427 11.2383C36.6919 11.099 36.7411 10.9596 36.7902 10.6564C36.8394 10.9596 36.8886 11.099 36.9378 11.2383L37.5278 12.8937H36.0527ZM41.284 15.0244H42.7919V13.0658L45.0292 9.28783H43.3082L42.0379 11.6562L40.7677 9.28783H39.0467L41.284 13.0658V15.0244ZM46.664 12.1561C46.664 14.2377 48.2128 15.1473 49.8437 15.1473C50.4911 15.1473 51.1549 15.008 51.7449 14.7622V11.8693H50.3108V13.8033C50.2124 13.8279 50.0813 13.8443 49.9174 13.8443C49.2618 13.8443 48.221 13.5739 48.221 12.1561C48.221 10.976 49.0979 10.5007 50.024 10.5007C50.5976 10.5007 51.1795 10.6646 51.6056 10.9596V9.52549C51.0647 9.29602 50.4419 9.1649 49.8273 9.1649C48.2292 9.1649 46.664 10.0172 46.664 12.1561ZM52.1401 15.0244H53.6972L54.025 14.123H56.4016L56.7294 15.0244H58.2864L56.0328 9.28783H54.3938L52.1401 15.0244ZM54.4757 12.8937L55.0658 11.2383C55.1149 11.099 55.1641 10.9596 55.2133 10.6564C55.2624 10.9596 55.3116 11.099 55.3608 11.2383L55.9508 12.8937H54.4757ZM65.1945 9.28783H63.7604L62.0148 11.9758L60.2693 9.28783H58.8351V15.0244H60.3512V11.9676L61.5805 13.8607H62.4492L63.6784 11.9758V15.0244H65.1945V9.28783ZM70.4083 9.28783H66.278V15.0244H70.4575V13.7132H67.7941V12.779H70.1624V11.4759H67.7941V10.599H70.4083V9.28783Z" fill="white"/>
                                        </svg>
                                    </Typography>
                                </ListItemText>
                                <ListItemText>
                                    <Typography className={classes.details}>
                                        { GetText('HELP_QUESTMAP_1') }
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText className={classes.icon}>
                                    <Typography component='span'>
                                        <svg width="113" height="24" viewBox="0 0 113 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 12C0 5.37258 5.37258 0 12 0H100.39C107.018 0 112.39 5.37258 112.39 12C112.39 18.6274 107.018 24 100.39 24H12C5.37259 24 0 18.6274 0 12Z" fill="#C3163A"/>
                                            <path d="M13.9185 6.43896C11.4071 6.43896 9.36609 8.47997 9.36609 10.9914C9.36609 12.524 10.2538 13.8063 11.2857 14.7016C11.612 14.9823 12.181 15.43 12.6894 16.0901C13.2508 16.8261 13.7592 17.6152 13.9185 18.1463C14.0778 17.6152 14.5862 16.8261 15.1477 16.0901C15.656 15.43 16.2251 14.9823 16.5513 14.7016C17.5832 13.8063 18.4709 12.524 18.4709 10.9914C18.4709 8.47997 16.4299 6.43896 13.9185 6.43896ZM13.9185 8.38133C14.2613 8.38133 14.6007 8.44884 14.9173 8.58001C15.234 8.71118 15.5217 8.90343 15.7641 9.1458C16.0065 9.38817 16.1987 9.6759 16.3299 9.99256C16.4611 10.3092 16.5286 10.6486 16.5286 10.9914C16.5286 11.3341 16.4611 11.6735 16.3299 11.9902C16.1987 12.3069 16.0065 12.5946 15.7641 12.837C15.5217 13.0793 15.234 13.2716 14.9173 13.4028C14.6007 13.5339 14.2613 13.6014 13.9185 13.6014C13.2263 13.6014 12.5624 13.3265 12.0729 12.837C11.5834 12.3475 11.3085 11.6836 11.3085 10.9914C11.3085 10.2992 11.5834 9.63528 12.0729 9.1458C12.5624 8.65632 13.2263 8.38133 13.9185 8.38133Z" fill="white"/>
                                            <path d="M29.3348 9.28783H27.8187V12.7544C27.8187 13.5247 27.4008 13.7951 26.7533 13.7951C26.1059 13.7951 25.688 13.5247 25.688 12.7544V9.28783H24.1719V12.8363C24.1719 14.5655 25.4831 15.1473 26.7533 15.1473C28.0236 15.1473 29.3348 14.5655 29.3348 12.8363V9.28783ZM30.3596 15.0244H31.8757V12.6806C31.8757 12.3692 31.8675 12.0086 31.8429 11.7382L34.0884 15.0244H35.5225V9.28783H34.0064V11.6316C34.0064 11.9512 34.0146 12.3118 34.0392 12.5823L31.7937 9.28783H30.3596V15.0244ZM38.1181 9.28783H36.602V15.0244H40.7405V13.6722H38.1181V9.28783ZM40.9249 12.1561C40.9249 13.7542 41.9493 15.1473 43.9981 15.1473C46.0468 15.1473 47.0712 13.7542 47.0712 12.1561C47.0712 10.5581 46.0468 9.1649 43.9981 9.1649C41.9493 9.1649 40.9249 10.5581 40.9249 12.1561ZM45.5142 12.1561C45.5142 13.074 44.9897 13.7542 43.9981 13.7542C43.0065 13.7542 42.482 13.074 42.482 12.1561C42.482 11.2383 43.0065 10.5581 43.9981 10.5581C44.9897 10.5581 45.5142 11.2383 45.5142 12.1561ZM47.5836 12.2381C47.5836 14.2869 49.1489 15.1473 50.7223 15.1473C51.3288 15.1473 51.8943 15.0244 52.3942 14.7868V13.3116C52.0663 13.6312 51.5255 13.8115 50.9354 13.8115C50.0422 13.8115 49.1407 13.3526 49.1407 12.2381C49.1407 10.9924 50.0422 10.4925 50.9518 10.4925C51.4763 10.4925 52.0008 10.6646 52.3532 10.9596V9.52549C51.8533 9.28783 51.2714 9.1649 50.6896 9.1649C49.1407 9.1649 47.5836 10.0746 47.5836 12.2381ZM53.2323 15.0244H54.7484V12.8117H55.4614L56.8545 15.0244H58.5345L56.6497 12.0824L58.4526 9.28783H56.7726L55.4696 11.4595H54.7484V9.28783H53.2323V15.0244ZM62.2392 9.28783H60.7231V15.0244H64.8617V13.6722H62.2392V9.28783ZM65.0461 12.1561C65.0461 13.7542 66.0705 15.1473 68.1192 15.1473C70.168 15.1473 71.1924 13.7542 71.1924 12.1561C71.1924 10.5581 70.168 9.1649 68.1192 9.1649C66.0705 9.1649 65.0461 10.5581 65.0461 12.1561ZM69.6353 12.1561C69.6353 13.074 69.1109 13.7542 68.1192 13.7542C67.1276 13.7542 66.6031 13.074 66.6031 12.1561C66.6031 11.2383 67.1276 10.5581 68.1192 10.5581C69.1109 10.5581 69.6353 11.2383 69.6353 12.1561ZM71.7048 12.2381C71.7048 14.2869 73.2701 15.1473 74.8435 15.1473C75.45 15.1473 76.0154 15.0244 76.5153 14.7868V13.3116C76.1875 13.6312 75.6467 13.8115 75.0566 13.8115C74.1633 13.8115 73.2619 13.3526 73.2619 12.2381C73.2619 10.9924 74.1633 10.4925 75.073 10.4925C75.5975 10.4925 76.122 10.6646 76.4744 10.9596V9.52549C75.9745 9.28783 75.3926 9.1649 74.8108 9.1649C73.2619 9.1649 71.7048 10.0746 71.7048 12.2381ZM76.8208 15.0244H78.3779L78.7057 14.123H81.0823L81.4101 15.0244H82.9671L80.7135 9.28783H79.0745L76.8208 15.0244ZM79.1564 12.8937L79.7465 11.2383C79.7956 11.099 79.8448 10.9596 79.894 10.6564C79.9431 10.9596 79.9923 11.099 80.0415 11.2383L80.6315 12.8937H79.1564ZM87.1464 9.28783H82.3932V10.64H84.0159V15.0244H85.532V10.64H87.1464V9.28783ZM89.3136 9.28783H87.7975V15.0244H89.3136V9.28783ZM90.1116 12.1561C90.1116 13.7542 91.136 15.1473 93.1848 15.1473C95.2336 15.1473 96.258 13.7542 96.258 12.1561C96.258 10.5581 95.2336 9.1649 93.1848 9.1649C91.136 9.1649 90.1116 10.5581 90.1116 12.1561ZM94.7009 12.1561C94.7009 13.074 94.1764 13.7542 93.1848 13.7542C92.1932 13.7542 91.6687 13.074 91.6687 12.1561C91.6687 11.2383 92.1932 10.5581 93.1848 10.5581C94.1764 10.5581 94.7009 11.2383 94.7009 12.1561ZM97.049 15.0244H98.5651V12.6806C98.5651 12.3692 98.5569 12.0086 98.5323 11.7382L100.778 15.0244H102.212V9.28783H100.696V11.6316C100.696 11.9512 100.704 12.3118 100.729 12.5823L98.4831 9.28783H97.049V15.0244Z" fill="white"/>
                                        </svg>
                                    </Typography>
                                </ListItemText>
                                <ListItemText>
                                    <Typography className={classes.details}>
                                        { GetText('HELP_QUESTMAP_2') }
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText className={classes.icon}>
                                    <Typography component='span'>
                                        <img src={require('../assets/voucher-1.png')} />
                                    </Typography>
                                </ListItemText>
                                <ListItemText>
                                    <Typography className={classes.details}>
                                        { GetText('HELP_QUESTMAP_3') }
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText className={classes.icon}>
                                    <Typography component='span'>
                                        <img src={require('../assets/voucher-2.png')} />
                                    </Typography>
                                </ListItemText>
                                <ListItemText>
                                    <Typography className={classes.details}>
                                        { GetText('HELP_QUESTMAP_4') }
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText className={classes.icon}>
                                    <Typography component='span'>
                                        <img src={require('../assets/voucher-3.png')} />
                                    </Typography>
                                </ListItemText>
                                <ListItemText>
                                    <Typography className={classes.details}>
                                        { GetText('HELP_QUESTMAP_5') }
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <Typography component='span' className={classes.details}>
                                    { GetText('HELP_QUESTMAP_6') }
                                </Typography>
                            </ListItem>
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Divider />
                <ExpansionPanel expanded={expanded == '#/help/locations'} onChange={handleChange('#/help/locations')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.sumary}>
                            { GetText('HELP_LOCATIONS_LABEL') }
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List>
                            <ListItem>
                                <ListItemText className={classes.icon}>
                                    <Typography component='span'>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.78775 16.6819L6.79008 16.6839C6.86525 16.7485 6.94576 16.8167 7.03072 16.8886C7.60265 17.3728 8.37648 18.0279 9.08198 18.9437C10.043 20.2036 10.8301 21.4538 11.0586 22.2155C11.1538 22.5327 11.4458 22.75 11.777 22.75C12.1082 22.75 12.4002 22.5327 12.4954 22.2155C12.7239 21.4538 13.511 20.2036 14.472 18.9437C15.1775 18.0279 15.9513 17.3728 16.5233 16.8886C16.6082 16.8167 16.6887 16.7485 16.7639 16.6839L16.7662 16.6819C18.617 15.0761 20.3041 12.6966 20.3041 9.77706C20.3041 5.0725 16.4816 1.25 11.777 1.25C7.07244 1.25 3.24994 5.0725 3.24994 9.77706C3.24994 12.6966 4.93701 15.0761 6.78775 16.6819ZM11.777 6.06821C12.264 6.06821 12.7463 6.16414 13.1963 6.35053C13.6463 6.53692 14.0552 6.81011 14.3995 7.15451C14.7439 7.49891 15.0171 7.90776 15.2035 8.35774C15.3899 8.80772 15.4858 9.29 15.4858 9.77706C15.4858 10.2641 15.3899 10.7464 15.2035 11.1964C15.0171 11.6463 14.7439 12.0552 14.3995 12.3996C14.0552 12.744 13.6463 13.0172 13.1963 13.2036C12.7463 13.39 12.264 13.4859 11.777 13.4859C10.7933 13.4859 9.84999 13.0952 9.15445 12.3996C8.4589 11.7041 8.06815 10.7607 8.06815 9.77706C8.06815 8.79341 8.4589 7.85005 9.15445 7.15451C9.84999 6.45896 10.7933 6.06821 11.777 6.06821Z" fill="#C3163A" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                                        </svg>
                                    </Typography>
                                </ListItemText>
                                <ListItemText>
                                    <Typography className={classes.details}>
                                        { GetText('HELP_LOCATIONS_1') }
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <Typography component='span' className={classes.icon}>
                                    &bull;
                                </Typography>
                                <Typography component='span' className={classes.details}>
                                    { GetText('HELP_LOCATIONS_2') }
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography component='span' className={classes.icon}>
                                    &bull;
                                </Typography>
                                <Typography component='span' className={classes.details}>
                                    { GetText('HELP_LOCATIONS_3') }
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemText className={classes.icon}>
                                    <Typography component='span'>
                                        <svg width="105" height="25" viewBox="0 0 105 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0 12.0244C0 5.3835 5.3835 0 12.0244 0H92.7073C99.3482 0 104.732 5.3835 104.732 12.0244C104.732 18.6653 99.3482 24.0488 92.7073 24.0488H12.0244C5.3835 24.0488 0 18.6653 0 12.0244Z" fill="white"/>
                                            <path d="M15.0479 9.28783H13.5318V12.7544C13.5318 13.5247 13.1139 13.7951 12.4665 13.7951C11.819 13.7951 11.4011 13.5247 11.4011 12.7544V9.28783H9.88499V12.8363C9.88499 14.5655 11.1962 15.1473 12.4665 15.1473C13.7367 15.1473 15.0479 14.5655 15.0479 12.8363V9.28783ZM16.0727 15.0244H17.5888V12.6806C17.5888 12.3692 17.5806 12.0086 17.556 11.7382L19.8015 15.0244H21.2356V9.28783H19.7195V11.6316C19.7195 11.9512 19.7277 12.3118 19.7523 12.5823L17.5068 9.28783H16.0727V15.0244ZM23.8312 9.28783H22.3151V15.0244H26.4536V13.6722H23.8312V9.28783ZM26.638 12.1561C26.638 13.7542 27.6624 15.1473 29.7112 15.1473C31.7599 15.1473 32.7843 13.7542 32.7843 12.1561C32.7843 10.5581 31.7599 9.1649 29.7112 9.1649C27.6624 9.1649 26.638 10.5581 26.638 12.1561ZM31.2273 12.1561C31.2273 13.074 30.7028 13.7542 29.7112 13.7542C28.7196 13.7542 28.1951 13.074 28.1951 12.1561C28.1951 11.2383 28.7196 10.5581 29.7112 10.5581C30.7028 10.5581 31.2273 11.2383 31.2273 12.1561ZM33.2967 12.2381C33.2967 14.2869 34.862 15.1473 36.4355 15.1473C37.0419 15.1473 37.6074 15.0244 38.1073 14.7868V13.3116C37.7795 13.6312 37.2386 13.8115 36.6485 13.8115C35.7553 13.8115 34.8538 13.3526 34.8538 12.2381C34.8538 10.9924 35.7553 10.4925 36.6649 10.4925C37.1894 10.4925 37.7139 10.6646 38.0663 10.9596V9.52549C37.5664 9.28783 36.9845 9.1649 36.4027 9.1649C34.8538 9.1649 33.2967 10.0746 33.2967 12.2381ZM38.9454 15.0244H40.4615V12.8117H41.1745L42.5676 15.0244H44.2476L42.3628 12.0824L44.1657 9.28783H42.4857L41.1827 11.4595H40.4615V9.28783H38.9454V15.0244ZM46.1576 12.2381C46.1576 14.2869 47.7229 15.1473 49.2964 15.1473C49.9028 15.1473 50.4683 15.0244 50.9682 14.7868V13.3116C50.6404 13.6312 50.0995 13.8115 49.5094 13.8115C48.6162 13.8115 47.7147 13.3526 47.7147 12.2381C47.7147 10.9924 48.6162 10.4925 49.5258 10.4925C50.0503 10.4925 50.5748 10.6646 50.9272 10.9596V9.52549C50.4273 9.28783 49.8454 9.1649 49.2636 9.1649C47.7147 9.1649 46.1576 10.0746 46.1576 12.2381ZM56.9692 9.28783H55.4531V11.4841H53.3224V9.28783H51.8063V15.0244H53.3224V12.8363H55.4531V15.0244H56.9692V9.28783ZM57.516 15.0244H59.0731L59.4009 14.123H61.7775L62.1053 15.0244H63.6623L61.4087 9.28783H59.7697L57.516 15.0244ZM59.8516 12.8937L60.4417 11.2383C60.4908 11.099 60.54 10.9596 60.5892 10.6564C60.6383 10.9596 60.6875 11.099 60.7367 11.2383L61.3267 12.8937H59.8516ZM65.7271 9.28783H64.211V15.0244H68.3496V13.6722H65.7271V9.28783ZM70.5129 9.28783H68.9968V15.0244H73.1354V13.6722H70.5129V9.28783ZM77.913 9.28783H73.7827V15.0244H77.9622V13.7132H75.2988V12.779H77.6672V11.4759H75.2988V10.599H77.913V9.28783ZM78.8406 15.0244H80.3567V12.6806C80.3567 12.3692 80.3485 12.0086 80.3239 11.7382L82.5694 15.0244H84.0035V9.28783H82.4874V11.6316C82.4874 11.9512 82.4956 12.3118 82.5202 12.5823L80.2747 9.28783H78.8406V15.0244ZM84.8043 12.1561C84.8043 14.2377 86.3532 15.1473 87.984 15.1473C88.6315 15.1473 89.2953 15.008 89.8853 14.7622V11.8693H88.4512V13.8033C88.3528 13.8279 88.2217 13.8443 88.0578 13.8443C87.4022 13.8443 86.3614 13.5739 86.3614 12.1561C86.3614 10.976 87.2383 10.5007 88.1643 10.5007C88.738 10.5007 89.3199 10.6646 89.746 10.9596V9.52549C89.2051 9.29602 88.5823 9.1649 87.9677 9.1649C86.3696 9.1649 84.8043 10.0172 84.8043 12.1561ZM94.9435 9.28783H90.8132V15.0244H94.9927V13.7132H92.3293V12.779H94.6976V11.4759H92.3293V10.599H94.9435V9.28783Z" fill="#C3163A"/>
                                            <path d="M12.0244 1H92.7073V-1H12.0244V1ZM92.7073 23.0488H12.0244V25.0488H92.7073V23.0488ZM12.0244 23.0488C5.93578 23.0488 1 18.113 1 12.0244H-1C-1 19.2176 4.83121 25.0488 12.0244 25.0488V23.0488ZM103.732 12.0244C103.732 18.113 98.7959 23.0488 92.7073 23.0488V25.0488C99.9005 25.0488 105.732 19.2176 105.732 12.0244H103.732ZM92.7073 1C98.7959 1 103.732 5.93579 103.732 12.0244H105.732C105.732 4.83122 99.9005 -1 92.7073 -1V1ZM12.0244 -1C4.83122 -1 -1 4.83122 -1 12.0244H1C1 5.93579 5.93579 1 12.0244 1V-1Z" fill="#EAEAEA"/>
                                        </svg>
                                    </Typography>
                                </ListItemText>
                                <ListItemText>
                                    <Typography className={classes.details}>
                                        { GetText('HELP_LOCATIONS_4') }
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <Typography component='span' className={classes.icon}>
                                    &bull;
                                </Typography>
                                <Typography component='span' className={classes.details}>
                                    { GetText('HELP_LOCATIONS_5') }
                                </Typography>
                            </ListItem>
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Divider />
                <ExpansionPanel expanded={expanded === '#/help/wallet'} onChange={handleChange('#/help/wallet')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography className={classes.sumary}>
                            { GetText('HELP_WALLET_LABEL') }
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List>
                            <ListItem>
                                <Typography component='span' className={classes.icon}>
                                    &bull;
                                </Typography>
                                <Typography component='span' className={classes.details}>
                                    { GetText('HELP_WALLET_1') }
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography component='span' className={classes.icon}>
                                    &bull;
                                </Typography>
                                <Typography component='span' className={classes.details}>
                                    { GetText('HELP_WALLET_2') }
                                </Typography>
                            </ListItem>
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Divider />
                <ExpansionPanel expanded={expanded === '#/help/leaderboard'} onChange={handleChange('#/help/leaderboard')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4a-content"
                        id="panel4a-header"
                    >
                        <Typography className={classes.sumary}>
                            { GetText('HELP_LEADERBOARD_LABEL') }
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List>
                            <ListItem>
                                <Typography component='span' className={classes.icon}>
                                    &bull;
                                </Typography>
                                <Typography component='span' className={classes.details}>
                                    { GetText('HELP_LEADERBOARD_1') }
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography component='span' className={classes.icon}>
                                    &bull;
                                </Typography>
                                <Typography component='span' className={classes.details}>
                                    { GetText('HELP_LEADERBOARD_2') }
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography component='span' className={classes.icon}>
                                    &bull;
                                </Typography>
                                <Typography component='span' className={classes.details}>
                                    { GetText('HELP_LEADERBOARD_3') }
                                </Typography>
                            </ListItem>
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Divider />
            </Typography>
        </MuiThemeProvider>
    )
}
