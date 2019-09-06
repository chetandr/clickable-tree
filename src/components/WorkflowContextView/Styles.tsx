import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    marginLeft: "2%"
  },
  table: {
    Width: "100%"
  },
  margin: {
    margin: theme.spacing(1),
    backgroundColor: "#2F72FF",
    color: "white"
  },
  workflow: {
    marginTop: "3%",
    fontWeight: "bold",
    fontSize: "15px",
    marginLeft: "1%",
    marginBottom: "5%"
  },
  closeIcon: {
    marginLeft: "93%",
    color: "grey"
  },
  divS: {
    display: "inline-block",
    float: "left",
    padding: "10px"
  },
  divS1: {
    width: "50%",
    float: "left",
    display: "inline-block",
    margin: "10px auto"
  },
  divS2: {
    width: "5%",
    float: "right",
    display: "inline-block",
    marginTop: "3%"
  },

  labelS: {
    width: "50%",
    display: "inline-block",
    float: "left"
  },
  typography: {
    fontSize: "13px",
    color: "black",
    fontFamily: "Helvetica",
    marginLeft: "5%",
    fontWeight: 500
  },
  buttonS: {
    width: "20%",
    display: "inline-block",
    float: "right",
    marginBottom: "3%"
  },
  closeButton: {
    background: "#2F72FF",
    color: "white",
    marginLeft: "4%"
  },
  gridS: {
    width: "75%",
    height: "100%"
  },
  tableRow: {
    fontSize: "13px",
    color: "black",
    fontFamily: "Helvetica",
    fontWeight: 700
  },
  link: {
    color: "#38CCF2",
    fontWeight: "normal",
    textAlign: "center"
  },
  divMargin: {
    marginTop: "3%"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 140,
    width: 100
  },
  modalpaper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paperp: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  typographyS: {
    fontFamily: "Helvetica",
    fontWeight: 700,
    alignItems: "right",
    fontSize: "12px",
    color: "#000000"
  }
}));

export const defaultProps = {
  bgcolor: "background.paper",
  m: 0,
  style: { width: "auto", height: "2rem" },
  borderColor: "text.primary"
};
