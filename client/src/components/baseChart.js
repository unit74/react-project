import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function baseChart({chartTitle, loading, data, description}) {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
    };
    
    return ( 
        <Card>
            <CardHeader title={chartTitle}  />
            <Divider />

            <CardContent>
                <Box
                    sx={{
                        height: 300,
                        position: 'relative'
                    }}
                >
                    {loading ? (<CircularProgress />) : (
                        <Doughnut
                            data={data}
                            options={options}
                        />
                    )}
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                >
                    {description.map(({
                        color,
                        title,
                        value
                    }) => (
                        <Box
                            key={title}
                            sx={{
                                p: 1,
                                textAlign: 'center'
                            }}
                        >
                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                {title}
                            </Typography>
                            <Typography
                                style={{ color }}
                                variant="h4"
                            >
                                {value}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}