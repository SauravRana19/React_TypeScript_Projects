import { Lock as LockIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Mui, theme } from '../../theme';


const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <Mui.Container maxWidth="md" sx={{mt: 6}}>
        <Mui.Box sx={{ color: theme.palette.error.main, mb: 2 }}>
          <LockIcon sx={{ fontSize: 80 }} />
        </Mui.Box>   
        <Mui.Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          color="text.primary"
          sx={{ 
            fontWeight: 700,
          }}
        >
          403 - Forbidden
        </Mui.Typography>
        
        <Mui.Typography 
          variant="h6" 
          component="p" 
          gutterBottom
          color="text.primary"
          sx={{ 
            mb: 3,
          }}
        >
          You don't have permission to access this page.
        </Mui.Typography>
        
        <Mui.Typography 
          variant="body1"
          color="text.secondary" 
          sx={{ 
            mb: 4,
          }}
        >
          Please contact your administrator if you believe this is an error.
        </Mui.Typography>
        
        <Mui.Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Mui.Button 
            variant="contained" 
            onClick={() => navigate(-1)}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: theme.shape.borderRadius
            }}
          >
            Go Back
          </Mui.Button>
        </Mui.Box>
        
        <Mui.Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Mui.Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} DashBoard Inc. All rights reserved.
          </Mui.Typography>
        </Mui.Box>
    </Mui.Container>
  );
};

export default Forbidden;