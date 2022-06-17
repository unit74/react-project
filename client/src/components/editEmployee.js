import BaseModal from 'components/baseModal';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { Grid, TextField, Divider, Select, InputLabel, MenuItem, FormControl } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

export default function EditEmployee({open, setOpen, formLoading, setFormLoading, data}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const [managerIdMenu, setManagerIdMenu] = useState(null);
    const [jobTeamIdMenu, setJobTeamIdMenu] = useState(null);

    const [employeeId, setEmployeeId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [managerId, setManagerId] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobTeamId, setJobTeamId] = useState('');

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [jobTitleError, setJobTitleError] = useState(false);
    const [jobTeamIdError, setJobTeamIdError] = useState(false);

    useEffect(() => {
        if(data) {
            setManagerIdMenu(data.get('MANAGER_ID_MENU'));
            setJobTeamIdMenu(data.get('JOB_TEAM_ID_MENU'));

            setEmployeeId(data.get('EMPLOYEE_ID'));
            setFirstName(data.get('FIRST_NAME'));
            setLastName(data.get('LAST_NAME'));
            setEmail(data.get('EMAIL'));
            setPhone(data.get('PHONE'));
            setHireDate(data.get('HIRE_DATE'));
            setManagerId(data.get('MANAGER_ID') || '');
            setJobTitle(data.get('JOB_TITLE'));
            setJobTeamId(data.get('JOB_TEAM_ID'));

            setFirstNameError(false);
            setLastNameError(false);
            setEmailError(false);
            setPhoneError(false);
            setJobTitleError(false);
            setJobTeamIdError(false);

            setFormLoading(false);
        }
    }, [data, setFormLoading]);
    
    const handleManagerChange = (event) => {
        setManagerId(event.target.value);
        if(event.target.value === '')
            return;
        setJobTeamId('');

        axios.get("http://localhost:8000/get_job_team_id", {
            params: {
                managerId: event.target.value
            }
        })
        .then((res) => {
            const map = new Map();
            Object.entries(res.data).forEach((e) => {
                map.set(e[0], e[1]);
            })

            setJobTeamIdMenu(map.get('JOB_TEAM_ID_MENU'));
        }).catch((e) => {
            navigate(location.pathname, { state: { isMsg: true, sendSvt: 'error', sendMsg: e.message }});
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const sendData = new FormData(event.currentTarget);
        
        const firstName = sendData.get('firstName');
        const lastName = sendData.get('lastName');
        const email = sendData.get('email');
        const phone = sendData.get('phone');
        const jobTitle = sendData.get('jobTitle');
        
        setFirstNameError(firstName === '');
        setLastNameError(lastName === '');
        setEmailError(email === '');
        setPhoneError(phone === '');
        setJobTitleError(jobTitle === '');
        setJobTeamIdError(jobTeamId === '')

        if(firstName === '' || lastName === '' || email === '' || phone === '' || jobTitle === '' || jobTeamId === '') {
            navigate(location.pathname, { state: { isMsg: true, sendSvt: 'error', sendMsg: '빈칸이 있습니다.' }});
            return;
        }
        
        setLoading(true);

        axios.post("http://localhost:8000/set_choose_employee", {
            employeeId: employeeId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            hireDate: hireDate,
            managerId: managerId,
            jobTitle: jobTitle,
            jobTeamId: jobTeamId
        }).then((res) => {
            setLoading(false);
            setOpen(false);
            navigate(location.pathname, { state: { isMsg: true, sendSvt: 'success', sendMsg: '추가되었습니다.', refresh: true }});
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
                        label="Employee Id"
                        value={employeeId}
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
                <Grid item xs={12} lg={6}>
                    <TextField
                        margin="normal"
                        label="Hire Date"
                        value={hireDate}
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Manager Id</InputLabel>
                        <Select
                            value={managerId}
                            label="Manager Id"
                            onChange={handleManagerChange}
                        >
                            <MenuItem value="">none</MenuItem>
                            {managerIdMenu && managerIdMenu.map((e) => {
                                return (<MenuItem key={e.EMPLOYEE_ID} value={e.EMPLOYEE_ID}>{e.EMPLOYEE_ID}</MenuItem>)
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id='jobTitle'
                        name='jobTitle'
                        defaultValue={jobTitle}
                        label="Job Title"
                        error={jobTitleError}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <FormControl fullWidth margin="normal" error={jobTeamIdError}>
                        <InputLabel>Job Team Id *</InputLabel>
                        <Select
                            value={jobTeamId}
                            label="Job Team Id *"
                            onChange={(event) => {setJobTeamId(event.target.value)}}
                        >
                            {jobTeamIdMenu && jobTeamIdMenu.map((e) => {
                                return (<MenuItem key={e.JOB_TEAM_ID} value={e.JOB_TEAM_ID}>{e.JOB_TEAM_ID}</MenuItem>)
                            })}
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
        )} title="Edit Employee" loading={formLoading}/>
    )
}