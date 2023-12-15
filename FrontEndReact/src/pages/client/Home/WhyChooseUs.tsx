import { Grid, Stack } from "@mui/material";
import TitleAndSubTitle from "../../../components/TitleAndSubTitle";
import WhyChooseUsItem from "../../../components/WhyChooseUsItem";
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import SecurityIcon from '@mui/icons-material/Security';

export default function WhyChooseUs() {
  return (
    <>
      <Stack mt={4} spacing={2}>
       
        <TitleAndSubTitle 
          title='Why Choose Us'
          subTitle ='Experience hassle-free car rentals with exceptional service and a wide selection of vehicles'
        />
          
        <Grid container spacing={4} justifyContent='center'>
          <WhyChooseUsItem 
            icon={DirectionsCarFilledOutlinedIcon} 
            title='Wide Selection of cars'
            desc = 'We offer a diverse range of cars to suit your needs and preferences. Whether you are looking for a compact car for city driving or a spacious SUV for a family trip, we have a wide selection of vehicles to choose from.' />
          <WhyChooseUsItem
            icon={PaidIcon} 
            title='Competitive Prices'
            desc = 'We provide competitive prices that fit your budget. Our transparent pricing ensures that you get the best value for your money without compromising on quality or service.'
          />
          <WhyChooseUsItem
            icon={CalendarMonthIcon} 
            title='Easy Booking Process'
            desc = 'Our user-friendly online booking system makes it quick and convenient to reserve your desired car. With just a few clicks, you can easily select your pickup location, choose your preferred car, and book it for your desired dates.'
          />
          <WhyChooseUsItem
            icon={SecurityIcon} 
            title='Trust and Reliability'
            desc = 'With years of experience in the car rental industry, we have established a reputation for trust and reliability. You can rely on us to provide quality vehicles, excellent service, and a seamless rental experience.'
          />
        </Grid>
      </Stack>
    </>
  )
}
