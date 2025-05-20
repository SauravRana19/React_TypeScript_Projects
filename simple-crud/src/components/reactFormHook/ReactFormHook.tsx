import { useForm } from "react-hook-form";
import './reactForm.css'
import { Mui } from "../../theme";
export const ReactFormHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = () => {
    reset();
  };

  return  (
    <Mui.Container maxWidth="sm">
      <Mui.Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Mui.Typography component="h1" variant="h4" gutterBottom>
          React Hook Form Example
        </Mui.Typography>
        <Mui.Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3, width: "100%" }}
        >
          <Mui.Grid container spacing={2}>
            <Mui.Grid  size={{ xs: 12 }}>
              <Mui.TextField
                fullWidth
                id="name"
                label="Name"
                {...register("name", { required: "Name is required" })}
                error={Boolean(errors.name)}
                 helperText={typeof errors.name?.message === "string" ? errors.name.message : ""}
              />
            </Mui.Grid>

            <Mui.Grid size={{ xs: 12 }}>
              <Mui.TextField
                fullWidth
                id="email"
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={Boolean(errors.email)}
                helperText={typeof errors.email?.message === "string" ? errors.email.message : ""}
              />
            </Mui.Grid>

            <Mui.Grid size={{ xs: 12 }}>
              <Mui.TextField
                fullWidth
                id="age"
                label="Age"
                type="number"
                {...register("age", {
                  min: { value: 18, message: "Minimum age is 18" },
                  max: { value: 99, message: "Maximum age is 99" },
                })}
                error={Boolean(errors.age)}
                helperText={errors.age?.message}
                InputProps={{ inputProps: { min: 18, max: 99 } }}
              />
            </Mui.Grid>

            <Mui.Grid size={{ xs: 12 }}>
              <Mui.FormControlLabel
                control={<Mui.Checkbox {...register("subscribe")} />}
                label="Subscribe to newsletter"
              />
            </Mui.Grid>

            <Mui.Grid size={{ xs: 12 }}>
              <Mui.FormControl component="fieldset">
                <Mui.FormLabel component="legend">Gender</Mui.FormLabel>
                <Mui.RadioGroup row>
                  <Mui.FormControlLabel
                    value="male"
                    control={<Mui.Radio {...register("gender")} />}
                    label="Male"
                  />
                  <Mui.FormControlLabel
                    value="female"
                    control={<Mui.Radio {...register("gender")} />}
                    label="Female"
                  />
                  <Mui.FormControlLabel
                    value="other"
                    control={<Mui.Radio {...register("gender")} />}
                    label="Other"
                  />
                </Mui.RadioGroup>
              </Mui.FormControl>
            </Mui.Grid>
          </Mui.Grid>

          <Mui.Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Mui.Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </Mui.Button>
            <Mui.Button
              type="button"
              variant="outlined"
              onClick={() => reset()}
              fullWidth
            >
              Reset
            </Mui.Button>
          </Mui.Box>
        </Mui.Box>
      </Mui.Box>
    </Mui.Container>
  );
};
