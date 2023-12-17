import { Button, Chip, Container, Grid } from "@mui/material"
import { useCars } from "../../contexts/CarContext"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { HTTP_SERVER_IMAGES } from "../../constants";
import { useTheme } from '@mui/material/styles';




export default function AvailableCars() {
  const { carsData , isLoadingCars} = useCars()
  const [expanded, setExpanded] = useState(false);
  
  const theme = useTheme()
  // alert()
  return (
    <Container sx={{marginTop:'16px'}}>
      <Grid container>
        {carsData.map(car => (
          <Grid item xs={12} md={4}>
             <Card sx={{ maxWidth: 345,margin:'auto' }}>
              <CardHeader
                title={car.brand}
                subheader={car.model}
                sx={{color:theme.palette.primary.main}}
              />
              <CardMedia
                component="img"
                height="194"
                image={`${HTTP_SERVER_IMAGES}${car.photo}`}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <Chip label={<><span style={{ fontWeight: 'bold' }}>{car.price}$</span><span>/day</span></>}
                        variant="outlined"
                        color='primary'
                        sx={{fontSize:20,p:2}} />
                </Typography>
                <Button variant="contained" color='primary' sx={{my:2,width:'100%'}}>Rent Now</Button>
              </CardContent>

              
            </Card>
          </Grid>
        ))}
        
      </Grid>
    </Container>
  )
}
