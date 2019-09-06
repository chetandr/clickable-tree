import React, { FC } from "react";
import {
  Grid,
  Typography,
  Box,
  Link,
  ListItemText,
  List,
  Modal,
  Fade,
  Backdrop
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { WorkflowContextModalProps } from "./_dataTypes";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { useStyles, defaultProps } from "../../Styles";

const Workflow: FC<WorkflowContextModalProps> = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Click to Open Transfer List
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modalpaper}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open} style={{ width: 700 }}>
          <div className={classes.paperp}>
            <div className={classes.divS1}>
              <Typography className={classes.workflow}>
                WORKFLOW CONTEXT
              </Typography>
            </div>

            <div className={classes.divS2}>
              <CloseOutlinedIcon
                className={classes.closeIcon}
                onClick={handleClose}
              ></CloseOutlinedIcon>
            </div>

            <Grid container>
              <Grid item xs container direction="column" spacing={2}>
                <Typography className={classes.typographyS}>
                  Business Unit
                  <br />
                  <Link className={classes.link}>Change</Link>
                </Typography>{" "}
              </Grid>

              <Grid item xs container direction="column" spacing={2}>
                <Typography className={classes.typographyS}>
                  Product Group
                  <br />
                  <Link className={classes.link}>Change</Link>
                </Typography>
              </Grid>

              <Grid item xs container direction="column" spacing={2}>
                <Typography className={classes.typographyS}>
                  Product Family
                  <br />
                  <Link className={classes.link}>Change</Link>
                </Typography>
              </Grid>

              <Grid item xs container direction="column" spacing={2}>
                <Typography className={classes.typographyS}>
                  Items
                  <br />
                  <Link className={classes.link}>Change</Link>
                </Typography>
              </Grid>

              <Grid item xs container direction="column" spacing={2}>
                <Typography className={classes.typographyS}>
                  Location
                  <br />
                  <Link className={classes.link}>Change</Link>
                </Typography>
              </Grid>

              <Grid item xs container direction="column" spacing={2}>
                <Typography className={classes.typographyS}>
                  Resource
                  <br />
                  <Link className={classes.link}>Change</Link>
                </Typography>
              </Grid>
            </Grid>
            <Box borderBottom={0} {...defaultProps} />

            <Grid container spacing={2}>
              <Grid item xs={2} style={{ maxHeight: 200, overflow: "auto" }}>
                {props.WorkflowContextItems.map((Workflowlist: any) => (
                  <List>
                    <ListItemText>{Workflowlist.businessUnit}</ListItemText>
                  </List>
                ))}
              </Grid>

              <Grid item xs={2} style={{ maxHeight: 200, overflow: "auto" }}>
                {props.WorkflowContextItems.map((Workflowlist: any) => (
                  <List>
                    <ListItemText>{Workflowlist.productGroup}</ListItemText>
                  </List>
                ))}
              </Grid>

              <Grid item xs={2} style={{ maxHeight: 200, overflow: "auto" }}>
                {props.WorkflowContextItems.map((Workflowlist: any) => (
                  <List>
                    <ListItemText>{Workflowlist.productFamily}</ListItemText>
                  </List>
                ))}
              </Grid>

              <Grid item xs={2} style={{ maxHeight: 200, overflow: "auto" }}>
                {props.WorkflowContextItems.map((Workflowlist: any) => (
                  <List>
                    <ListItemText>{Workflowlist.items}</ListItemText>
                  </List>
                ))}
              </Grid>

              <Grid item xs={2} style={{ maxHeight: 200, overflow: "auto" }}>
                {props.WorkflowContextItems.map((Workflowlist: any) => (
                  <List>
                    <ListItemText>{Workflowlist.location}</ListItemText>
                  </List>
                ))}
              </Grid>

              <Grid item xs={2} style={{ maxHeight: 200, overflow: "auto" }}>
                {props.WorkflowContextItems.map((Workflowlist: any) => (
                  <List>
                    <ListItemText>{Workflowlist.resources}</ListItemText>
                  </List>
                ))}
              </Grid>
            </Grid>

            <Box borderBottom={1} {...defaultProps} />
            <div className={classes.divMargin}>
              <div className={classes.labelS}>
                <Typography className={classes.typography}>
                  Save this context and selection for future{" "}
                </Typography>
              </div>
            </div>
            <div className={classes.buttonS}>
              <Button variant="outlined" color="primary">
                Save
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.closeButton}
                onClick={handleClose}
              >
                close
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Workflow;
