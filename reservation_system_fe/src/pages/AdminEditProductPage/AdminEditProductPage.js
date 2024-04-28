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
import { emptyRows } from "./table_related/utils";
import AdminSideBar from '../../components/shared/admin/AdminSidebar';
import EditProductModal from './components/EditProductModal';
import {getProductsList} from '../../services/apiService';
import {Button, TableCell, TableRow} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

function AdminEditProductPage() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [itemId, setItemId] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [descendingOrder, setDescendingOrder] = useState(false);
    const [editItemIndex, setEditItemIndex] = useState(null);

    const handleSort = (event, id) => {
        setPage(0)
        const isAsc = orderBy === id && order === 'asc';
        if (id !== '') {
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(id);
        }
        if (order === "asc"){
            setDescendingOrder(false)
        }else setDescendingOrder(true)
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleClick = () => {
        setEditModalOpen(true);
    };


    async function fetchProducts() {
        try {
            // console.log("page " + (page + 1) + " rows " + rowsPerPage + " orderBy " + orderBy + " desc " + descendingOrder)
            // console.log(orderBy)
            // console.log(descendingOrder)
            const response = await getProductsList(page + 1 , rowsPerPage, orderBy, descendingOrder)
            setProducts(response.data)
            //console.log(products)
            setTotalCount(response.totalCount)
        } catch (error) {
            console.error('Chyba při načítání produktů:', error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [page, rowsPerPage, orderBy, order]);


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
                                        products
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

            <EditProductModal
                open={isEditModalOpen}
                onClose={handleCancelEdit}
                itemId={itemId}
            />
        </div>
    );
}

export default AdminEditProductPage;