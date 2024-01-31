import { Alert } from "@mui/material";
import { ReactElement } from "react";

interface CustomAlertProps {
  type: "error" | "info" | "success" | "warning";
  message: string;
}

const CustomAlert = ({ message, type }: CustomAlertProps): ReactElement => {
  return (
    <Alert severity={type} sx={{ width: "fit-content" }} aria-label={message}>
      {message}
    </Alert>
  );
};

export default CustomAlert;
