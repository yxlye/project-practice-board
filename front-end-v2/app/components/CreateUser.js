import React, { useState, useContext } from "react";
import axios from "axios";

import GlobalContext from "../components/GlobalContext";

import { Box, Button, Input, Autocomplete, Chip } from "@mui/joy";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Close from "@mui/icons-material/Close";

function CreateUser({ allGroups, handleUserNotAuthorised, setEditUserRequest }) {
  const { handleAlerts } = useContext(GlobalContext);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUserGroups, setNewUserGroups] = useState(undefined);
  const [rerenderAC, setRerenderAC] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    async function registerUser() {
      let groupsData = newUserGroups ? newUserGroups.join(", ") : null;
      try {
        const response = await axios.post("/users/create", {
          username: newUsername.trim(),
          password: newPassword,
          email: newEmail.trim(),
          groups: groupsData
        });

        console.log(response);

        if (response) {
          console.log(response);
          setNewUsername("");
          setNewPassword("");
          setNewEmail("");
          setNewUserGroups(undefined);
          setRerenderAC(!rerenderAC);
          setEditUserRequest(prev => prev + 1);
        } else {
          console.log(response.data.message);
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
        handleUserNotAuthorised(error.response.data.message);
        handleAlerts(`${error.response.data.message}`, false);
      }
    }
    registerUser();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        ml: "2rem",
        mr: "2rem",
        maxWidth: "80rem"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          alignItems: "center"
        }}
      >
        <PersonAddIcon />
        <Input placeholder="username" value={newUsername} onChange={e => setNewUsername(e.target.value)} variant="soft" size="sm" color="primary" sx={{ maxWidth: "120px" }} />
        <Input placeholder="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} variant="soft" size="sm" color="primary" type="password" sx={{ maxWidth: "120px" }} />
        <Input placeholder="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} variant="soft" size="sm" color="primary" sx={{ maxWidth: "180px" }} />
      </Box>
      <Autocomplete
        key={rerenderAC}
        placeholder={newUserGroups ? "" : "assign groups"}
        variant="outlined"
        color="primary"
        value={newUserGroups}
        size="sm"
        multiple
        options={allGroups}
        onChange={(e, newValue) => setNewUserGroups(newValue)}
        sx={{ flexGrow: 1, ml: "1rem", mr: "1rem" }}
        renderTags={(tags, getTagProps) =>
          tags.map((item, index) => (
            <Chip variant="soft" size="sm" color="primary" endDecorator={<Close fontSize="sm" />} {...getTagProps({ index })}>
              {item}
            </Chip>
          ))
        }
        width="400px"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          alignItems: "center"
        }}
      >
        <Button onClick={handleSubmit} variant="outlined" size="sm">
          Add User
        </Button>
      </Box>
    </Box>
  );
}

export default CreateUser;
