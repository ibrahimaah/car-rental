import { Grid } from "@mui/material";
import TitleAndSubTitle from "../../../components/TitleAndSubTitle";
import OurClientsItem from "../../../components/OurClientsItem";
import avatar1 from '../../../assets/images/avatar/1.jpg'
import avatar2 from '../../../assets/images/avatar/2.jpg'
import avatar3 from '../../../assets/images/avatar/3.jpg'

export default function OurClients() {
  return (
    <>


        <TitleAndSubTitle 
            title='What Our Clients Say'
            subTitle='We have been working with clients around the world'
         /> 


         <Grid container my={3}>
            <Grid item xs={6} md={4}>
                <OurClientsItem  
                    title='Efficient Collaborating' 
                    desc='Outstanding car rental experience. Impressive teamwork and coordination. Effortless process, highly recommended.'
                    client = {{name:'Ann Black',role:'CEO at ABC Corporation',imgSrc:avatar1}}
                />
            </Grid>
            <Grid item xs={6} md={4}>
                <OurClientsItem 
                    title='Intuitive Design' 
                    desc='Exceptional user experience. Intuitively designed for effortless navigation. Highly recommended for a seamless and user-friendly interface.'
                    client = {{name:'Ann Black',role:'CEO at ABC Corporation',imgSrc:avatar2}}
                />
            </Grid>
            <Grid item xs={6} md={4}>
                <OurClientsItem 
                    title='Mindblowing Service' 
                    desc='Mindblowing service that exceeds expectations. Unparalleled attention to detail. A service experience like no other.'
                    client = {{name:'Ann Black',role:'CEO at ABC Corporation',imgSrc:avatar3}}
                />
            </Grid>

         </Grid>
         
    </>
  )
}
