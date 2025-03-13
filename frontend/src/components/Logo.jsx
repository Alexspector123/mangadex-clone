import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../assets/mangadex-logo.svg";
import wordmark from "../assets/mangadex-wordmark.svg";

const Logo = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

  return (
    <div
    onClick={handleClick}
    className='flex text-3xl cursor-pointer'>
        <img className='mx-1' src={logo} alt="logo" />
        <img src={wordmark} alt="wordmark" />
    </div>
  )
}

export default Logo