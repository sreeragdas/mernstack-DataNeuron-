import './styles.scss';

import VisibilityIcon from '@mui/icons-material/Visibility';

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';


import { useStore } from '../../stores';

import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup'; // Import Yup for validation
import { IUser } from '../../interfaces/IUser';
export const Login = observer(() => {

 
    const navigate = useNavigate();
    const { authStore } = useStore();
    const [addCount, setAddCount] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    const handleLogin = (e: { preventDefault: () => void }) => {
        e.preventDefault();

    };
    const [id, setId] = useState('')


    const handleUpdatebutton = async (item: string) => {
        // Call getuserid to fetch the updated user data
        setId(item)
        const success = await authStore.getuserid(item);

        // If the request was successful, update the form data and open the update dialog
        if (success) {
            // Set the updateFormData with the values of the user to be updated
            setUpdateFormData({
                name: authStore.getByidUser?.name || '',
                username: authStore.getByidUser?.username || '',
                phoneNumber: authStore.getByidUser?.phoneNumber || '',
                address: authStore.getByidUser?.address || '',
            });

            // Open the update dialog
            setOpenUpdateDialog(true);
        } else {
            // Handle the case where fetching user data failed
            console.error('Failed to fetch user data for update');
            // Optionally, you can show an error message to the user
        }
    };



  
    const user = authStore.user
    const [userData, setUserData] = useState<IUser>([])
    useEffect(() => {
        authStore.displayUser();


    }, [])

    console.log(userData)

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        address: '',
        phoneNumber: ''
    });
    const [formErrors, setFormErrors] = useState({
        name: '',
        username: '',
        address: '',
        phoneNumber: ''
    });

    const handleOnAdd = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        username: Yup.string().required('Username is required'),
        address: Yup.string().required('Address is required'),
        phoneNumber: Yup.string()
            .matches(/^[0-9]+$/, 'Phone number must contain only digits')
            .min(10, 'Phone number must be at least 10 characters')
            .required('Phone number is required'),
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        validationSchema.validate(formData) // set abortEarly to false to get all validation errors
            .then(() => {
                authStore.addUser(formData)
                console.log('Form data:', formData);
                handleClose();
                setFormData({
                    name: '',
                    username: '',
                    address: '',
                    phoneNumber: ''
                }); // Clear form fields after successful submission

                setFormErrors({ // Clear form errors after successful submission
                    name: '',
                    username: '',
                    address: '',
                    phoneNumber: ''
                });
                window.location.reload();
                // authStore.displayUser(); // Update user data
            })
            .catch((error) => {
                const newErrors = {};
                error.inner.forEach((fieldError) => {
                    newErrors[fieldError.path] = fieldError.message;
                });
                setFormErrors(newErrors); // Update form errors state with validation errors
            });
    };

    console.log(user, 'uuuuuuuuuuuuuuuuuuuuuuuuuuuu')
    // ---------------update
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const [updateFormData, setUpdateFormData] = useState({
        name: '',
        username: '',
        phoneNumber: '',
        address: '',
    });

    const handleUpdate = (item: IUser) => {
        setUpdateFormData({
            name: item.name,
            username: item.username,
            phoneNumber: item.phoneNumber,
            address: item.address,
        });
        setOpenUpdateDialog(true);
    };

    const handleUpdateClose = () => {
        setOpenUpdateDialog(false);
    };



    const handleUpdateChange = (event) => {
        const { name, value } = event.target;
        setUpdateFormData({
            ...updateFormData,
            [name]: value,
        });
    };

    const handleUpdateSubmit = () => {
        authStore.update(id, updateFormData).then(()=>{
            authStore.getUser()
        })
        console.log('Updated Data:', updateFormData)
      
        handleUpdateClose(); // Close the dialog after update
        window.location.reload();
    };


    
    useEffect(() => {
        const fetchCounts = async () => {
    
          const updateCount = await authStore.getUpdateCount();
          setAddCount(addCount); // Set addCount state with the fetched value
          setUpdateCount(updateCount);
        };
        fetchCounts();
      }, [authStore]);
    return (
        <div className='login'>

      <div  style={{ color: 'black' }}>Update Api Count: {authStore?.updateCount}</div>

            <div>
                <Dialog open={openUpdateDialog} onClose={handleUpdateClose}>
                    <DialogTitle>Update User</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={updateFormData.name}
                            onChange={handleUpdateChange}
                        />
                        <TextField
                            fullWidth
                            id="username"
                            name="username"
                            label="Username"
                            value={updateFormData.username}
                            onChange={handleUpdateChange}
                        />
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            value={updateFormData.address}
                            onChange={handleUpdateChange}
                        />
                        <TextField
                            fullWidth
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            value={updateFormData.phoneNumber}
                            onChange={handleUpdateChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleUpdateSubmit} variant="contained">Submit</Button>
                        <Button onClick={handleUpdateClose} variant="contained">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <button onClick={handleOnAdd}>Add user</button>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
                            error={Boolean(formErrors.name)}
                            helperText={formErrors.name}
                        />
                        <TextField
                            fullWidth
                            id="username"
                            name="username"
                            label="Username"
                            value={formData.username}
                            onChange={handleChange}
                            error={Boolean(formErrors.username)}
                            helperText={formErrors.username}
                        />
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            value={formData.address}
                            onChange={handleChange}
                            error={Boolean(formErrors.address)}
                            helperText={formErrors.address}
                        />
                        <TextField
                            fullWidth
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            error={Boolean(formErrors.phoneNumber)}
                            helperText={formErrors.phoneNumber}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmit} variant="contained">Submit</Button>
                        <Button onClick={handleClose} variant="contained">Cancel</Button>
                    </DialogActions>
                </Dialog>

                <div className='table-container'>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell>Action</TableCell> {/* This column will have the Update button */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.isArray(user) && user?.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell style={{ color: 'black' }}>{item?.username}</TableCell>
                                        <TableCell style={{ color: 'black' }}>{item?.address}</TableCell>
                                        <TableCell style={{ color: 'black' }}>{item?.name}</TableCell>
                                        <TableCell style={{ color: 'black' }}>{item?.phoneNumber}</TableCell>
                               
                                        {/* <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.lastLogin}</TableCell> */}
                                        <TableCell>
                                            <Button variant="contained" onClick={() => handleUpdatebutton(item._id)}>Update</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
});
