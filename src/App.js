import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { geolocated } from 'react-geolocated'
import { SAI_LOCATIONS, DUBAI_LOCATIONS } from './Defines'

const Styles = styled.div
`
    padding: 0;
    table {
        border-spacing: 0;
        border: 1px solid white;
        text-align: center;
        width: 100%;
        th,
        td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid white;
            border-right: 1px solid white;
            :last-child {
                border-right: 0;
            }
        }
        td:first-child {
            font-size: 0.7rem;
        }
        tr {
            :nth-child(odd) {
                background-color: #404856
            }
            :last-child {
                td {
                    border-bottom: 0;
                }
            }
            th {
                background-color: #282c34;
            }
        }
    }
`

function Table({ columns, data })
{
    const
    {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return (
        <table {...getTableProps()}>
            <thead>
            {
                headerGroups.map
                (
                    headerGroup =>
                    (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    )
                )
            }
            </thead>
            <tbody {...getTableBodyProps()}>
            {
                rows.map
                (
                    (row, i) =>
                    {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                { row.cells.map(cell => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>) }
                            </tr>
                        )
                    }
                )
            }
            </tbody>
        </table>
    )
}

function App(props)
{
    const columns = React.useMemo
    (
        _ =>
        [
            {
                Header: 'Location',
                accessor: 'name',
            },
            {
                Header: 'Distance',
                accessor: 'visits',
            },
            {
                Header: 'Latitude',
                accessor: 'latitude',
            },
            {
                Header: 'Longitude',
                accessor: 'longitude',
            },
        ],
        []
    )
    const data = React.useMemo
    (
        _ => DUBAI_LOCATIONS,
        []
    )
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = props

    console.log(data)

    if (!isGeolocationAvailable)
        return <div>Your browser does not support Geolocation</div>
    else
    if (!isGeolocationEnabled)
        return (
            <div>
                <div>Geolocation is not enabled</div>
                <div>please enable location in device's settings</div>
                <div>and allow us use device's location</div>
            </div>
        )
    else
    if (!coords)
        return <div>Getting the location data&hellip; </div>

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>current latitude: </td>
                        <td>{coords.latitude}</td>
                    </tr>
                    <tr>
                        <td>current longitude: </td>
                        <td>{coords.longitude}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <Styles>
                <Table columns={columns} data={data} />
            </Styles>
        </div>
    )
}

const options =
{
    positionOptions:
    {
        enableHighAccuracy: true,
    },
    watchPosition: true,
    userDecisionTimeout: 500,
}
export default geolocated(options)(App)
