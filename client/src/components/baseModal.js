import { Modal, Card, CardContent, Divider, IconButton, CardHeader } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

export default function BaseModal({open, setOpen, body, title, loading, width = 800}) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: width,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={()=>setOpen(false)}
            aria-labelledby="base-modal"
            aria-describedby="base-modal"
        >
            <Card sx={style}>
                {loading ? (<CircularProgress />) : (
                    <>
                        <CardHeader
                            title={title}
                            action={
                                <IconButton onClick={()=>setOpen(false)} color="inherit">
                                    <CloseIcon />
                                </IconButton>
                            }
                        />
                        <Divider />
                        <CardContent>
                            {body}
                        </CardContent>
                    </>
                )}
            </Card>
        </Modal>
    )
}