import React from 'react'
import { Paper,ImageList,Typography, ImageListItem, Button } from '@mui/material'
import { orange } from '@mui/material/colors'
const ReceipeItem = (props) => {
    let {id, title, image, addfavourites}=props
    console.log('----API Receipe Component---')
  return (
    <Paper elevation={5} sx={{textAlign:'center',width:250, height:300, backgroundColor:orange[600]}}>
      <Typography sx={{}} variant='subtitle1'>{title}</Typography>
       <Button onClick={addfavourites} sx={{ml:2,backgroundColor:'secondary'}}  variant="contained">Add to Favourite</Button>
      <ImageList sx={{ width: 755, height: 600 }} cols={3} rowHeight={174}>

        <ImageListItem key={id}><img src={image} alt='Images'/></ImageListItem>
        
      </ImageList>
      
    </Paper>
  )
}

export default ReceipeItem