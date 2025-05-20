import { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import { Mui } from "../../theme";
import { useForm, Controller } from "react-hook-form";
import { validateField } from "../../core/Common";
import type { UserDetailFormData } from "./userdetailinterface";

interface PropData {
  screenType?: string;
  formData?: UserDetailFormData | {};
}

export const UserDetailsForm = forwardRef(
  ({ formData, screenType }: PropData, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      trigger,
      getValues,
      control,
    } = useForm<UserDetailFormData>({
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        role: "",
        status: "",
      },
      mode: "onTouched",
      reValidateMode: "onChange",
    });

    useEffect(() => {
      if (formData) {
        reset(formData);
      }
    }, [formData, reset]);

    useImperativeHandle(ref, () => ({
      submitForm: () => {
        return handleSubmit((data) => {
          return data;
        })();
      },
      getFormValues: () => {
        return getValues();
      },
      triggerValidation: () => {
        return trigger();
      },
    }));

    return (
      <>
        <Mui.Container
          className="user-detail-form"
          component="main"
          maxWidth="sm"
        >
          <Mui.Box component="form">
            <Mui.Grid container spacing={2} sx={{ justifyContent: "center" }}>
              <Mui.Grid size={{ xs: 12, sm: 10, md: 6 }}>
                <Mui.TextField
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
                  {...register("firstName", {
                    required: "First Name is required",
                    validate: (value) =>
                      validateField("firstName", value) || true,
                  })}
                />
              </Mui.Grid>
              <Mui.Grid size={{ xs: 12, sm: 10, md: 6 }}>
                <Mui.TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                  {...register("lastName", {
                    required: "Last Name is required",
                    validate: (value) =>
                      validateField("lastName", value) || true,
                  })}
                />
              </Mui.Grid>
              <Mui.Grid size={{ xs: 12, sm: 10, md: 6 }}>
                <Mui.TextField
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
                    validate: (value) => validateField("email", value) || true,
                  })}
                />
              </Mui.Grid>
              <Mui.Grid size={{ xs: 12, sm: 10, md: 6 }}>
                <Mui.TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  {...register("password", {
                    required: "Password is required",
                    validate: (value) =>
                      validateField("password", value) || true,
                  })}
                  InputProps={{
                    endAdornment: (
                      <Mui.InputAdornment position="end">
                        <Mui.IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
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
                <Controller
                  name="gender"
                  control={control}
                  rules={{
                    required: "Gender is required",
                    validate: (value) => validateField("gender", value) || true,
                  }}
                  render={({ field }) => (
                    <Mui.FormControl
                      error={Boolean(errors.gender)}
                      sx={{ width: "100%" }}
                    >
                      <Mui.InputLabel id="gender-label">Gender</Mui.InputLabel>
                      <Mui.Select
                        labelId="gender-label"
                        id="gender"
                        label="Gender"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          trigger("gender");
                        }}
                      >
                        <Mui.MenuItem value="male">Male</Mui.MenuItem>
                        <Mui.MenuItem value="female">Female</Mui.MenuItem>
                        <Mui.MenuItem value="other">Other</Mui.MenuItem>
                      </Mui.Select>
                      {errors.gender && (
                        <Mui.FormHelperText>
                          {errors.gender?.message}
                        </Mui.FormHelperText>
                      )}
                    </Mui.FormControl>
                  )}
                />
              </Mui.Grid>
              {screenType == "userForm" ? (
                <>
                  <Mui.Grid size={{ xs: 12, sm: 10, md: 6 }}>
                    <Controller
                      name="status"
                      control={control}
                      rules={{
                        required: "status is required",
                        validate: (value) =>
                          validateField("status", value) || true,
                      }}
                      render={({ field }) => (
                        <Mui.FormControl
                          error={Boolean(errors.status)}
                          sx={{ width: "100%" }}
                        >
                          <Mui.InputLabel id="status-label">
                            status
                          </Mui.InputLabel>
                          <Mui.Select
                            labelId="status-label"
                            id="status"
                            label="status"
                            defaultValue=""
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              trigger("status");
                            }}
                          >
                            <Mui.MenuItem value="active">Active</Mui.MenuItem>
                            <Mui.MenuItem value="inactive">
                              Inactive
                            </Mui.MenuItem>
                          </Mui.Select>
                          {errors.status && (
                            <Mui.FormHelperText>
                              {errors.status?.message}
                            </Mui.FormHelperText>
                          )}
                        </Mui.FormControl>
                      )}
                    />
                  </Mui.Grid>
                </>
              ) : (
                <>
                  <Mui.Grid size={{ xs: 12, sm: 10, md: 6 }}>
                    <Controller
                      name="role"
                      control={control}
                      rules={{
                        required: "role is required",
                        validate: (value) =>
                          validateField("role", value) || true,
                      }}
                      render={({ field }) => (
                        <Mui.FormControl
                          sx={{ width: "100%" }}
                          error={Boolean(errors.role)}
                        >
                          <Mui.InputLabel id="role-label">Role</Mui.InputLabel>
                          <Mui.Select
                            labelId="role-label"
                            defaultValue=""
                            label="Role"
                            id="role"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              trigger("role");
                            }}
                          >
                            <Mui.MenuItem value="user">User</Mui.MenuItem>
                            <Mui.MenuItem value="admin">Admin</Mui.MenuItem>
                          </Mui.Select>
                          {errors.role && (
                            <Mui.FormHelperText>
                              {errors.role?.message}
                            </Mui.FormHelperText>
                          )}
                        </Mui.FormControl>
                      )}
                    />
                  </Mui.Grid>
                </>
              )}
            </Mui.Grid>
          </Mui.Box>
        </Mui.Container>
      </>
    );
  }
);
