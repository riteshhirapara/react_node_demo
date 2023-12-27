import { toast } from "react-toastify";

export const showToast = (message: string, isValid: Boolean) => {
  if (isValid) {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
    });
  } else {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
    });
  }
};
