import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';

import BTable from 'react-bootstrap/Table';

import { useTable, useGlobalFilter } from 'react-table';
import { GlobalFilter } from './globalFilter';
import { Dropdown } from 'react-bootstrap';

function Table({ columns, data, setSelectedDropDownValue }) {

    const options = ["All","sales", "developer", "accounts", "ceo"]

    const { getTableProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = useTable({
        columns,
        data,
    }, useGlobalFilter)

    const { globalFilter } = state

    return (
        <>
            <div className="d-flex position-relative">
                <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                <div className="position-absolute end-0">
                    <Dropdown>
                        filter:{''}
                        <Dropdown.Toggle style={{backgroundColor: '#FFFFFF', borderColor:'#f2f2f2', color: '#000'}} className='ms-2' variant="success" id="dropdown-basic">
                            By Team
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {options.map((items) => (
                                <Dropdown.Item onClick={() => setSelectedDropDownValue(items)} >{items}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <BTable striped bordered hover size="sm" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </BTable>
        </>
    )
}

export default Table
