import { Grid, Container, Typography, Paper } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';

export default function Products() {
    const url = sessionStorage.getItem('url');
    const navigate = useNavigate();
    const location = useLocation();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!url)
            navigate("/login", { state: { isMsg: true, sendSvt: 'error', sendMsg: '접근 권한이 없습니다.' }});
        else {
            if(loading) {
                axios.get("http://localhost:8000/get_products")
                .then((res) => {
                    let copy = [...res.data];
                    copy.forEach((e)=> {
                        e.id = e.PRODUCT_ID;
                    })
                    setRows(copy);
                    setLoading(false);
                }).catch((e) => {
                    setLoading(false);
                    navigate(location.pathname, { state: { isMsg: true, sendSvt: 'error', sendMsg: e.message }});
                });
            }
        }
    });
    
    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={{ justifyContent: 'space-between' }}>
                <GridToolbarExport />
            </GridToolbarContainer>
        )
    };

    const columns = [
        { field: 'PRODUCT_ID', flex: 0.3 },
        { field: 'PRODUCT_NAME', flex: 0.5 },
        { field: 'DESCRIPTION', flex: 1 },
        { field: 'STANDARD_COST', flex: 0.3 },
        { field: 'LIST_PRICE', flex: 0.3 },
        { field: 'CATEGORY_ID', flex: 0.3 }
    ];

    return (
        <Container maxWidth="xl" sx={{ my: 10 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                판매 물품
            </Typography>
            <Paper variant="outlined">
                <Grid container>
                    <Grid item xs={12} lg={12} height={665.5}>
                        {loading ? <CircularProgress /> : (
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                disableSelectionOnClick
                                components={{
                                    Toolbar: CustomToolbar
                                }}
                            />
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}