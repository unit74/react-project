import BaseModal from 'components/baseModal';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';

export default function RemoveWeb({open, setOpen, data}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const yes = () => {
        setLoading(true);

        axios.post("http://localhost:8000/delete_choose_web_informations", {
            employeeId: data && data.get('id')
        }).then((res) => {
            setLoading(false);
            navigate(location.pathname, { state: { isMsg: true, sendSvt: 'success', sendMsg: '삭제되었습니다.', refresh: true }});
            setOpen(false);
        }).catch((e) => {
            setLoading(false);
            navigate(location.pathname, { state: { isMsg: true, sendSvt: 'error', sendMsg: e.message }});
        });
    };


    return (
        <BaseModal open={open} setOpen={setOpen} body={(
            <Grid item xs={12} lg={12} textAlign="right">
                <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loading}
                    loadingPosition="end"
                    endIcon={<DeleteIcon />}
                    onClick={yes}
                >
                    네, 삭제하겠습니다.
                </LoadingButton>
            </Grid>
        )} title={`${data && data.get('id')}번 직원의 웹 정보를 삭제하시겠습니까?`}/>
    )
}