import { toast } from "react-toastify";

const options = {
  position: "top-right",
  autoClose: 5000,
};
export const ToastSuccess = (message) => toast.success(message, options);
export const ToastWarning = (message) => toast.warning(message, options);
export const ToastError = (message) => toast.error(message, options);
