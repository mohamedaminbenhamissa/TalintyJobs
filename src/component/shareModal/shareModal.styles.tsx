import { DialogActions, DialogTitle } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomDialogActions = styled(DialogActions)({
  display: "flex",
  justifyContent: "space-between",
  padding: 20,
});
export const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: 20,
  textAlign: "center",
  fontSize: 24,
  color: theme.palette.text.primary,
}));
