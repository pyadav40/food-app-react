 
import Page from './Component/HomePage/Page';
import { useState,createContext } from 'react';
import {Container} from '@mui/material';
import ThemeSelector from './ThemeButton/ThemeSelector';
// sx={{ width:"100vw", height:'100%', backgroundColor:"primary.dark"}}
export const themeContext= createContext(null)
const style={dark:{backgroundColor:'black',color:'white'}, light:{backgroundColor:'white',color:'black'}}
function App() {
  let [theme, setTheme]=useState(null)
  return (
    <themeContext.Provider value={{theme, setTheme}}>
    <Container sx={theme?style.light:style.dark}>
    {/* <Box> */}
      <ThemeSelector/>
    <Page/>
    {/* </Box> */}
    </Container>
    </themeContext.Provider>
  );
}

export default App;
