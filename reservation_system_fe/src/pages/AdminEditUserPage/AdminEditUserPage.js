import React, {useCallback, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableNoData from './table_related/table-no-data';
import UserTableRow from './table_related/user-table-row';
import UserTableHead from './table_related/user-table-head';
import TableEmptyRows from './table_related/table-empty-rows';
import UserTableToolbar from './table_related/user-table-toolbar';
import Scrollbar from "../../components/global/scrollbar";
import {applyFilter, emptyRows, getComparator} from "./table_related/utils";
import AdminSideBar from '../../components/shared/admin/AdminSidebar';
import EditUserModal from './components/EditUserModal';
import {getUsers} from '../../services/apiService';
import {TableCell, TableRow} from "@mui/material";

function AdminEditUserPage() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(['name', 'email']);
    const [filterName, setFilterName] = useState('');
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [itemId, setItemId] = useState(null)
    const [dataFiltered, setDataFiltered] = useState([]);

    const [isLoading, setIsLoading] = useState(true);



    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleCancelEdit = () => {
        setEditModalOpen(false);
        fetchUsers();
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
        console.log(event.target.value);
        setFilterName(event.target.value);
    };

    useEffect(() => {
        const filteredData = applyFilter({
            inputData: users,
            comparator: getComparator(order, orderBy),
            filterName,
        });
        setDataFiltered(filteredData);
    }, [users, order, orderBy, filterName]);


    const handleClick = () => {
        setEditModalOpen(true);
    };

    const notFound = !dataFiltered.length && !!filterName;


    async function fetchUsers() {
        try {
            console.log("page " + (page + 1) + " rows " + rowsPerPage)
            const response = await getUsers( page + 1 , rowsPerPage)
            setUsers(response.data)
            setTotalCount(response.totalCount)
        } catch (error) {
            console.error('Chyba při načítání uživatelů:', error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [page, rowsPerPage]);

    useEffect(() => {
        console.log("dataFiltered:", dataFiltered);
    }, [dataFiltered]);


    return (
        <div style={{ display:"flex", alignContent:"center", width:"100%", margin:"auto"}}>
            <AdminSideBar/>
            <Container>
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
                                        { id: 'secondName', label: 'Jméno' },
                                        { id: 'email', label: 'Email' },
                                        { id: 'role', label: 'Role' },
                                        { id: 'isVerified', label: 'Ověřeno', align: 'center' },
                                        { id: 'isStudent', label: 'Student', align: 'center' },
                                        { id: 'active', label: 'Status' },
                                        { id: '' },
                                    ]}
                                />
                                <TableBody>
                                    {isLoading ? (
                                            <TableRow>
                                                <TableCell colSpan={3}>
                                                    Loading...
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                        dataFiltered
                                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <UserTableRow
                                                key={row.id}
                                                id={row.id}
                                                firstName={row.firstName}
                                                secondName={row.secondName}
                                                role={row.role}
                                                active={row.active}
                                                email={row.email}
                                                isVerified={row.isVerified}
                                                isStudent={row.isStudent}
                                                handleClick={handleClick}
                                                setItemId={setItemId}
                                            />
                                        )))}

                                    <TableEmptyRows
                                        height={77}
                                        emptyRows={emptyRows(page, rowsPerPage)}
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
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        rowsPerPageOptions={[5, 10, 25]}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                            ".MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
                                "margin-top": "1em",
                                "margin-bottom": "1em"
                            }

                        }}
                    />

                </Card>

            </Container>

            <EditUserModal
                open={isEditModalOpen}
                onClose={handleCancelEdit}
                itemId={itemId}
            />
        </div>
    );
}

export default AdminEditUserPage;
