import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import AdminSideBar from "../../components/AdminSidebar";

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from '../../_mock/user';

import TableNoData from './table_related/table-no-data';
import UserTableRow from './table_related/user-table-row';
import UserTableHead from './table_related/user-table-head';
import TableEmptyRows from './table_related/table-empty-rows';
import UserTableToolbar from './table_related/user-table-toolbar';

import Scrollbar from "../../components/global/scrollbar";
import {applyFilter, emptyRows, getComparator} from "./table_related/utils";
import Stack from "@mui/material/Stack";


function AdminEditUserPage() {
    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');


    const [orderBy, setOrderBy] = useState(['name', 'email']);

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const dataFiltered = applyFilter({
        inputData: users,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
        <div style={{ display:"flex", alignContent:"center", width:"100%", margin:"auto"}}>
            <AdminSideBar />
        <Container>
            <Stack direction="row" alignItems="center" gap={1} width="100%">
                <Typography marginLeft={50} variant="h4">Správa uživatelů</Typography>
            </Stack>

            <Card>
                <UserTableToolbar
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset'}}>
                        <Table sx={{ minWidth: 800}}>
                            <UserTableHead
                                order={order}
                                orderBy={orderBy}
                                rowCount={users.length}
                                onRequestSort={handleSort}
                                headLabel={[
                                    { id: 'name', label: 'Jméno' },
                                    { id: 'email', label: 'Email' },
                                    { id: 'role', label: 'Role' },
                                    { id: 'isVerified', label: 'Ověřeno', align: 'center' },
                                    { id: 'isStudent', label: 'Student', align: 'center' },
                                    { id: 'status', label: 'Status' },
                                    { id: '' },
                                ]}
                            />
                            <TableBody>
                                {dataFiltered
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <UserTableRow
                                            key={row.id}
                                            name={row.name}
                                            role={row.role}
                                            status={row.status}
                                            email={row.email}
                                            isVerified={row.isVerified}
                                            isStudent={row.isStudent}
                                        />
                                    ))}

                                <TableEmptyRows
                                    height={77}
                                    emptyRows={emptyRows(page, rowsPerPage, users.length)}
                                />

                                {notFound && <TableNoData query={filterName} />}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    labelRowsPerPage={"Počet řádků na straně"}
                    page={page}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </Card>

        </Container>
        </div>
    );
}

export default AdminEditUserPage;