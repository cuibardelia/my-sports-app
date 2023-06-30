import * as React from 'react';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/system';
import UploadPic from '../Common/UploadPic';

const StyledCard = styled(Card)({
  maxWidth: 400,
});

const StyledImage = styled('img')({
  maxWidth: '100%',
});

interface IPicModal {
  open: boolean;
  handleClose: () => void;
  picUrl: string;
  handleUploadComplete: (url: string) => void;
  alt?: string;
}

const PicModal: React.FC<IPicModal> = ({
  open, handleClose, picUrl, alt = '', handleUploadComplete,
}) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Avatar</DialogTitle>
    <DialogContent>
      <Box display="flex" flexDirection="column" alignItems="center">
        {picUrl && (
        <StyledCard>
          <Box p={3} textAlign="center">
            <StyledImage src={picUrl} alt={alt} />
          </Box>
        </StyledCard>
        )}
        <UploadPic onUploadComplete={handleUploadComplete} />
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default PicModal;
