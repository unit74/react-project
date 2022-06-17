import ListIcon from 'components/listIcon'
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate } from 'react-router-dom';

export default function ListItems() {
  const team = sessionStorage.getItem('job_team_name');
  const url = sessionStorage.getItem('url');
  const navigate = useNavigate();

  return (
    <>
      <ListIcon Icon={<HomeIcon />} description="메인" onClick={()=>navigate(url)} />
      <ListIcon Icon={<ShoppingCartIcon />} description="판매 물품" onClick={()=>navigate(url + "/products")} />
      {(team === 'Manager' || team === 'Stock') && (
        <ListIcon Icon={<InventoryIcon />} description="재고" onClick={()=>navigate(url + "/stocks")} />
      )}
      {(team === 'Manager' || team === 'Sale') && (
        <ListIcon Icon={<BusinessIcon />} description="고객 정보" onClick={()=>navigate(url + "/customers")} />
      )}
    </>
  )
}