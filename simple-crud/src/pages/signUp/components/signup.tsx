import { useNavigate } from "react-router-dom";
import { Mui } from "../../../theme";
import "./signup.css";
import { UserDetailsForm } from "../../../components/userDetails/userDetailsForm";
import { useRef } from "react";

const SignUpForm = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSignInRedirect = (href: string) => {
    navigate(href);
  };

  const onSubmit = async () => {
    if (formRef.current) {
      const isValid = await formRef.current.triggerValidation();
      if (isValid) {
        const formData = formRef.current.getFormValues();
        sessionStorage.setItem("userData", JSON.stringify(formData));
        if (formData?.role !== "user") {
          handleSignInRedirect("/dashboard");
        } else {
          handleSignInRedirect("/blog");
        }
      }
    }
  };

  return (
    <>
      <Mui.Box className="signup-layout-main">
        <Mui.Container
          sx={{
            backgroundColor: "background.paper",
            color: "text.primary",
          }}
          className="signup-form"
          component="main"
          maxWidth="sm"
        >
          <Mui.Typography
            component="h1"
            variant="h4"
            align="center"
            gutterBottom
          >
            Sign Up
          </Mui.Typography>
          <Mui.Box sx={{ color: "text.primary" }}>
            <UserDetailsForm ref={formRef} />
          </Mui.Box>
          <Mui.Grid container sx={{ justifyContent: "center", m: 3, gap: 1 }}>
            <Mui.Grid size={{ sm: 4, md: 12 }}>
              <Mui.Button
                type="button"
                fullWidth
                variant="contained"
                size="medium"
                onClick={() => {
                  onSubmit();
                }}
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
      </Mui.Box>
    </>
  );
};
export default SignUpForm;
