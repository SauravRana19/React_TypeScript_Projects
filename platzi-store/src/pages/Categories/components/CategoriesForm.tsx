import { useSelector } from "react-redux";
import type { State } from "../../../common/CommonInterface";
import Mui from "../../../theme/components/MuiComponent";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import type { CategorieData } from "./CategorieInterface";

export interface CategoriesFormHandle {
  submitForm: () => Promise<CategorieData>;
  getFormValues: () => CategorieData;
  triggerValidation: () => Promise<boolean>;
}

export const CategorieForm = forwardRef<CategoriesFormHandle>((props, ref) => {
  const categorieData = useSelector(
    (state: State) => state?.categories.categorieUpdateData
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm<CategorieData>({
    defaultValues: {
      name: "",
      image: "",
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
    if (categorieData) {
      reset(categorieData);
    }
  }, [categorieData, reset]);

  return (
    <Mui.Container className="category-form" component="main" maxWidth="sm">
      <Mui.Box component="form">
        <Mui.Grid container spacing={2} sx={{ justifyContent: "center" }}>
          <Mui.Grid size={{ xs: 12 }}>
            <Mui.Box display="flex" justifyContent="center" mb={2}>
              <Mui.Avatar
                src={getValues("image")}
                sx={{ width: 100, height: 100 }}
                variant="square"
              />
            </Mui.Box>
          </Mui.Grid>

          <Mui.Grid size={{ xs: 12 }}>
            <Mui.TextField
              fullWidth
              id="image"
              label="Image URL"
              error={Boolean(errors.image)}
              helperText={errors.image?.message}
              {...register("image", {
                required: "Image URL is required",
                pattern: {
                  value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                  message: "Please enter a valid image URL",
                },
              })}
            />
          </Mui.Grid>

          <Mui.Grid size={{ xs: 12 }}>
            <Mui.TextField
              fullWidth
              id="name"
              label="Category Name"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              {...register("name", {
                required: "Category name is required",
                minLength: {
                  value: 3,
                  message: "Category name must be at least 3 characters",
                },
              })}
            />
          </Mui.Grid>
        </Mui.Grid>
      </Mui.Box>
    </Mui.Container>
  );
});
