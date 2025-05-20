import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SignInFormData } from "./signinInterface";
import { Mui } from "../../../theme";
import { setAuthToken, validateField } from "../../../core/Common";
import "./signin.css";
import { Toast } from "../../../components/ToastNotification/Toast";
import { useForm } from "react-hook-form";
import type { ToastProps } from "../../../components/ToastNotification/toastInterface";
import { useDispatch } from "react-redux";

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [toastData, setToastData] = useState<ToastProps["data"]>({
    show: false,
    type: "info",
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUpRedirect = (href: string) => {
    navigate(href);
  };

  const closeToast = () => {
    setToastData((prev) => ({ ...prev, show: false }));
  };

  const onSubmit = (data: SignInFormData) => {
    const storedUser = sessionStorage.getItem("userData");
    if (!storedUser) {
      setToastData((prev) => ({
        ...prev,
        show: true,
        type: "error",
        message: "No registered user found. Please sign up first.",
      }));
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      if (
        userData.email === data.email &&
        userData.password === data.password
      ) {
        let authToken = btoa(`${userData.email}`);
        sessionStorage.setItem("authToken", authToken);
        dispatch(setAuthToken(authToken))
        if (userData.role !== "user") {
          handleSignUpRedirect("/dashboard");
        } else {
          handleSignUpRedirect("/blog");
        }
      } else {
        setError("password", {
          type: "manual",
          message: "No registered user found. Please sign up first",
        });
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  };

  return (
    <>
      <Mui.Box className="signin-layout-main">
        <Mui.Container
          sx={{
            backgroundColor: "background.paper",
            color: "text.primary",
          }}
          className="signin-form"
          component="main"
          maxWidth="sm"
        >
          <Mui.Grid container direction="row" spacing={4}>
            <Mui.Grid size={{ sm: 12, md: 6 }}>
              <Mui.Card elevation={0}>
                <Mui.CardMedia
                  className="signin-pic"
                  image="../../src/assets/loginIn.png"
                  title="Sign In"
                />
              </Mui.Card>
            </Mui.Grid>
            <Mui.Grid size={{ sm: 12, md: 6 }}>
              <Mui.Typography
                component="h1"
                variant="h4"
                align="center"
                gutterBottom
              >
                Sign In
              </Mui.Typography>
              <Mui.Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Mui.Grid
                  container
                  direction="column"
                  spacing={2}
                  sx={{ justifyContent: "center" }}
                >
                  <Mui.Grid size={{ xs: 12, md: 12 }}>
                    <Mui.TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                        validate: (value) =>
                          validateField("email", value) || true,
                      })}
                    />
                  </Mui.Grid>
                  <Mui.Grid size={{ xs: 12, md: 12 }}>
                    <Mui.TextField
                      required
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                        validate: (value) =>
                          validateField("password", value) || true,
                      })}
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
                    <Mui.Typography
                      variant="body2"
                      align="center"
                      sx={{ mt: 2 }}
                    >
                      Don't have an account?{" "}
                      <Mui.Link
                        component="button"
                        type="button"
                        variant="body2"
                        onClick={() => {
                          handleSignUpRedirect("/signup");
                        }}
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
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Container>
      </Mui.Box>
      <Toast onClose={closeToast} data={toastData} />
    </>
  );
};
export default SignInForm;
