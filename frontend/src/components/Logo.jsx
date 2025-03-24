import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../assets/mangadex-logo.svg";
import wordmark from "../assets/mangadex-wordmark.svg";

const Logo = ({ isScrolled, applyFilter }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

  return (
    <div
    onClick={handleClick}
    className='flex text-3xl cursor-pointer'>
        <img className='ml-4 mr-1' src={logo} alt="logo" />
        <img className={`transition-all duration-300 ${!applyFilter ? (isScrolled ? 'invert md:invert-0' : 'invert-0 md:invert') : ''}`} src={wordmark} alt="wordmark" />
    </div>
  )
}

export default Logo