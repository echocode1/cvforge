'use client';

import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export function RenameDialog({
  open,
  initialTitle,
  busy,
  onClose,
  onSave,
}: {
  open: boolean;
  initialTitle: string;
  busy: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
}) {
  const [title, setTitle] = useState(initialTitle);
  useEffect(() => {
    if (open) setTitle(initialTitle);
  }, [open, initialTitle]);

  const valid = title.trim().length > 0;
  const submit = () => valid && onSave(title.trim());

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Rename CV</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label="CV name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          sx={{ mt: 1 }}
          slotProps={{ htmlInput: { maxLength: 120 } }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={submit} variant="contained" disabled={!valid || busy}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
