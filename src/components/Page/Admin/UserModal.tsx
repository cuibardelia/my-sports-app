import React, { useState, useEffect, useRef } from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useAdminContext } from '../../../Providers/AdminContext';
import { getProtectedHeaders } from '../../../helpers/fnRequest';
import { useAuthContext } from '../../../Providers/AuthContext';
import { specialtiesList } from '../../../Types';

const StyledAvatar = styled(Avatar)({});

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const UserModal: React.FC = () => {
  const { selectedUser, setSelectedUser, resetUsers } = useAdminContext();
  const { token } = useAuthContext();
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(selectedUser?.bio || '');
  const [specialties, setSpecialties] = useState(selectedUser?.specialties || []);
  const [editableBio, setEditableBio] = useState(selectedUser?.bio || '');
  const [editableSpecialties, setEditableSpecialties] = useState(selectedUser?.specialties || []);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClose = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    if (selectedUser) {
      setBio(selectedUser?.bio);
      setSpecialties(selectedUser?.specialties);
    }
  }, [selectedUser]);

  const handleEdit = () => {
    setEditMode(true);
    setEditableBio(bio);
    setEditableSpecialties(specialties);
  };

  const handleSave = () => {
    setEditMode(false);
    setBio(editableBio);
    setSpecialties(editableSpecialties);

    const body = {
      _id: selectedUser.id,
      bio: editableBio,
      specialties: editableSpecialties,
    };

    axios
      .put(`${process.env.ADMIN_API}/update-trainer`, body, {
        headers: getProtectedHeaders(token),
      })
      .then(() => {
        console.log('Successfully Updated');
        resetUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditableBio(bio);
    setEditableSpecialties(specialties);
  };

  const handleSpecialtiesChange = () => {
    const selectedSpecialties = Array.from(formRef.current?.elements || [])
      .filter((el) => el instanceof HTMLInputElement && el.checked)
      .map((el: HTMLInputElement) => el.value);

    setEditableSpecialties(selectedSpecialties);
  };

  if (!selectedUser) {
    return null;
  }

  return (
    <Dialog open={!!selectedUser} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <StyledAvatar src={selectedUser.picUrl} alt={selectedUser.name} />
          <Typography variant="h6">{selectedUser.name}</Typography>
          {editMode ? (
            <StyledForm ref={formRef}>
              <TextField
                value={editableBio}
                onChange={(e) => setEditableBio(e.target.value)}
                multiline
                label="Bio"
                variant="outlined"
              />
              <FormControl component="fieldset">
                <Typography variant="body1">Specialties</Typography>
                {specialtiesList.map((specialty) => (
                  <FormControlLabel
                    key={specialty}
                    control={(
                      <Checkbox
                        checked={editableSpecialties.includes(specialty)}
                        onChange={handleSpecialtiesChange}
                        value={specialty}
                      />
                            )}
                    label={specialty}
                  />
                ))}
              </FormControl>
            </StyledForm>
          ) : (
            <>
              <Typography variant="body1">{bio}</Typography>
              <DialogContentText>
                {specialties.length > 0 && (
                <>
                  <b>Specialties: </b>
                  {specialties.join(', ')}
                </>
                )}
              </DialogContentText>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        {editMode ? (
          <>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleEdit} color="primary">
              Edit
            </Button>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
