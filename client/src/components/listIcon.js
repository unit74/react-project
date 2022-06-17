import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function ListIcon({Icon, description, onClick}) {
    return (
        <ListItemButton onClick={onClick}>
            <ListItemIcon>
                {Icon}
            </ListItemIcon>
            <ListItemText primary={description} />
        </ListItemButton>
    )
}