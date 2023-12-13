
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';



export interface ConfirmationDialogProps {
  keepMounted: boolean;
  open: boolean;
  onClose: (isYes?: boolean) => void;
}

export default function ConfirmationDialog(props: ConfirmationDialogProps) {

  //isYes:x we rename isYes to x
  const { onClose, open, keepMounted } = props;


    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(true);
    };

  

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      keepMounted={keepMounted}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent dividers>
        <h2>Are you sure</h2>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          No
        </Button>
        <Button onClick={handleOk}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}


