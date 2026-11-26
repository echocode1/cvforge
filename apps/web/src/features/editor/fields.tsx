'use client';

import { useState } from 'react';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

export function Field(props: TextFieldProps) {
  return <TextField size="small" fullWidth {...props} />;
}

/** Comma-separated list input. Keeps raw text locally so typing commas and spaces feels natural. */
export function KeywordsField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const [raw, setRaw] = useState(value.join(', '));
  return (
    <Field
      label={label}
      value={raw}
      helperText="Separate with commas"
      onChange={(e) => {
        setRaw(e.target.value);
        onChange(
          e.target.value
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        );
      }}
    />
  );
}
