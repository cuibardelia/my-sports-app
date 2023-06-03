import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useRef, useState } from 'react';
import axios from 'axios';
import { useAdminContext } from '../../../Providers/AdminContext';
import { getProtectedHeaders } from '../../../helpers/fnRequest';
import { useAuthContext } from '../../../Providers/AuthContext';
import { specialtiesList } from '../../../Types';

const StyledAvatar = styled(Avatar)({

});

// TODO: refactor, this a monster
const UserModal: React.FC = () => {
  // TODO: types!!!
  const { selectedUser, setSelectedUser, resetUsers } = useAdminContext();
  const { token } = useAuthContext();
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(selectedUser?.bio || '');
  const [specialties, setSpecialties] = useState(selectedUser?.specialties || []);
  const [editableBio, setEditableBio] = useState(selectedUser?.bio || '');
  // FIXME: doesn't keep previous specialties on modal
  const [editableSpecialties, setEditableSpecialties] = useState(selectedUser?.specialties || []);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClose = () => {
    setSelectedUser(null);
  };

  if (!selectedUser) {
    return null;
  }

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
        // TODO: success toast
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

  return (
    <Dialog open={!!selectedUser} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <StyledAvatar src={selectedUser.picUrl} alt={selectedUser.name} />
          <Typography variant="h6">{selectedUser.name}</Typography>
          {editMode ? (
            <form ref={formRef}>
              <TextField
                value={editableBio}
                onChange={(e) => setEditableBio(e.target.value)}
                multiline
                label="Bio"
                variant="outlined"
              />
              <FormControl component="fieldset">
                <Typography variant="body1">Specialties</Typography>
                <RadioGroup name="specialties" value={editableSpecialties} onChange={handleSpecialtiesChange}>
                  {specialtiesList.map((specialty) => (
                    <FormControlLabel
                      key={specialty}
                      value={specialty}
                      control={<Radio />}
                      label={specialty}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </form>
          ) : (
            <>
              <Typography variant="body1">{bio}</Typography>
              <DialogContentText>
                {specialties.length > 0 && (
                <>
                  <b>Specialties:  </b>
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
