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
      else{
        window.location.replace(new URL("dashboard",window.location));
      }
    }

    ensureLogin();
  }, [])

  return (
    <></>
  );
}
