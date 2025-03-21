import  { useRef, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function DynamicWidthTextField({content,label}) {
  const [width, setWidth] = useState(0);
  const spanRef = useRef(null);

  useEffect(() => {
    if (spanRef.current) {
      setWidth(spanRef.current.offsetWidth + 16); // Adding some padding
    }
  }, []);

  return (
    <Box position="relative">
      <span
        ref={spanRef}
        style={{
          visibility: 'hidden',
          whiteSpace: 'pre', // Preserve spaces for more accurate width
          position: 'absolute',
          fontSize: '16px', // Should match the TextField font size
        }}
      >
        {content}
      </span>
      <TextField
        label={label}
        defaultValue={content}
        variant="standard"
        slotProps={{
            input: {
              readOnly: true,
            },
          }}
        sx={{
          width: `${width}px`,
          minWidth:"100px",
          mb:"18px"
        }}
      />
    </Box>
  );
}

export default DynamicWidthTextField;
