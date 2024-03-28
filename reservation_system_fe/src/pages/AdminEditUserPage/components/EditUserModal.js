import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { Button, Grid } from "@mui/material";
import {
    getUserById,
    editUser,
} from "../../../services/apiService";
import "react-toastify/dist/ReactToastify.css";

const EditUserModal = ({ open, onClose, itemId }) => {

    const [userName, setUserName] = useState("");
    const [userSurname, setUserSurname] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");
    const [userIsVerified, setUserIsVerified] = useState(null);
    const [userIsStudent, setUserIsStudent] = useState(null);
    //const [userStatus, setUserStatus] = useState(null);
    const [user, setUser] = useState(null);

    const handleUserNameChanged = (e) => setUserName(e.target.value);
    const handleUserSurnameChanged = (e) => setUserSurname(e.target.value);
    const handleUserEmailChanged = (e) => setUserEmail(e.target.value);

    const handleExitClicked = () => {
        itemId = null;
        onClose();
        setUser(null);
    };

    const handleSaveClicked = async () => {
        const jsonData = {
            id: itemId,
            name: userName,
            surname: userSurname,
            email: userEmail,
            isVerified: userIsVerified,
            isStudent: userIsStudent,
            role: userRole,
            //active: userStatus
        };
        try {
            if (itemId != null) {
                await editUser(jsonData);
            }
        } catch (error) {
            console.log(jsonData)
            console.error("Chyba při vkládání uživatele:", error);
        }
        itemId=null;
        onClose();
        setUser(null);
    };

    useEffect(() => {
        async function fetchUser() {

            if (itemId != null) {
                try {
                    const response = await getUserById(itemId);
                    setUser(response);
                    setUserName(response.firstName);
                    setUserSurname(response.secondName);
                    setUserEmail(response.email);
                    setUserIsVerified(response.isVerified);
                    setUserIsStudent(response.isStudent);
                    setUserRole(response.role);
                    //setUserStatus(response.status);
                    console.log(response);
                } catch (error) {
                    console.error("Chyba při načítání uživatelů:", error);
                }
            }
            else{
                setUser(null);
                setUserName("");
                setUserSurname("");
                setUserEmail("");
                setUserIsVerified(null);
                setUserIsStudent(null);
                setUserRole("");
                //setUserStatus(null);
            }
        }

        fetchUser();
    }, [itemId]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "12px"
                }}
            >
                <Grid container direction={"column"}>
                    <Grid item>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                required
                                label="Jméno"
                                value={userName}
                                onChange={handleUserNameChanged}
                                margin="normal"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                required
                                label="Příjmení"
                                value={userSurname}
                                onChange={handleUserSurnameChanged}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                required
                                multiline
                                fullWidth
                                label="Email"
                                value={userEmail}
                                onChange={handleUserEmailChanged}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label1">Role</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label1"
                                name="row-radio-buttons-group1"
                                value={userRole}
                            >
                                <FormControlLabel
                                    value="User"
                                    control={<Radio />}
                                    label="User"
                                    onChange={(e) => setUserRole(e.target.value)}
                                />
                                <FormControlLabel
                                    value="Admin"
                                    control={<Radio />}
                                    label="Admin"
                                    onChange={(e) => setUserRole(e.target.value)}
                                />

                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label2">Ověřeno</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label2"
                                name="row-radio-buttons-group2"
                                value={userIsVerified}
                            >
                                <FormControlLabel
                                    value={true}
                                    control={<Radio />}
                                    label="Ano"
                                    onChange={() => setUserIsVerified(!userIsVerified)}
                                />
                                <FormControlLabel
                                    value={false}
                                    control={<Radio />}
                                    label="Ne"
                                    onChange={() => setUserIsVerified(!userIsVerified)}
                                />

                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label3">Student</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label3"
                                name="row-radio-buttons-group3"
                                value={userIsStudent}
                            >
                                <FormControlLabel
                                    value={true}
                                    control={<Radio />}
                                    label="Ano"
                                    onChange={() => setUserIsStudent(!userIsStudent)}
                                />
                                <FormControlLabel
                                    value={false}
                                    control={<Radio />}
                                    label="Ne"
                                    onChange={() => setUserIsStudent(!userIsStudent)}
                                />

                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {/*<Grid item>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label4">Status</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label4"
                                name="row-radio-buttons-group4"
                                value={userStatus}
                            >
                                <FormControlLabel
                                    value={true}
                                    control={<Radio />}
                                    label="Aktivní"
                                    onChange={() => setUserStatus(!userStatus)}
                                />
                                <FormControlLabel
                                    value={false}
                                    control={<Radio />}
                                    label="Neaktivní"
                                    onChange={() => setUserStatus(!userStatus)}
                                />

                            </RadioGroup>
                        </FormControl>
                    </Grid>*/}
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleExitClicked}
                            >
                                Zrušit
                            </Button>
                        </Grid>
                        <Grid item xs></Grid>
                        <Grid item xs>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleSaveClicked}
                            >
                                Potvrdit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default EditUserModal;

