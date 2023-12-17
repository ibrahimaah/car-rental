import { Link } from "react-router-dom";
import { Link as MuiLink } from '@mui/material';

interface NavLinkProps {
    destination: string,
    pageName: string
}
export default function NavBarLink({destination,pageName}: NavLinkProps) {
  return (
    <MuiLink 
        component={Link} 
        to={destination} 
        sx={{textDecoration:'none',color:'secondary.light'}}>
        {pageName}
    </MuiLink>
  )
}
