import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import HomeCar from '../../assets/images/ford.webp'
import SectionTwo from "./Home/SectionTwo";
export default function Home() {
  const theme = useTheme();
  
 

  return (
    <Box>
      <Grid container>
        
        <Grid item xs={12} md={6}>

          <Stack 
            spacing={2}
            justifyContent="center"
            alignItems="center"
            p={6}
            sx={{ height:`calc(100dvh - ${theme.mixins.toolbar.minHeight}px)`}}>

                <Typography variant="h3" component="h2">
                    <Typography variant="h3" component="span" color='primary'>Rent a car </Typography>
                    and find great deals with us
                </Typography>
                <Typography component="p" color='secondary'>
                  Choose from a collection of brand new cars, low prices are part of our every day offer. 
                </Typography>
                <Button variant="contained">Book online now !!</Button>
                 
          </Stack>

        </Grid>

        <Grid item xs={12} md={6}>
            <Stack 
                bgcolor='primary.light' 
                justifyContent='center'
                alignItems='center'
                sx={{ height:`calc(100dvh - ${theme.mixins.toolbar.minHeight}px)`,
                      width:'520px',
                      margin:'auto',
                      position:'relative',
                    }}>
              
                <Box
                  component="img"
                  sx={{
                    width: '600px',
                    position:'absolute'
                  }}
                  alt="The house from the offer."
                  src={HomeCar}
                />
              
            </Stack>
        </Grid>
      </Grid>

                
      
      <Container>
        <SectionTwo/>
      </Container>
    </Box>
  )
}
