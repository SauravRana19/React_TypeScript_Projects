import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Mui } from "../../../theme";
import { validateField } from "../../../core/common";
import "./signup.css";
import type { SignUpFormData } from "./signupinterface";


const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    role: "",
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

  const handleSignInRedirect = (href:string) => {
    navigate(href);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof SignUpFormData;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sessionStorage.setItem("userData", JSON.stringify(formData));
      if(formData.role !== 'user'){
          handleSignInRedirect('/dashboard')
        }else{
          handleSignInRedirect('/blog')
        }
  };

  return (
    <>
      <Mui.Container
        className="signup-layout"
        component="main"
        maxWidth="sm"
        sx={{ mt: 10 }}
      >
        <Mui.Typography component="h1" variant="h4" align="center" gutterBottom>
          Sign Up
        </Mui.Typography>

        <Mui.Box component="form" onSubmit={handleSubmit}>
          <Mui.Grid container spacing={2} sx={{ justifyContent: "center" }}>
            <Mui.Grid size={{ xs: 12, sm: 10, md: 6 }}>
              <Mui.TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={formData.firstName}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                onChange={handleChange}
                onBlur={handleChange}
              />
            </Mui.Grid>
            <Mui.Grid size={{ xs: 12, sm: 10, md: 6 }}>
              <Mui.TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
              />
            </Mui.Grid>
            <Mui.Grid size={{ xs: 12, sm: 10, md: 6 }}>
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
            <Mui.Grid size={{ xs: 12, sm: 10, md: 6 }}>
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
                onBlur={handleChange}
                onChange={handleChange}
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
            <Mui.Grid size={{ xs: 12, sm: 10, md: 6 }}>
              <Mui.FormControl
                sx={{ minWidth: "265px" }}
                error={Boolean(errors.gender)}
              >
                <Mui.InputLabel id="gender-label">Gender</Mui.InputLabel>
                <Mui.Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  error={Boolean(errors.gender)}
                  helperText={errors.gender}
                  label="Gender"
                  onChange={handleSelectChange}
                >
                  <Mui.MenuItem value="male">Male</Mui.MenuItem>
                  <Mui.MenuItem value="female">Female</Mui.MenuItem>
                  <Mui.MenuItem value="other">Other</Mui.MenuItem>
                </Mui.Select>
                {errors.gender && (
                  <Mui.FormHelperText>{errors.gender}</Mui.FormHelperText>
                )}
              </Mui.FormControl>
            </Mui.Grid>
            <Mui.Grid size={{ xs: 12, sm: 10, md: 6 }}>
              <Mui.FormControl sx={{ minWidth: "270px" }}>
                <Mui.InputLabel id="role-label">Role</Mui.InputLabel>
                <Mui.Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={formData.role}
                  error={Boolean(errors.role)}
                  helperText={errors.role}
                  label="Role"
                  onChange={handleSelectChange}
                >
                  <Mui.MenuItem value="user">User</Mui.MenuItem>
                  <Mui.MenuItem value="admin">Admin</Mui.MenuItem>
                </Mui.Select>
              </Mui.FormControl>
            </Mui.Grid>
            <Mui.Grid size={{ md: 12 }}>
              <Mui.Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
              >
                SIGN UP
              </Mui.Button>
            </Mui.Grid>
            <Mui.Grid>
              <Mui.Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Already have an account?{" "}
                <Mui.Link
                  component="button"
                  variant="body2"
                  onClick={()=>{handleSignInRedirect('/signin')}}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  Sign in
                </Mui.Link>
              </Mui.Typography>
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Box>
      </Mui.Container>
    </>
  );
};
export default SignUpForm;
