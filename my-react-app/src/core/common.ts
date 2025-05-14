import { createContext } from 'react';


export const validateField = (name: any, value: string, formData?: any) => {
  switch (name) {
    case "firstName":
      if (!value.trim()) return "First name is required";
      return "";

    case "lastName":
      if (!value.trim()) return "Last name is required";
      return "";

    case "email":
      if (!value) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Enter a valid email address";
      return "";

    case "password":
      if (!value) return "Password is required";
      if (value.length < 8) return "Password must be at least 8 characters";
      // Clear confirm password error if passwords now match

      return "";

    case "confirmPassword":
      if (!value) return "Please confirm your password";
      if (value !== formData.password) return "Passwords do not match";
      return "";

    case "role":
      if (!value) return "Please select a role";
      return "";

    default:
      return "";
  }
};

export const getUserRole = () => {
  const userData = sessionStorage.getItem("userData");
  return userData ? JSON.parse(userData).role : " ";
};


export const userRoleContext = createContext(getUserRole());