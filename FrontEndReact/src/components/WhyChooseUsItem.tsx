import { Box, Grid, Stack, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";


type WhyChooseUsPropsType = {
    icon : OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; } 
    title : string 
    desc : string
}

export default function WhyChooseUsItem({icon,title,desc}:WhyChooseUsPropsType) {

  const Icon = icon
  return (
    <Grid item xs={8} md={6}>
        <Stack direction='row' gap={1}>
            <Box>
                <Icon color='primary' fontSize="large"/>
            </Box>
            <Box>
                <Typography fontSize={20} mb={1}>{title}</Typography>
                <Typography color='secondary.light' sx={{textWrap:'balance'}}>{desc}</Typography>
            </Box>
        </Stack>
    </Grid>
  )
}
