import React from 'react'
import { AppBar, Typography, styled ,Container } from '@mui/material';
const Header = () => {
    const StyledAppBar = styled(AppBar)({
      boxShadow: 'none',
    });
  
    return (
      <div>
        <StyledAppBar color='primary' position="static">
          <Container>
            <Typography 
            variant='h3' 
            color='secondary'
            py={2}
            sx={{
                fontSize: {
                    md: 50,
                    sm: 40,
                    xs: 30
                },
            }}
            >Note Taking App</Typography>
          </Container>
        </StyledAppBar>
      </div>
    );
  };

export default Header