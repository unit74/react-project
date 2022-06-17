import BaseModal from 'components/baseModal';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { Grid, TextField, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

export default function MyProfile({open, setOpen, formLoading, setFormLoading, data}) {
    const [loading, setLoading] = useState(false);
    const [department, setDepartment] = useState('');
    const [team, setTeam] = useState('');
    const [job, setJob] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [webId, setWebId] = useState('');
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [pwError, setPwError] = useState(false);
    const [pwConfirmError, setPwConfirmError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
            if(data) {
                const job_department_name = sessionStorage.getItem('job_department_name');
                const job_team_name = sessionStorage.getItem('job_team_name');
                setDepartment(job_department_name);
                setTeam(job_team_name);
                setJob(data['job_title']);
                setFirstName(data['first_name']);
                setLastName(data['last_name']);
                setEmail(data['email']);
                setPhone(data['phone']);
                setWebId(data['web_id']);
                setFirstNameError(false);
                setLastNameError(false);
                setEmailError(false);
                setPhoneError(false);
                setPwError(false);
                setPwConfirmError(false);
                setFormLoading(false);
            }
        }
    , [data, setFormLoading])

    const handleSubmit = (event) => {
        event.preventDefault();
        const sendData = new FormData(event.currentTarget);
        
        const firstName = sendData.get('firstName');
        const lastName = sendData.get('lastName');
        const email = sendData.get('email');
        const phone = sendData.get('phone');
        const pw = sendData.get('pw');
        const pwConfirm = sendData.get('pwConfirm');
        const id = sessionStorage.getItem('employee_id');

        setFirstNameError(firstName === '');
        setLastNameError(lastName === '');
        setEmailError(email === '');
        setPhoneError(phone === '');
        setPwError(pw === '');
        setPwConfirmError(pwConfirm === '');

        if(firstName === '' || lastName === '' || email === '' || phone === '' || pw === '' || pwConfirm === '') {
            navigate(location.pathname, { state: { isMsg: true, sendSvt: 'error', sendMsg: '빈칸이 있습니다.' }});
            return;
        }

        if(pw !== pwConfirm) {
            navigate(location.pathname, { state: { isMsg: true, sendSvt: 'error', sendMsg: '변경할 비밀번호를 확인해주세요.' }});
            setPwError(true);
            setPwConfirmError(true);
            return;
        }
        setLoading(true);

        axios.post("http://localhost:8000/set_profile", {
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            pw: pw
        }).then((res) => {
            setLoading(false);
            navigate(location.pathname, { state: { isMsg: true, sendSvt: 'success', sendMsg: '저장되었습니다.' }});
            setOpen(false);
        }).catch((e) => {
            setLoading(false);
            navigate(location.pathname, { state: { isMsg: true, sendSvt: 'error', sendMsg: e.message }});
        });
        
    };

    return (
        <BaseModal open={open} setOpen={setOpen} body={(
            <Grid container component="form" onSubmit={handleSubmit} noValidate spacing={1}>
                <Grid item xs={12} lg={6}>
                    <TextField
                        margin="normal"
                        label="Department"
                        value={department}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        margin="normal"
                        label="Team"
                        value={team}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} lg={12}>
                    <TextField
                        margin="normal"
                        label="Job Title"
                        value={job}
                        fullWidth
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
                        id='firstName'
                        name='firstName'
                        defaultValue={firstName}
                        label="First Name"
                        error={firstNameError}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id='lastName'
                        name='lastName'
                        defaultValue={lastName}
                        label="Last Name"
                        error={lastNameError}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id='email'
                        name='email'
                        defaultValue={email}
                        label="Email"
                        error={emailError}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id='phone'
                        name='phone'
                        defaultValue={phone}
                        label="Phone"
                        error={phoneError}
                    />
                </Grid>
                <Divider style={{ width:'100%' }} sx={{ mt: 2 }}>
                </Divider>
                <Grid item xs={12} lg={12}>
                    <TextField
                        margin="normal"
                        label="WEB Id"
                        value={webId}
                        fullWidth
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
                        id='pw'
                        name='pw'
                        type="password"
                        label="WEB Password to change"
                        error={pwError}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id='pwConfirm'
                        name='pwConfirm'
                        type="password"
                        label="WEB Password to change confirm"
                        error={pwConfirmError}
                    />
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
        )} title="Profile" loading={formLoading}/>
    )
}