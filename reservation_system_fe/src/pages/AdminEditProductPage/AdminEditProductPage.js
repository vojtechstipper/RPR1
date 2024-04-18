import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import UserTableRow from './table_related/user-table-row';
import UserTableHead from './table_related/user-table-head';
import TableEmptyRows from './table_related/table-empty-rows';
import Scrollbar from "../../components/global/scrollbar";
import {applyFilter, emptyRows, getComparator} from "./table_related/utils";
import AdminSideBar from '../../components/shared/admin/AdminSidebar';
import EditProductModal from './components/EditProductModal';
import {getProducts, getProductsList} from '../../services/apiService';
import {Button, TableCell, TableRow} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

function AdminEditProductPage() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    //const [totalCount, setTotalCount] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(['name']);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [itemId, setItemId] = useState(null)
    const [dataFiltered, setDataFiltered] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [newItem, setNewItem] = useState('');
    const [editItemIndex, setEditItemIndex] = useState(null);
    const [selectValue, setSelectValue] = useState('');

    const handleSort = (event, id) => {
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
    };

    const handleCancelEdit = () => {
        setEditModalOpen(false);
        setItemId(null);
        fetchProducts();
    };

    const handleAddItem = () => {
        setEditItemIndex(null)
        console.log(editItemIndex);
        setEditModalOpen(true);
    };

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setPage(0);
    //     setRowsPerPage(parseInt(event.target.value, 10));
    // };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    useEffect(() => {
        const filteredData = applyFilter({
            inputData: products,
            comparator: getComparator(order, orderBy)
        });
        setDataFiltered(filteredData);
    }, [products, order, orderBy]);


    const handleClick = () => {
        setEditModalOpen(true);
    };


    async function fetchProducts() {
        try {
            //console.log("page " + (page + 1) + " rows " + rowsPerPage)
            //const response = await getUsers( page + 1 , rowsPerPage)
            const response = await getProductsList()
            setProducts(response)
            //setTotalCount(response.totalCount)
        } catch (error) {
            console.error('Chyba při načítání produktů:', error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [page, rowsPerPage]);

    useEffect(() => {
        console.log("dataFiltered:", dataFiltered);
    }, [dataFiltered]);


    return (
        <div style={{ display:"flex", alignContent:"center", width:"100%", margin:"auto"}}>
            <AdminSideBar/>
            <Container>
                <Card>
                    <Toolbar
                        sx={{
                            height: 96,
                            display: 'flex',
                            justifyContent: 'flex-end'

                        }}
                    >
                        <Button variant="contained" color="primary" onClick={handleAddItem}>
                            Přidat produkt
                        </Button>

                    </Toolbar>

                    <Scrollbar>
                        <TableContainer sx={{ overflow: 'unset'}}>
                            <Table sx={{ minWidth: 800}}>
                                <UserTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    rowCount={products.length}
                                    onRequestSort={handleSort}
                                    headLabel={[
                                        { id: 'name', label: 'Název' },
                                        { id: 'productType', label: 'Typ produktu' },
                                        { id: 'price', label: 'Cena', align: 'center' },
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
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => (
                                                <UserTableRow
                                                    key={row.id}
                                                    id={row.id}
                                                    name={row.name}
                                                    productType={row.productType.name}
                                                    price={row.priceLevel.price}
                                                    handleClick={handleClick}
                                                    setItemId={setItemId}
                                                    fetchProduct={fetchProducts}
                                                />
                                            )))}

                                    <TableEmptyRows
                                        height={77}
                                        //emptyRows={emptyRows(page, rowsPerPage)}
                                        emptyRows={emptyRows()}
                                    />

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        labelRowsPerPage={"Počet řádků na straně"}
                        page={page}
                        component="div"
                        //count={totalCount}
                        count={products.length}
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

            <EditProductModal
                open={isEditModalOpen}
                onClose={handleCancelEdit}
                itemId={itemId}
            />
        </div>
    );
}

export default AdminEditProductPage;