import React from 'react'
import { memo } from 'react'
import { Paper,ImageList,Typography, ImageListItem, Button } from '@mui/material'
import { orange } from '@mui/material/colors'
const FavouriteRecipe = (props) => {
  console.log('----Favourite Receipe Component---')
    let {id, title, image,removeFavorite}=props
  return (
    <Paper elevation={5} sx={{textAlign:'center',width:250, height:300, backgroundColor:orange[600]}}>
      <Typography sx={{}} variant='subtitle1'>{title}</Typography>
       <Button onClick={removeFavorite} sx={{ml:2,backgroundColor:'secondary'}}  variant="contained">Remove to Favourite</Button>
      <ImageList sx={{ width: 755, height: 600 }} cols={3} rowHeight={174}>

        <ImageListItem key={id}><img src={image} alt='Images'/></ImageListItem>
        
      </ImageList>
      
    </Paper>
  )
}

export default memo(FavouriteRecipe)