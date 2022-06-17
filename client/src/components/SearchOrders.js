import BaseModal from 'components/baseModal';
import { DataGrid } from '@mui/x-data-grid';

import { Grid } from '@mui/material';

export default function EditEmployee({open, setOpen, formLoading, data}) {
    const columns = [
        { field: 'ORDER_ID', flex: 1 },
        { field: 'CUSTOMER_ID', flex: 1 },
        { field: 'STATUS', flex: 1 },
        { field: 'SALESMAN_ID', flex: 1 },
        { field: 'ORDER_DATE', flex: 1 },
        { field: 'ITEM_ID', flex: 1 },
        { field: 'PRODUCT_ID', flex: 1 },
        { field: 'QUANTITY', flex: 1 },
        { field: 'UNIT_PRICE', flex: 1 },
    ];

    return (
        <BaseModal open={open} setOpen={setOpen} body={(
            <Grid container maxWidth="xl" spacing={1}>
                <Grid item xs={12} lg={12} height={638.5}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                    />
                </Grid>
            </Grid>
        )} title={data && `${data[0].CUSTOMER_ID}번 고객의 주문 내역`} loading={formLoading} width={1300}/>
    )
}