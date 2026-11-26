'use client';

import { useState, type ElementType, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Download, MoreVertical } from 'lucide-react';
import type { CvData, TemplateId } from '@cvforge/types';
import { CvDocument } from '../cv/CvDocument';

const PAPER_W = 794;
const PAPER_H = 1123;
const THUMB_ZOOM = 0.34;

export interface CvCardAction {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  danger?: boolean;
}

export interface CvCardProps {
  title: string;
  meta: string;
  templateId: TemplateId;
  data: CvData;
  /** Where the thumbnail and title lead (the editor). */
  href: string;
  onDownload: () => void;
  menuActions: CvCardAction[];
  linkComponent?: ElementType;
}

/** One saved design: live thumbnail, title, quick download and a menu for the rest. */
export function CvCard({ title, meta, templateId, data, href, onDownload, menuActions, linkComponent }: CvCardProps) {
  const Link = linkComponent ?? 'a';
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <Card variant="feature" sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        component={Link}
        href={href}
        aria-label={`Open ${title}`}
        sx={{ display: 'grid', justifyItems: 'center', height: 280, pt: 2, overflow: 'hidden', bgcolor: '#e9edf7', textDecoration: 'none' }}
      >
        <Box sx={{ zoom: THUMB_ZOOM, width: PAPER_W, height: PAPER_H, boxShadow: '0 12px 28px -12px rgba(15,23,48,.5)', pointerEvents: 'none' }} aria-hidden>
          <CvDocument data={data} templateId={templateId} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 1.5, pl: 2 }}>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="h6" component="h2" noWrap title={title}>
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
            {meta}
          </Typography>
        </Box>
        <Tooltip title="Download PDF">
          <IconButton aria-label={`Download ${title} as PDF`} onClick={onDownload}>
            <Download size={18} />
          </IconButton>
        </Tooltip>
        <IconButton aria-label={`More actions for ${title}`} aria-haspopup="menu" onClick={(e) => setAnchor(e.currentTarget)}>
          <MoreVertical size={18} />
        </IconButton>
        <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
          {menuActions.map((action) => (
            <MenuItem
              key={action.label}
              onClick={() => {
                setAnchor(null);
                action.onClick();
              }}
              sx={action.danger ? { color: 'error.main' } : undefined}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 30 }}>{action.icon}</ListItemIcon>
              {action.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Card>
  );
}
