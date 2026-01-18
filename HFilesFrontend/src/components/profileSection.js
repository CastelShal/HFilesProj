'use client'

import { useEffect, useState } from "react";

export default function ProfileSection() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [fName, setfName] = useState('');
    
    useEffect(() => {
        async function fetchData() {
            const resp = await fetch("http://localhost:5240/user", {
                method: 'GET',
                credentials: 'include'
            });
            if(resp.status == 401){
                window.location.href = "http://localhost:3000/login"
            }
            const json = await resp.json();
            setEmail(json.email || '');
            setPhone(json.phoneNo || '');
            setGender(json.gender || '');
            setfName(json.name || '');
        }

        fetchData();
    }, [])
    const handleSaveProfile = async () => {
        try {
            const resp = await fetch("http://localhost:5240/user", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    gender,
                    phoneNo: phone
                })
            });
            if(resp.status == 401){
                window.location.replace(new URL("/login", window.location))
            }
            else if (resp.ok) {
                alert('Profile saved successfully!');
            } else {
                alert('Failed to save profile');
            }
        } catch (error) {
            alert('Error saving profile');
        }
    };

    return <div className="flex flex-col gap-6">
        <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-200 relative">

            <div className="flex flex-col items-center gap-4 mb-6">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img src='/avatar.png' alt="Ankit k." className="w-full h-full object-cover" />
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-blue-700">{fName}</h2>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email :
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone :
                    </label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender :
                    </label>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={gender === 'Male'}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-sm text-gray-700">Male</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={gender === 'Female'}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-sm text-gray-700">Female</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <button
                    onClick={handleSaveProfile}
                    className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-medium px-8 py-2 rounded-lg transition-colors shadow-md"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
}