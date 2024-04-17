export const visuallyHidden = {
    border: 0,
    margin: -1,
    padding: 0,
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    clip: 'rect(0 0 0 0)',
};

export function emptyRows(page, rowsPerPage, arrayLength) {
    return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator(a, b, orderBy) {
    if (typeof a === 'object' && typeof b === 'object') {
        if (a[orderBy] === null) {
            return 1;
        }
        if (b[orderBy] === null) {
            return -1;
        }
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    } else if (typeof a === 'string' && typeof b === 'string') {
        if (a === null) {
            return 1;
        }
        if (b === null) {
            return -1;
        }
        if (b < a) {
            return -1;
        }
        if (b > a) {
            return 1;
        }
        return 0;
    } else {
        throw new Error('Invalid data types for comparison');
    }
}


export function getComparator(order, orderBy) {
    if (orderBy === 'price') {
        return order === 'desc'
            ? (a, b) => b.priceLevel.price - a.priceLevel.price
            : (a, b) => a.priceLevel.price - b.priceLevel.price;
    } else if (orderBy === 'productType') {
        return order === 'desc'
            ? (a, b) => descendingComparator(a.productType.name, b.productType.name, orderBy)
            : (a, b) => -descendingComparator(a.productType.name, b.productType.name, orderBy);
    } else {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }
}



export function applyFilter({ inputData, comparator }) {
    const stabilizedThis = inputData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    return inputData;
}