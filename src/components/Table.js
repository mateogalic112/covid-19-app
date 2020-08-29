import React from 'react'
import './Table.css'
import { formatCurrentStatPrint } from '../utils/util'

function Table({ countries }) {
    return (
        <div className="table">
            {countries.map(({country, cases}) => (
                <tr>
                    <td>{country}</td>
                    <td><strong>{formatCurrentStatPrint(cases)}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default Table
