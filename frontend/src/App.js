import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';
import AppBar from './components/AppBar';
import { setUser } from "./store/auth.js";
import Loading from "./components/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");

  const dispatch = useDispatch();

  async function fetchUser() {
    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (res.ok) {
      const user = await res.json();
      dispatch(setUser(user));
    }
    setIsLoading(false);
  }


  useEffect(() => {
    fetchUser();
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <AppBar />
      <Outlet />
    </div>
  );
}

export default App;
