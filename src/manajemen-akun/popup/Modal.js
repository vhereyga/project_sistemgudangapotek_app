// Modal.js

import React from 'react';
import './Modal.css'; // Optional: Add your modal styles

const Modal = ({ isOpen, onClose, onSubmit, accountDetails, setAccountDetails }) => {
    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccountDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{accountDetails.isEditing ? "Edit Akun" : "Tambah Akun"}</h3>
                <input 
                    type="text" 
                    name="username" 
                    value={accountDetails.username} 
                    onChange={handleChange} 
                    placeholder="Masukkan Username" 
                />
             
                <input 
                    type="password" 
                    name="password" 
                    value={accountDetails.password} 
                    onChange={handleChange} 
                    placeholder="Masukkan Password" 
                />
                <div className="modal-button-container">
                    <button onClick={() => onSubmit(accountDetails)}>Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
