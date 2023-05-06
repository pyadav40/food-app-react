import React, { useContext } from 'react'
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { themeContext } from '../App';
const ThemeSelector = () => {
    const {theme, setTheme}=useContext(themeContext)
    console.log('----Theme Selector Component---')
  return (
    <div onClick={()=>setTheme(!theme)} style={{justifyItems:'center'}}>
      {theme?<ToggleOffIcon fontSize="large" color='info'/>:<ToggleOnIcon fontSize="large" color='warning'/>}
      </div>
  )
}

export default ThemeSelector