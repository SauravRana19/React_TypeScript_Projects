import { useEffect, useState } from "react";
import { Mui } from "../../theme";
import type {
  UserDetailFormData,
  UserDetailFormProps,
} from "./userdetailinterface";
import { validateField } from "../../core/common";
import { ApiService } from "../../services/api/apiService";


export const UserDeatilForm = ({
  open,
  onClose,
  data,
}: UserDetailFormProps) => {
  const [formData, setFormData] = useState<UserDetailFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    status: "",
  });

  useEffect(() => {
    if (open && data) {
      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        password: data.password || "",
        gender: data.gender || "",
        status: data.status || "",
      });
     
      
    }
  }, [open, data]);

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

  const handleSelectChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof UserDetailFormData;
    const value = event.target.value as string;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value, formData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const clearForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      status: "",
    });
    onClose();
  };

  const validateForm = () => {
    const newErrors = {
      firstName: !formData.firstName ? "First name is required" : "",
      lastName: !formData.lastName ? "Last name is required" : "",
      email: !formData.email ? "Email is required" : "",
      password: !formData.password ? "Password is required" : "",
      gender: !formData.gender ? "Gender is required" : "",
      status: !formData.status ? "Status is required" : "",
    };
    setErrors(newErrors);
    const isFormValid = Object.values(newErrors).every((error) => !error);
    return isFormValid;
  };

  const onSubmit = () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      handleLoading(true);
      ApiService.createNewUser(formData);
      setTimeout(() => {
        handleLoading(false);
        clearForm();
      }, 700);
    }
  };

  const handleLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  const onUpdate = () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      handleLoading(true);
      ApiService.updateUser(data?.id, formData);
      setTimeout(() => {
        handleLoading(false);
        clearForm();
      }, 700);
    }
  };

  return (
    <>
      <Mui.Dialog
        open={open}
        onClose={clearForm}
        disableEscapeKeyDown
      >
        <Mui.DialogTitle id="alert-dialog-title">
          {"User Profile Detail's"}
        </Mui.DialogTitle>
        <Mui.IconButton
          aria-label="close"
          onClick={clearForm}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <Mui.CloseIcon />
        </Mui.IconButton>
        <Mui.DialogContent>
          <Mui.Container
            className="signup-layout"
            component="main"
            maxWidth="sm"
            sx={{ mt: 1 }}
          >
            <Mui.Box component="form">
              <Mui.Grid container spacing={2} sx={{ justifyContent: "center" }}>
                <Mui.Grid size={{ xs: 12, sm: 10, md: 6 }}>
                  <Mui.TextField
                    autoComplete="first-name"
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
                    autoComplete="lastname"
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
                    type="password"
                    id="password"
                    autoComplete="password"
                    value={formData.password}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    onBlur={handleChange}
                    onChange={handleChange}
                  />
                </Mui.Grid>
                <Mui.Grid size={{ xs: 12, sm: 10, md: 6 }}>
                  <Mui.FormControl
                    sx={{ minWidth: "240px" }}
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
                  <Mui.FormControl
                    sx={{ minWidth: "240px" }}
                    error={Boolean(errors.status)}
                  >
                    <Mui.InputLabel id="status-label">Status</Mui.InputLabel>
                    <Mui.Select
                      labelId="status-label"
                      id="status"
                      name="status"
                      value={formData.status}
                      helperText={errors.status}
                      label="status"
                      onChange={handleSelectChange}
                    >
                      <Mui.MenuItem value="active">Active</Mui.MenuItem>
                      <Mui.MenuItem value="inactive">Inactive</Mui.MenuItem>
                    </Mui.Select>
                    {errors.status && (
                      <Mui.FormHelperText>{errors.status}</Mui.FormHelperText>
                    )}
                  </Mui.FormControl>
                </Mui.Grid>
              </Mui.Grid>
            </Mui.Box>
          </Mui.Container>
        </Mui.DialogContent>
        <Mui.DialogActions>
          <Mui.Button onClick={clearForm}>Cancel</Mui.Button>
     
          {!Object.keys(data || {}).length ? (
            <Mui.Button onClick={onSubmit} autoFocus>
              Submit
            </Mui.Button>
          ) : (
            <Mui.Button onClick={onUpdate} autoFocus>
              Update
            </Mui.Button>
          )}
        </Mui.DialogActions>
      </Mui.Dialog>
    </>
  );
};
