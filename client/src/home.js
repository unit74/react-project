import { Navigate } from 'react-router-dom';

export default function Home() {
    const url = sessionStorage.getItem('url');
    if(!url)
        return <Navigate to="/login" replace />;
    
    return <Navigate to={url} replace />;
}