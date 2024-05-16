import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
import {useNavigate} from "react-router-dom";

const EditUserModal = ({ open, onClose, itemId }) => {

    const [userName, setUserName] = useState("");
    const [userSurname, setUserSurname] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");
    const [userIsVerified, setUserIsVerified] = useState(null);
    const [userIsStudent, setUserIsStudent] = useState(null);
    //const [userStatus, setUserStatus] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const isValidEmail = (userEmail) => {
        // Základní regulární výraz pro validaci e-mailové adresy
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(userEmail);
    };

    const handleUserNameChanged = (e) => {
        setUserName(e.target.value);
    };

    const handleUserSurnameChanged = (e) => {
        setUserSurname(e.target.value);
    };

    const handleUserEmailChanged = (e) => {
        setUserEmail(e.target.value);
    };

    const handleExitClicked = () => {
        itemId = "";
        console.log(itemId)
        setUserUpdate(user)
        onClose();
    };

    const handleSaveClicked = async () => {

        if (!userName || !userSurname || !userEmail) {
            console.error("Jméno, příjmení a email musí být vyplněny.");
            toast.error("Jméno, příjmení a email musí být vyplněny.");
            // setUser(null);
            itemId = null
            return;
        }

        if (!isValidEmail(userEmail)) {
            console.error("Emailová adresa není platná.");
            toast.error("Emailová adresa není platná.");
            // setUser(null);
            itemId = null
            return;
        }

        const jsonData = {
            id: itemId,
            name: userName,
            surname: userSurname,
            email: userEmail,
            isVerified: userIsVerified,
            isStudent: userIsStudent,
            role: userRole,
        };

        try {
            if (itemId != null) {
                await editUser(jsonData);
            }
        } catch (error) {
            console.log(jsonData)
            console.error("Chyba při vkládání uživatele:", error);
            navigate("/error", { state: { error: error.response.status } });
        } finally {
            itemId = null
            onClose();
            setUser(null);
            console.log(itemId)
        }
    };

    const setUserUpdate = (user) => {
        if(user === null){
            setUser(null);
            setUserName("");
            setUserSurname("");
            setUserEmail("");
            setUserIsVerified(null);
            setUserIsStudent(null);
            setUserRole("");
        } else {
            setUserName(user.firstName);
            setUserSurname(user.secondName);
            setUserEmail(user.email);
            setUserIsVerified(user.isVerified);
            setUserIsStudent(user.isStudent);
            setUserRole(user.role);
            setUser(user)
        }
    }

    useEffect(() => {
        async function fetchUser() {
            if (itemId != null) {
                try {
                    const response = await getUserById(itemId);
                    setUserUpdate(response)
                } catch (error) {
                    console.error("Chyba při načítání uživatelů:", error);
                }
            }
            else{
                setUserUpdate(null)
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
                                    style={{ marginRight: '45px' }}
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
                                    style={{ marginRight: '50px' }}
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
                                    style={{ marginRight: '50px' }}
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
                    <Grid container spacing={1} paddingTop={3}>
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

