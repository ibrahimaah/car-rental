import { Stack, Typography, Grid } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MAIN_ENDPOINT, { HTTP_SERVER_IMAGES } from '../../../constants';
import { CarType } from '../../admin/Cars';


export default function SectionTwo() {
    const [featuredCars,setFeaturedCars] = useState<CarType[]>([])

    useEffect(() => {
      axios.get(`${MAIN_ENDPOINT}cars/featured`)
      .then(response => setFeaturedCars(response.data.data))
    }, [])

 
  return (
    
        <Stack my={4} spacing={2}>
            <Stack spacing={1}
                    justifyContent="center"
                    alignItems="center"
            >
                <Typography variant="h4" component="h2" sx={{fontWeight:'bold'}}>
                    Featured Vehicles
                </Typography>
                <Typography component='p' color='text.secondary'>
                    We have been working with clients around the world
                </Typography>
            </Stack>

            <Grid container>
                { featuredCars.map(featuredCar => (
                    <Grid item xs={12} md={4}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 200 }}
                            image={`${HTTP_SERVER_IMAGES}${featuredCar.photo}`}
                            title="Car 1"
                        />
                        <CardContent sx={{textAlign:'center'}}>
                            <Typography gutterBottom variant="h5" component="div">
                                { featuredCar.brand }
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                { featuredCar.model}
                            </Typography>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
            </Grid>
        </Stack>        


      
  )
}
