import { Button, useTheme } from '@mui/material';
import React from 'react';

function SignWithButton({ content, Icon ,color,handleOnClick}) { 
  const theme = useTheme();
  return (
    <Button
      variant="outlined"
      sx={{ 
        fontWeight: 'bold',
        color: theme.palette.teal.main ,
        borderColor:theme.palette.teal.main ,
        mb: '8px',
        textTransform: 'none'
      }}
      startIcon={<Icon sx={{color:color}} />} 
      onClick={handleOnClick}
    >
      {content}
    </Button>
  );
}

export default SignWithButton;
