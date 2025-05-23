import { useDispatch, useSelector } from "react-redux";
import type { State } from "../../../common/CommonInterface";
import Mui from "../../../theme/components/MuiComponent";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { UserData } from "./UsersInterface";
import { setShowPassword } from "../../../common/CommonSlice";

export interface UserDetailFormHandle {
  submitForm: () => Promise<UserData>;
  getFormValues: () => UserData;
  triggerValidation: () => Promise<boolean>;
}

export const UserDetailForm = forwardRef<UserDetailFormHandle>((props, ref) => {
  const dispatch = useDispatch();

  const showPassword = useSelector(
    (state: State) => state?.commonMethods?.showPassword
  );

  const userData = useSelector(
    (state: State) => state?.users.userUpdateData
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
    control,
  } = useForm<UserData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "customer",
      avatar: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      return handleSubmit((data) => {
        return data;
      })();
    },
    getFormValues: () => getValues(),
    triggerValidation: () => trigger(),
  }));

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  return (
    <>
      <Mui.Container
        className="user-profile-form"
        component="main"
        maxWidth="sm"
      >
        <Mui.Box component="form">
          <Mui.Grid container spacing={2} sx={{ justifyContent: "center" }}>
            <Mui.Grid size={{ xs: 12 }}>
              <Mui.Box display="flex" justifyContent="center" mb={2}>
                <Mui.Avatar
                  src={getValues("avatar") || "https://picsum.photos/800"}
                  sx={{ width: 100, height: 100 }}
                />
              </Mui.Box>
            </Mui.Grid>

            <Mui.Grid size={{ xs: 12 }}>
              <Mui.TextField
                fullWidth
                id="avatar"
                label="Avatar URL"
                {...register("avatar")}
              />
            </Mui.Grid>

            <Mui.Grid size={{ xs: 12, sm: 6 }}>
              <Mui.TextField
                fullWidth
                id="name"
                label="Name"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                {...register("name", {
                  required: "Name is required",
                })}
              />
            </Mui.Grid>

            <Mui.Grid size={{ xs: 12, sm: 6 }}>
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
                })}
              />
            </Mui.Grid>

            <Mui.Grid size={{ xs: 12, sm: 6 }}>
              <Mui.TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters",
                  },
                })}
                InputProps={{
                  endAdornment: (
                    <Mui.InputAdornment position="end">
                      <Mui.IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          dispatch(setShowPassword(!showPassword));
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
            <Mui.Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="role"
                control={control}
                rules={{
                  required: "Role is required",
                }}
                render={({ field }) => (
                  <Mui.FormControl
                    sx={{ width: "100%" }}
                    error={Boolean(errors.role)}
                  >
                    <Mui.InputLabel id="role-label">Role</Mui.InputLabel>
                    <Mui.Select
                      labelId="role-label"
                      label="Role"
                      id="role"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        trigger("role");
                      }}
                    >
                      <Mui.MenuItem value="customer">Customer</Mui.MenuItem>
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
          </Mui.Grid>
        </Mui.Box>
      </Mui.Container>
    </>
  );
});
