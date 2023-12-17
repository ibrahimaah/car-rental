import { Stack, Typography, Grid, Skeleton } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MAIN_ENDPOINT, { HTTP_SERVER_IMAGES } from '../../../constants';
import { CarType } from '../../admin/Cars';
import TitleAndSubTitle from '../../../components/TitleAndSubTitle';


export default function SectionTwo() {
    const [featuredCars,setFeaturedCars] = useState<CarType[]>([])
    const [skeltonFeatured,setSkeltonFeatured] = useState(true)

    useEffect(() => {
        
      axios.get(`${MAIN_ENDPOINT}cars/featured`)
      .then(response => {
         setFeaturedCars(response.data.data) 
         setSkeltonFeatured(false)
        })

     
    }, [])

 
  return (
    
        <Stack mt={4} spacing={2}>

            <TitleAndSubTitle 
                title='Featured Vehicles'
                subTitle ='We have been working with clients around the world'
            />
           
            <Grid container>
                { featuredCars.map(featuredCar => (
                    <Grid item xs={12} md={4}>

                    { skeltonFeatured ? (
                        <Skeleton animation="wave" variant="rectangular" width='90%' height={240}>
                        </Skeleton>
                    ) : (
                        <Card sx={{ maxWidth: 345,margin:'auto' }}>
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
                    )}
                    
                    </Grid>
                ))}
            </Grid>
        </Stack>        


      
  )
}
