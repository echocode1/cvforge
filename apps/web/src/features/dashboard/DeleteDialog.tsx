'use client';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function DeleteDialog({
  title,
  busy,
  onClose,
  onConfirm,
}: {
  /** null = closed */
  title: string | null;
  busy: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={title !== null} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete this CV?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          “{title}” will be removed from your dashboard. This cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={busy}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
