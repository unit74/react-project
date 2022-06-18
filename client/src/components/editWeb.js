import BaseModal from 'components/baseModal';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { Grid, TextField, Divider, Select, InputLabel, MenuItem, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

export default function EditWeb({open, setOpen, formLoading, setFormLoading, data}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const [employeeId, setEmployeeId] = useState('');
    const [webId, setWebId] = useState('');
    const [webPw, setWebPw] = useState('');
    const [webAuthority, setWebAuthority] = useState('');

    const [webIdError, setWebIdError] = useState(false);
    const [webPwError, setWebPwError] = useState(false);

    useEffect(() => {
        if(data) {
            setEmployeeId(data.get('EMPLOYEE_ID'));
            setWebId(data.get('WEB_ID'));
            setWebPw(data.get('WEB_PW'));
            setWebAuthority(data.get('WEB_AUTHORITY'));

            setWebIdError(false);
            setWebPwError(false);

            setFormLoading(false);
        }
    }, [data, setFormLoading]);
    

    const handleSubmit = (event) => {
        event.preventDefault();
        const sendData = new FormData(event.currentTarget);
        
        const webId = sendData.get('webId');
        const webPw = sendData.get('webPw');
        
        setWebIdError(webId === '');
        setWebPwError(webPw === '');

        if(webId === '' || webPw === '') {
            navigate(location.pathname, { state: { isMsg: true, sendSvt: 'error', sendMsg: '빈칸이 있습니다.' }});
            return;
        }
        
        setLoading(true);

        axios.post("http://localhost:8000/set_choose_web_informations", {
            employeeId: employeeId,
            webId: webId,
            webPw: webPw,
            webAuthority: webAuthority
        }).then((res) => {
            setLoading(false);
            navigate(location.pathname, { state: res.data.state });
            if(!res.data.complete)
                return;
            setOpen(false);
        }).catch((e) => {
            setLoading(false);
            navigate(location.pathname, { state: { isMsg: true, sendSvt: 'error', sendMsg: e.message }});
        });
    };

    return (
        <BaseModal open={open} setOpen={setOpen} body={(
            <Grid container component="form" onSubmit={handleSubmit} noValidate spacing={1}>
                <Grid item xs={12} lg={12}>
                    <TextField
                        margin="normal"
                        fullWidth
                        value={employeeId}
                        label="Employee Id"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id='webId'
                        name='webId'
                        defaultValue={webId}
                        label="WEB Id"
                        error={webIdError}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id='webPw'
                        name='webPw'
                        defaultValue={webPw}
                        label="WEB Pw"
                        error={webPwError}
                    />
                </Grid>
                <Grid item xs={12} lg={12}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>WEB Authority *</InputLabel>
                        <Select
                            value={webAuthority}
                            label="WEB Authority *"
                            onChange={(event) => {setWebAuthority(event.target.value)}}
                        >
                            <MenuItem value={"Approved"}>Approved</MenuItem>
                            <MenuItem value={"Denied"}>Denied</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Divider style={{ width:'100%' }} sx={{ my: 2 }}/>
                <Grid item xs={12} lg={12} textAlign="right">
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={loading}
                        loadingPosition="end"
                        endIcon={<SaveIcon />}
                    >
                        Save
                    </LoadingButton>
                </Grid>
            </Grid>
        )} title="Edit Web" loading={formLoading}/>
    )
}