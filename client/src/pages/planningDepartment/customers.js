import { Grid, Container, Typography, Paper } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import SearchOrders from 'components/SearchOrders';

import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';

export default function Customers() {
    const team = sessionStorage.getItem('job_team_name');
    const url = sessionStorage.getItem('url');
    const navigate = useNavigate();
    const location = useLocation();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        if(!url)
            navigate("/login", { state: { isMsg: true, sendSvt: 'error', sendMsg: '접근 권한이 없습니다.' }});
        else if(team !== 'Manager' && team !== 'Sale')
            navigate(url, { state: { isMsg: true, sendSvt: 'error', sendMsg: '접근 권한이 없습니다.'}})
        else {
            if(loading) {
                axios.get("http://localhost:8000/get_customers")
                .then((res) => {
                    let copy = [...res.data];
                    copy.forEach((e)=> {
                        e.id = e.CUSTOMER_ID;
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

    const orders = useCallback(
        (id) => () => {
            setData(null);
            axios.get("http://localhost:8000/get_orders",{
                params: {
                    customerId: id
                }
            })
            .then((res) => {
                if(res.data.length === 0) {
                    navigate(location.pathname, { state: { isMsg: true, sendSvt: 'error', sendMsg: '해당 고객의 주문 내역이 없습니다.' }});
                    return;
                }
                setSearch(true);
                setSearchLoading(true);
                let copy = [...res.data];
                copy.forEach((e)=> {
                    e.id = e.ORDER_ID.toString() + " " + e.ITEM_ID.toString();
                })
                setData(copy);
                setSearchLoading(false);
            }).catch((e) => {
                navigate(location.pathname, { state: { isMsg: true, sendSvt: 'error', sendMsg: e.message }});
            });
        }
        ,[location, navigate]
    );


    const columns = [
        { field: 'CUSTOMER_ID', flex: 0.5 },
        { field: 'NAME', flex: 0.8 },
        { field: 'ADDRESS', flex: 1 },
        { field: 'WEBSITE', flex: 0.8 },
        { field: 'CREDIT_LIMIT', flex: 0.5 },
        {
            field: 'actions',
            type: 'actions',
            flex: 0.1,
            getActions: (params) => [
                <GridActionsCellItem icon={<SearchIcon />} label="Search" onClick={orders(params.id)} />
            ],
        },
    ];

    return (
        <Container maxWidth="xl" sx={{ my: 10 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                고객 정보
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
            <SearchOrders open={search} setOpen={setSearch} formLoading={searchLoading} setFormLoading={setSearchLoading} data={data}/>
        </Container>
    )
}