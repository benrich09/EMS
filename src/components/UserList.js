// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Employees</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.name} ({user.role})</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
