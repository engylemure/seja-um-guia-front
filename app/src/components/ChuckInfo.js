import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions);

const ChuckInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => setIsModalOpen(false);
  const handleOpen = () => setIsModalOpen(true);
  return (
    <div>
      <IconButton onClick={handleOpen}>
        <InfoIcon />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isModalOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Info
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            chucknorris.io is a free JSON API for hand curated Chuck Norris
            facts.
            <a href={'https://api.chucknorris.io/#!'}> Read More </a>
          </Typography>
          <Typography gutterBottom>
            This project was developed based on a challenge for{' '}
            <a href={'https://github.com/GuiaBolso/'}>GuiaBolso</a>, at the{' '}
            <a href={'https://github.com/GuiaBolso/seja-um-guia-front'}>Link</a>
            .
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChuckInfo;
