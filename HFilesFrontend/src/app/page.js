'use client'

import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    async function ensureLogin() {
      const resp = await fetch("http://localhost:5240/user", {
        method: 'GET',
        credentials: 'include'
      });
      if (resp.status == 401) {
        window.location.replace(new URL("login", window.location))
      }
      else {
        window.location.replace(new URL("dashboard", window.location));
      }
    }
      ensureLogin().catch(e => alert("Cannot connect to server"));
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome</h1>
        <p className="text-lg text-gray-600 mb-8">Redirecting you to your destination...</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    </div>
  );
}
