import { Box, Typography ,Divider, useTheme} from "@mui/material";

function Header({title}) {
    const theme = useTheme();
  return <Box sx={{width:"50%",display:"flex",flexDirection:"column",alignItems:"center",color:theme.palette.teal.main,mb:"20px"}}> 
      <Typography variant="h4" color="inherit" fontWeight="bold" >{title}</Typography>
      <Divider sx={{borderBottomWidth: '6px',width:"100%",borderColor:"inherit",mt:3}}/>
  </Box>;
}

export default Header;
