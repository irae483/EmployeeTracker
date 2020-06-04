import React from "react";
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  createStyles,
  WithStyles,
  withStyles,
  Theme,
  Typography,
  IconButton,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

interface DialogWithButtonsPropsNoChildren {
  open: boolean;
  onClose: (reason: ClosingReason) => void;
  title?: string;
  submitButtonText?: string;
  disableSubmitButton?: boolean;
}

export type DialogWithButtonsProps = React.PropsWithChildren<
  DialogWithButtonsPropsNoChildren
>;

export type ClosingReason =
  | "backdropClick"
  | "escapeKeyDown"
  | "cancelButtonClicked"
  | "submitButtonClicked";

export const DialogWithButtons = (props: DialogWithButtonsProps) => {
  return (
    <Dialog
      open={props.open}
      onClose={(e, reason) => props.onClose(reason)}
      aria-labelledby="form-dialog-title"
      maxWidth="lg"
    >
      {props.title && (
        <DialogTitle
          id="form-dialog-title"
          onClose={() => props.onClose("cancelButtonClicked")}
        >
          {props.title}
        </DialogTitle>
      )}
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button
          onClick={() => props.onClose("cancelButtonClicked")}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => props.onClose("submitButtonClicked")}
          color="primary"
          disabled={props.disableSubmitButton}
        >
          {props.submitButtonText ? props.submitButtonText : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
