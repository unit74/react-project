import { Grid, Container, Typography, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EditWeb from 'components/editWeb';
import RemoveWeb from 'components/removeWeb';
import AddWeb from 'components/addWeb';
import axios from 'axios';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';

export default function Web() {
    const team = sessionStorage.getItem('job_team_name');
    const url = sessionStorage.getItem('url');
    const employeeId = sessionStorage.getItem('employee_id');
    const navigate = useNavigate();
    const location = useLocation();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [remove, setRemove] = useState(false);
    const [add, setAdd] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [data, setData] = useState(null);
    const { refresh } = location.state || {};
    
    useEffect(() => {
        if(!url)
            navigate("/login", { state: { isMsg: true, sendSvt: 'error', sendMsg: '접근 권한이 없습니다.' }});
        else if(team !== 'Manager' && team !== 'Personnel')
            navigate(url, { state: { isMsg: true, sendSvt: 'error', sendMsg: '접근 권한이 없습니다.' }});
        else {
            if(loading || refresh) {
                axios.get("http://localhost:8000/get_web_informations", {
                    params: {
                        employeeId: employeeId
                    }
                })
                .then((res) => {
                    let copy = [...res.data];
                    copy.forEach((e)=> {
                        e.id = e.EMPLOYEE_ID;
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
                <Add />
            </GridToolbarContainer>
        )
    }
    
    function Add() {
        const handleAdd = () => {
            setAddLoading(true);

            axios.get("http://localhost:8000/get_web_id")
            .then((res) => {
                if(res.data.WEB_EMPLOYEE_ID.length === 0) {
                    setAddLoading(false);
                    navigate(location.pathname, { state: { isMsg: true, sendSvt: 'error', sendMsg: "웹에 추가할 직원이 없습니다." }});
                    return;
                }
                const map = new Map();
                map.set('WEB_EMPLOYEE_ID', res.data.WEB_EMPLOYEE_ID);
                
                setData(map);
                setAddLoading(false);
                setAdd(true);
            }).catch((e) => {
                setAddLoading(false);
                navigate(location.pathname, { state: { isMsg: true, sendSvt: 'error', sendMsg: e.message }});
            });
        };
    
        return (
            <LoadingButton
                size="small"
                startIcon={<AddIcon />}
                loading={addLoading}
                loadingPosition="start"
                onClick={handleAdd}
            >
                Add
            </LoadingButton>
        )
    }
    
    const editWeb = useCallback(
        (id) => () => {
            setData(null);
            setEditLoading(true);
            setEdit(true);

            axios.get("http://localhost:8000/get_choose_web_informations", {
                params: {
                    employeeId: id
                }
            })
            .then((res) => {
                const map = new Map();
                Object.entries(res.data[0]).forEach((e) => {
                    map.set(e[0], e[1]);
                })

                setData(map);
            }).catch((e) => {
                setEditLoading(false);
                navigate(location.pathname, { state: { isMsg: true, sendSvt: 'error', sendMsg: e.message }});
            });
        }
        ,[location, navigate]
    );

    const removeWeb = useCallback(
        (id) => () => {
            const map = new Map();
            map.set('id', id);
            setData(map);
            setRemove(true);
        }
        ,[]
    );

    const columns = [
        { field: 'EMPLOYEE_ID', flex: 1 },
        { field: 'WEB_ID', flex: 1 },
        { field: 'WEB_PW', flex: 1 },
        { field: 'WEB_AUTHORITY', flex: 1 },
        {
            field: 'actions',
            type: 'actions',
            flex: 0.3,
            getActions: (params) => [
                <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={editWeb(params.id)} />,
                <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={removeWeb(params.id)}/>,
            ],
        },
    ];

    return (
        <Container maxWidth="xl" sx={{ my: 10 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                웹 관리
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
            <EditWeb open={edit} setOpen={setEdit} formLoading={editLoading} setFormLoading={setEditLoading} data={data}/>
            <RemoveWeb open={remove} setOpen={setRemove} data={data} />
            <AddWeb open={add} setOpen={setAdd} formLoading={addLoading} setFormLoading={setAddLoading} data={data} />
        </Container>
    )
}