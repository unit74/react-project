import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginIcon from '@mui/icons-material/Login';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BaseAlert from 'components/baseAlert';

export default function Login() {
    const [idError, setIdError] = useState(false);
    const [pwError, setPwError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { isMsg, sendSvt, sendMsg } = location.state ? location.state : {};

    useEffect(() => {
        if(isMsg) {
            handleSnackbar(sendSvt, sendMsg);
            navigate(location.pathname, {});
        }
        const url = sessionStorage.getItem('url');
        if(url)
            navigate(url, { state: { isMsg: true, sendSvt: 'error', sendMsg: '로그아웃 후 이용해주세요.' }});
    });

    function handleSnackbar(svt, msg) {
        setSeverity(svt);
        setMessage(msg);
        setOpen(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const sendData = new FormData(event.currentTarget);
        const inputId = sendData.get('id');
        const inputPw = sendData.get('pw');

        setIdError(inputId === "");
        setPwError(inputPw === "");

        if(inputId === "" || inputPw === "") {
            handleSnackbar('error','빈칸이 있습니다.');
            return;
        }

        setLoading(true);

        axios.post("http://localhost:8000/login", {
            id: inputId,
            pw: inputPw
        }).then((res) => {
            const map = new Map();
            res.data.forEach((getData) => {
                map.set(getData.name, getData.value);
            });

            if(map.get('authority')) {
                sessionStorage.clear();
                map.forEach((value, key) => {
                    sessionStorage.setItem(key, value);
                });

                const job_department_name = map.get('job_department_name');
                const url = `/${job_department_name.replaceAll(' ','_').toLowerCase()}`;
                sessionStorage.setItem('url', url);
                setLoading(false);
                navigate(url, { state: { isMsg: true, sendSvt: 'success', sendMsg: '로그인 되었습니다.' }});
            }
            else {
                setLoading(false);
                setIdError(true);
                setPwError(true);
                handleSnackbar('error',map.get('msg'));
            }
        }).catch((e) => {
            setLoading(false);
            handleSnackbar('error',e.message);
        });
    };

    return (
        <Container componet="main" maxWidth="xs" >
            <Paper variant="outlined" sx={{ boxShadow: 1, my: 33, p: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        OT Company 로그인
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt:1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id='id'
                            name='id'
                            label="Employee ID"
                            autoFocus
                            error={idError}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id='pw'
                            name='pw'
                            label="Employee PW"
                            type="password"
                            error={pwError}
                        />
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt:3, mb:2}}
                            loading={loading}
                            loadingPosition="end"
                            endIcon={<LoginIcon />}
                        >
                            Login
                        </LoadingButton>
                    </Box>
                </Box>
            </Paper>
            <BaseAlert open={open} setOpen={setOpen} svt={severity} msg={message} />
        </Container>
    )
}