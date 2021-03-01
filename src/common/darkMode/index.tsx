import React, { useState } from "react";
import { DarkImgData, LightImgData } from "./ImageData";
import './darkMode.scss';

interface DarkModeProps {
  onClick : () => void
}

const DarkMode = () => {
  const [dark, setDark] = useState<boolean>(false);

  const onClick = () => {
    setDark(!dark);
    if(!dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

  }

  return (
    <div className="DarkMode" onClick={onClick}>
      <img src={dark ? DarkImgData : LightImgData} alt="Update Theme" />
      <p>{dark? 'Dark ' : 'Light '} Mode</p>
    </div>
  )
}

export default DarkMode;