import React, {useState, useEffect} from 'react';
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
import { getUsers } from '../../services/apiService';

function AdminEditUserPage() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(['name', 'email']);
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [itemId, setItemId] = useState(null)


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

    const dataFiltered = applyFilter({
        inputData: users,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const handleClick = () => {
        setEditModalOpen(true);
    };

    const notFound = !dataFiltered.length && !!filterName;

    async function fetchUsers() {
        try {
            const response = await getUsers();
            setUsers(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Chyba při načítání uživatelů:', error);
        }
    }

    useEffect(() => {


        fetchUsers();
    }, []);


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
                                    {dataFiltered
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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

            <EditUserModal
                open={isEditModalOpen}
                onClose={handleCancelEdit}
                itemId={itemId}
            />
        </div>
    );
}

export default AdminEditUserPage;
