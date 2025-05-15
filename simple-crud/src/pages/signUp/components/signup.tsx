import { useNavigate } from "react-router-dom";

import { Mui } from "../../../theme";

import "./signup.css";
import type { SignUpFormData } from "./signupinterface";
import { UserDetailsForm } from "../../../components/userDetails/userDetailsForm";

const SignUpForm = () => {
  const navigate = useNavigate();

  const handleSignInRedirect = (href: string) => {
    navigate(href);
  };

  const onSubmit = (data: SignUpFormData) => {
    if (data) {
      sessionStorage.setItem("userData", JSON.stringify(data));
      if (data.role !== "user") {
        handleSignInRedirect("/dashboard");
      } else {
        handleSignInRedirect("/blog");
      }
    }
  };

  return (
    <>
      <Mui.Container className="signup-layout" component="main" maxWidth="sm">
        <Mui.Typography component="h1" variant="h4" align="center" gutterBottom>
          Sign Up
        </Mui.Typography>
        <Mui.Box>
          <UserDetailsForm />
        </Mui.Box>
        <Mui.Grid container sx={{ justifyContent: "center", m: 3, gap: 1 }}>
          <Mui.Grid size={{ sm: 4, md: 12 }}>
            <Mui.Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
            >
              SIGN UP
            </Mui.Button>
          </Mui.Grid>
          <Mui.Grid size={{ sm: 4, md: 10 }}>
            <Mui.Typography
              variant="body2"
              align="center"
              justifyContent="center"
            >
              Already have an account?{" "}
              <Mui.Link
                component="button"
                variant="body2"
                type="button"
                onClick={() => {
                  handleSignInRedirect("/signin");
                }}
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
      </Mui.Container>
    </>
  );
};
export default SignUpForm;
