import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import AppStoreIcon from '../assets/images/appstore.png'
import GooglePlayStoreIcon from '../assets/images/playstore.png'
import Divider from '@mui/material/Divider';

export default function Footer() {
  return (
    <Container>
        <Grid container justifyContent='center'>
            <Grid item xs={6} md={3}>
                <Stack spacing={2} alignItems='center' my={4}>
                    <Typography fontSize={18} fontWeight='fontWeightMedium'>About LOCAVO</Typography>
                    <Typography color='secondary.light' sx={{textAlign:'balance'}}>
                        a wide selection of vehicles,competitive prices to make your experience enjoyable.
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={6} md={3}>
                <Stack spacing={2} alignItems='center' my={4}>
                    <Typography fontSize={18} fontWeight='fontWeightMedium'>Company</Typography>
                    <Typography color='secondary.light'>
                        Blog
                    </Typography>
                    <Typography color='secondary.light'>
                        About Us
                    </Typography>
                    <Typography color='secondary.light'>
                        Contact Us
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={6} md={3}>
                <Stack spacing={2} alignItems='center' my={4}>
                    <Typography fontSize={18} fontWeight='fontWeightMedium'>Legal</Typography>
                    <Typography color='secondary.light'>
                        Cookies Policy
                    </Typography>
                    <Typography color='secondary.light'>
                        Privacy Policy
                    </Typography>
                    <Typography color='secondary.light'>
                        Terms of Service
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={6} md={3}>
                <Stack spacing={2} alignItems='center' my={4}>
                    <Typography fontSize={18} fontWeight='fontWeightMedium'>Install App</Typography>
                    <Box component="img" src={AppStoreIcon} sx={{ width: '80%'}}/>
                    <Box component="img" src={GooglePlayStoreIcon} sx={{ width: '80%'}}/>
              
                </Stack>
            </Grid>
        </Grid>
        <Divider></Divider>
        <Typography textAlign='center' color='secondary.light' mt={2} pb={2}>&copy; Copyright. All rights reserved.</Typography>
    </Container>
  )
}
