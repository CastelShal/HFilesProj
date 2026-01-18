'use client';

import { useState } from 'react';

export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const phoneRegex = /^[+0-9]+$/;
    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!email) newErrors.email = 'Email is required';
        if (!gender) newErrors.gender = 'Gender is required';
        if (!phoneNo || !phoneRegex.test(phoneNo)) newErrors.phoneNo = 'Please enter appropriate Phone No.';
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 8 || password.length > 20) newErrors.password = 'Password must be 8-20 characters long';
        if (!confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
        else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const response = await fetch('http://localhost:5240/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, gender, phoneNo, password }),
                credentials: 'include'
            });
            if (response.ok) {
                // Handle success, e.g., redirect to login
                window.location.href = '/login';
            } else {
                const errorData = await response.json();
                if (errorData.errorType === 'DUPLICATE_EMAIL') {
                    setErrors({ email: 'Email already exists' });
                } else {
                    setErrors({ general: 'Signup failed' });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors({ general: 'An error occurred' });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            pattern='^[A-Za-z]+$'
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">Phone Number:</label>
                        <input
                            type="tel"
                            pattern="^+[0-9]+$"
                            id="phoneNo"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                        {errors.phoneNo && <span className="text-red-500 text-sm">{errors.phoneNo}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password: (8-20 characters, alphanumeric)</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                        {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
                    </div>
                    {errors.general && <div className="mb-4 text-red-500 text-sm">{errors.general}</div>}
                    <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign Up</button>
                </form>
            </div>
        </div>
    );
}