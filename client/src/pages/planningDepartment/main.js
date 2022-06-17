import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import EmployeesChart from 'components/employeesChart';
import EmployeeRestChart from 'components/employeesRestChart';
import ProductsChart from 'components/productsChart';
import RepurchaseChart from 'components/repurchaseChart';

export default function Main() {  
    return (
        <Container maxWidth="xl" sx={{ my: 10 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                메인
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={6} md={6} xl={3}>
                    <EmployeesChart />
                </Grid>
                <Grid item xs={12} lg={6} md={6} xl={3}>
                    <EmployeeRestChart />
                </Grid>
                <Grid item xs={12} lg={6} md={6} xl={3}>
                    <ProductsChart />
                </Grid>
                <Grid item xs={12} lg={6} md={6} xl={3}>
                    <RepurchaseChart />
                </Grid>
            </Grid>
        </Container>
    )
}