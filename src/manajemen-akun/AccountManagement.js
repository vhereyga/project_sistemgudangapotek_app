import React, { useState } from 'react';
import './AccountManagement.css';
import { useNavigate } from 'react-router-dom';
import Modal from './popup/Modal.js';

function AccountManagement() {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState({
        admin: ['admin1'],
        employees: [
            { username: 'Bayu', password: 'password1' },
            { username: 'Theo', password: 'password2' },
            { username: 'Nur' , password: 'password3' },
            { username: 'Aji', password: 'password4' },
        ],
    });
    
    const [modalOpen, setModalOpen] = useState(false);
    const [accountDetails, setAccountDetails] = useState({ username: '', password: '', isEditing: false });
    const [selectedEmployee, setSelectedEmployee] = useState('');

    const handleOpenModal = (isEditing) => {
        if (isEditing) {
            const selected = accounts.employees.find(emp => emp.username === selectedEmployee);
            if (selected) {
                setAccountDetails({ ...selected, isEditing: true });
            }
        } else {
            setAccountDetails({ username: '', password: '', isEditing: false });
        }
        setModalOpen(true);
    };

    const handleAddOrUpdateAccount = (details) => {
        const { username, password, isEditing } = details;

        // Basic validation
        if (!username || !password) {
            alert('Please fill in all fields.');
            return;
        }

        if (isEditing) {
            const updatedEmployees = accounts.employees.map(emp =>
                emp.username === selectedEmployee ? { username, password } : emp
            );
            setAccounts({ ...accounts, employees: updatedEmployees });
        } else {
            setAccounts(prevAccounts => ({
                ...prevAccounts,
                employees: [...prevAccounts.employees, { username, password }]
            }));
        }

        setModalOpen(false); // Close modal after submission
        setAccountDetails({ username: '', password: '', isEditing: false }); // Reset input fields
    };

    const handleDeleteAccount = (usernameToDelete) => {
        const updatedEmployees = accounts.employees.filter(emp => emp.username !== usernameToDelete);
        setAccounts({ ...accounts, employees: updatedEmployees });
        if (selectedEmployee === usernameToDelete) {
            setSelectedEmployee(''); // Reset selected employee if deleted
        }
    };

    const handleHomeClick = () => {
        navigate('/index');
    };

    return (
        <div className="account-management-container">
            <div className="home-button">
                <button onClick={handleHomeClick}>🏠 Home</button>
            </div>
            <h2 className="title-account">DAFTAR AKUN</h2>
            <div className="account-section">
                <div className="admin-section">
                    <h3>ADMINISTRATOR</h3>
                    <ul>
                        {accounts.admin.map((admin, index) => (
                            <li key={index} className="account-item">• @{admin}</li>
                        ))}
                    </ul>
                </div>
                <div className="employee-section">
                    <h3>KARYAWAN</h3>
                    <ul>
                        {accounts.employees.map((employee, index) => (
                            <li key={index} className="account-item">• @{employee.username}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="button-container">
                <select 
                    value={selectedEmployee} 
                    onChange={(e) => setSelectedEmployee(e.target.value)} 
                    style={{ width: '150px', height: '50px', margin:'8px' }}
                >
                    <option value="">Pilih Karyawan Untuk di Edit</option>
                    {accounts.employees.map((employee, index) => (
                        <option key={index} value={employee.username}>@{employee.username}</option>
                    ))}
                </select>

                <button onClick={() => handleOpenModal(true)}>Edit Akun</button>
                <button onClick={() => handleOpenModal(false)}>Tambah Akun</button>
                <button onClick={() => handleDeleteAccount(selectedEmployee)} disabled={!selectedEmployee}>
                    Hapus Akun
                </button>
            </div>
            <Modal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                onSubmit={handleAddOrUpdateAccount} 
                accountDetails={accountDetails} 
                setAccountDetails={setAccountDetails}
            />
        </div>
    );
}

export default AccountManagement;
