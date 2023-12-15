import { Avatar, Stack, Typography } from "@mui/material";
import OurClientsItemTop from "./OurClientsItemTop";

type ClientType = {
  name : string 
  role : string 
  imgSrc : string 
}

export type OurClientsItemPropsType = {
    title : string
    desc : string
    client?: ClientType
}
export default function OurClientsItem({title,desc,client}:OurClientsItemPropsType) {
  return (
    <Stack spacing={2}>
        <OurClientsItemTop title={title} desc={desc} />

        <Stack alignItems='center'>
          <Avatar alt={client?.name} src={client?.imgSrc}/>
          <Typography fontWeight='bold'>{client?.name}</Typography>
          <Typography color='secondary.light'>{client?.role}</Typography>
        </Stack>
    </Stack>
  )
}
