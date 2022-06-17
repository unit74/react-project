import { forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BastAlert({open, setOpen, msg, svt}) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpen(false);
    };

    return (
        <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'} } open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={svt} sx={{ width: '100%' }}>
                {msg}
            </Alert>
        </Snackbar>
    )
}