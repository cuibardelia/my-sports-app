import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Box, Card, Typography } from '@mui/material';
import { useAuthContext } from '../../../Providers/AuthContext';

interface PicProps {
  onUploadComplete: (url: string) => void;
}

const UploadPic: React.FC<PicProps> = ({ onUploadComplete }) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const { token } = useAuthContext();

  const handleDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(process.env.UPLOAD_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      const { imageUrl } = response.data;

      setUploadedImageUrl(imageUrl);
      onUploadComplete(imageUrl);
      console.log('Image uploaded successfully:', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

  // TODO: upload icon from mui
  return (
    <div className="cloudinary-upload">
      <Card {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <Box p={3} textAlign="center">
          <Typography variant="body1" color="textSecondary">
            DRAG & DROP or CLICK for profile picture upload
          </Typography>
        </Box>
      </Card>
      {uploadedImageUrl && (
        <Box mt={3}>
          <Card>
            <Box p={3} textAlign="center">
              <img src={uploadedImageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
            </Box>
          </Card>
        </Box>
      )}
    </div>
  );
};

export default UploadPic;
