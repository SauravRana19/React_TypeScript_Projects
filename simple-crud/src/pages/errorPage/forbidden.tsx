import { Box, Typography, Button, Container, Paper, useTheme } from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{mt: 6}}>
        <Box sx={{ color: theme.palette.error.main, mb: 2 }}>
          <LockIcon sx={{ fontSize: 80 }} />
        </Box>
        
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            color: theme.palette.text.primary
          }}
        >
          403 - Forbidden
        </Typography>
        
        <Typography 
          variant="h6" 
          component="p" 
          gutterBottom
          sx={{ 
            mb: 3,
            color: theme.palette.text.secondary
          }}
        >
          You don't have permission to access this page.
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 4,
            color: theme.palette.text.secondary
          }}
        >
          Please contact your administrator if you believe this is an error.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={() => navigate(-1)}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: theme.shape.borderRadius
            }}
          >
            Go Back
          </Button>
        </Box>
        
        <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} DashBoard Inc. All rights reserved.
          </Typography>
        </Box>
    </Container>
  );
};

export default Forbidden;