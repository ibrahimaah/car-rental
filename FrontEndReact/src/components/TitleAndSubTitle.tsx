import { Grid, Stack, Typography } from "@mui/material";

type TitleAndSubTitlePropsType = {
    title : string 
    subTitle : string
}
export default function TitleAndSubTitle({title,subTitle}:TitleAndSubTitlePropsType) {
  return (
    <Grid container justifyContent='center' my={2}>
      <Grid item xs={8} md={10} justifyContent='center'>
        <Stack  spacing={1}
                justifyContent="center"
                alignItems="center"
                sx={{textAlign:'center'}}
                my={2}
        >
            <Typography variant="h4" component="h2" sx={{fontWeight:'bold'}}>
                {title}
            </Typography>
            <Typography component='p' color='text.secondary'>
                {subTitle}
            </Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}
