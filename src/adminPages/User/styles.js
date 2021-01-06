import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: theme.palette.warning.main
  },
  success: {
    backgroundColor: theme.palette.success.main
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main
  },
  primary: {
    backgroundColor: theme.palette.primary.main
  },
  info: {
    backgroundColor: theme.palette.info.main
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "primary",
  },
}));
