import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SignInFormData } from "./signinInterface";
import { Mui } from "../../theme";
import { validateField } from "../../core/common";
import './signin.css';
import { userRoleContext } from "../../core/common";


const SignIn = () => {
  const role = useContext(userRoleContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

    const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

      const error = validateField(name, value, formData);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSignUpRedirect = (href:string) => {
     navigate(href);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedUser = sessionStorage.getItem("userData");
    if (!storedUser) {
      alert("No registered user found. Please sign up first.");
      return;
    }
  
    try {
      const userData = JSON.parse(storedUser);
      if (userData.email === formData.email && userData.password === formData.password) {
        console.log(role);
        if(role !== 'user'){
          handleSignUpRedirect('/dashboard')
        }else{
          handleSignUpRedirect('/blog')
        }
        
      } else {
        alert("Invalid User");
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  };

  return (
    <>
      <Mui.Container className="signin-layout" component="main" maxWidth="sm" >
        <Mui.Typography component="h1" variant="h4" align="center" gutterBottom>
          Sign In
        </Mui.Typography>
        <Mui.Box component="form" onSubmit={handleSubmit}>
          <Mui.Grid container  direction="column" spacing={2} sx={{ justifyContent: "center" }}>
            <Mui.Grid  size={{ xs: 12, md: 12 }}>
              <Mui.TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                error={Boolean(errors.email)}
                helperText={errors.email}
                onChange={handleChange}
                onBlur={handleChange}
              />
            </Mui.Grid>
            <Mui.Grid  size={{ xs: 12, md: 12 }}>
              <Mui.TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="password"
                value={formData.password}
                error={Boolean(errors.password)}
                helperText={errors.password}
                onChange={handleChange}
                onBlur={handleChange}
                InputProps={{
                  endAdornment: (
                    <Mui.InputAdornment position="end">
                      <Mui.IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <Mui.VisibilityOffOutlinedIcon />
                        ) : (
                          <Mui.VisibilityOutlinedIcon />
                        )}
                      </Mui.IconButton>
                    </Mui.InputAdornment>
                  ),
                }}
              />
            </Mui.Grid>
            <Mui.Grid size={{ xs: 12, md: 12 }}>
              <Mui.Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
              >
                SIGN IN
              </Mui.Button>
            </Mui.Grid>
            <Mui.Grid size={{ xs: 12, md: 12 }}>
              <Mui.Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account?{" "}
                <Mui.Link
                  component="button"
                  variant="body2"
                  onClick={()=>{handleSignUpRedirect('signup')}}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  Sign up
                </Mui.Link>
              </Mui.Typography>
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Box>
      </Mui.Container>   
    </>
  );
}
export default SignIn