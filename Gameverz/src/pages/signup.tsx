import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Stack,
    InputLabel,
    Avatar,
} from '@mui/material';


const Signup: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(null);
        setSuccess(null);
    };
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    console.log(baseURL)
    const dashboardURL = `${baseURL}/accounts/signup/`;

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfilePhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const { username, email, password, confirmPassword } = formData;
    
        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }
    
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
    
        if (!profilePhoto) {
            setError('Please upload a profile photo.');
            return;
        }
    
        const signupData = new FormData();
        signupData.append('username', username);
        signupData.append('email', email);
        signupData.append('password', password);
        signupData.append('confirmPassword', confirmPassword); // <-- important
        signupData.append('profile', profilePhoto); // match Django's 'profile'
    
        const response = await fetch(dashboardURL, {
            method: "POST",
            credentials: "include",
            body: signupData, // DON'T stringify this
            // DON'T set Content-Type manually
        });
    
        const data = await response.json();
        console.log("Django response:", data);
    
        if (response.ok) {
            if (data['status']==="success"){
                setSuccess('Signup successful!');
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                setProfilePhoto(null);
                setPreviewUrl(null);
            }else{
                setError(data['message'])
            }
        } else {
            setError(data.message || 'Signup failed.');
        }
    };
    
    return (
        <Box
            sx={{
                maxWidth: 400,
                mx: 'auto',
                mt: 6,
                p: 4,
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
            }}
        >
            <Typography variant="h5" gutterBottom textAlign="center">
                Sign Up
            </Typography>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Stack spacing={2}>
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                    />
                    <div>
                        <InputLabel sx={{ mb: 1 }}>Profile Photo</InputLabel>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                        {previewUrl && (
                            <Box mt={2} textAlign="center">
                                <Avatar
                                    src={previewUrl}
                                    alt="Preview"
                                    sx={{ width: 80, height: 80, mx: 'auto' }}
                                />
                                <Typography variant="caption" display="block" mt={1}>
                                    Preview
                                </Typography>
                            </Box>
                        )}
                    </div>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Sign Up
                    </Button>
                </Stack>
            </form>

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {success}
                </Alert>
            )}
        </Box>
    );
};

export default Signup;
