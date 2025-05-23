import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type {
  LoginForm,
  State,
  ToastData,
} from "../../../../common/CommonInterface";
import { Toast } from "../../../../components/ToastNotification/Toast";
import { Mui } from "../../../../theme";
import "../style/login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLoading,
  setShowPassword,
  setToastData,
} from "../../../../common/CommonSlice";
import { login, loginUserRole } from "../service/LoginService";
import { setAuthToken, setrefreshToken, setRole } from "../LoginSlice";

const LoginMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state: State) => state?.commonMethods?.isLoader
  );

  const showPassword = useSelector(
    (state: State) => state?.commonMethods?.showPassword
  );

  const toastData = useSelector(
    (state: State) => state?.commonMethods?.toastData
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const handleToast = (data: ToastData) => {
    dispatch(setToastData(data));
  };

  const handleClickShowPassword = () => {
    dispatch(setShowPassword(!showPassword));
  };

  const handleSignUpRedirect = (href: string) => {
    navigate(href);
  };

  const closeToast = (data: ToastData) => {
    handleToast({
      show: false,
      type: "error",
      message: "No registered user found.",
    });
  };

  const onSubmit = async (data: LoginForm) => {
    try {
      dispatch(handleLoading(true));
      const response = await login(data);
      if (!response) {
        handleToast({
          show: true,
          type: "error",
          message: "No registered user found.",
        });
        return;
      }
      dispatch(setAuthToken(response.access_token));
      dispatch(setrefreshToken(response.refresh_token));
      if (response.access_token) {
        sessionStorage.setItem("authToken", response.access_token);
        const roleResponse = await loginUserRole(response.access_token);
        dispatch(setRole(roleResponse.role));
        const redirectPath = roleResponse.role !== "admin" ? "/home" : "/dashboard";
        handleSignUpRedirect(redirectPath);
      }
    } catch (error) {
      handleToast({
        show: true,
        type: "error",
        message: "An error occurred during login.",
      });
    } finally {
      dispatch(handleLoading(false));
    }
  };

  return (
    <>
      <Mui.Box className="login-layout-main">
        <Mui.Container
          sx={{
            backgroundColor: "background.paper",
            color: "text.primary",
          }}
          className="login-form"
          component="main"
          maxWidth="sm"
        >
          <Mui.Grid container direction="row" spacing={4}>
            <Mui.Grid size={{ sm: 12, md: 6 }}>
              <Mui.Card elevation={0}>
                <Mui.CardMedia
                  className="login-pic"
                  image="/src/assets/images/loginIn.png"
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
                      size="medium"
                    >
                      Login
                    </Mui.Button>
                  </Mui.Grid>
                </Mui.Grid>
              </Mui.Box>
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Container>
      </Mui.Box>
      <Mui.Box>
        <Mui.Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={isLoading || false}
          onClick={() => dispatch(handleLoading(false))}
        >
          <Mui.CircularProgress color="inherit" />
        </Mui.Backdrop>
        <Toast onClose={closeToast} data={toastData || {}} />
      </Mui.Box>
    </>
  );
};

export default LoginMain;
