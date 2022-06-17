import ListIcon from 'components/listIcon'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

export default function ListItems() {
  const url = sessionStorage.getItem('url');
  const navigate = useNavigate();

  return (
    <>
      <ListIcon Icon={<HomeIcon />} description="메인" onClick={()=>navigate(url)} />
    </>
  )
}