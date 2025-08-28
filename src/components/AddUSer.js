import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'employee',
    });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users', form)
            .then(() => alert('User added'))
            .catch(err => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} />
            <select name="role" onChange={handleChange}>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Add User</button>
        </form>
    );
};

export default AddUser;
