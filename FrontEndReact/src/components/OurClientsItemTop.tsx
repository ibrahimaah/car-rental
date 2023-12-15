import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { OurClientsItemPropsType } from './OurClientsItem';

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    // height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
  }));


export default function OurClientsItemTop({title,desc}:OurClientsItemPropsType) {
  return (
    <DemoPaper variant="elevation" elevation={3}>
        <Stack>
            <Typography fontWeight='bold' mb={1}>{title}</Typography>
            <Typography color='secondary.light' sx={{textWrap:'balance'}}>{desc}</Typography>
        </Stack>
    </DemoPaper>
   
  )
}
