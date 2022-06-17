import BadgeIcon from '@mui/icons-material/Badge';
import ListIcon from 'components/listIcon'
import HomeIcon from '@mui/icons-material/Home';
import WebIcon from '@mui/icons-material/Web';
import { useNavigate } from 'react-router-dom';

export default function ListItems() {
  const team = sessionStorage.getItem('job_team_name');
  const url = sessionStorage.getItem('url');
  const navigate = useNavigate();

  return (
    <>
      <ListIcon Icon={<HomeIcon />} description="메인" onClick={()=>navigate(url)} />
      {(team === 'Manager' || team === 'Personnel') && (
        <>
          <ListIcon Icon={<BadgeIcon />} description="직원 관리" onClick={()=>navigate(url + "/employees")} />
          <ListIcon Icon={<WebIcon />} description="웹 관리" onClick={()=>navigate(url + "/web")} />
        </>
      )}
    </>
  )
}