import React, { useEffect, useState } from 'react'
import {Grid, Box, TextField, Button,Typography } from '@mui/material'
import { red } from '@mui/material/colors'
const SearchBar = (props) => {
    let [searchValue,updateSearch]=useState('')
    let {getSearchData,APICallSuccess,setAPICallSuccess}=props
    let handleSearch=(e)=>
    {
        let {value}=e.target
        updateSearch(value)
    }
    let handleSubmit=(e)=>
    {
        e.preventDefault();
        getSearchData(searchValue)
    }
    useEffect(()=>{
        updateSearch('');
        setAPICallSuccess(false);
    },[APICallSuccess, setAPICallSuccess])
    console.log('----Search Component---')
  return (
    <>
    <Grid container spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
>
    <Grid item md={12} >
    <Typography style={{padding:5}} variant='h3'>This is Food Recipes APP </Typography>
    <Grid item md={12} style={{marginLeft:130,padding:5}}>
    <Box justifyContent="center"  component="form" onSubmit={handleSubmit}>
        {/* <form onSubmit={handleSubmit}> */}
            {/* <input onChange={handleSearch} value={searchValue}/> */}
            <TextField fullWidth variant="outlined" sx={{ml:-6,backgroundColor:'white',display:'block'}} onChange={handleSearch} placeholder='Search'></TextField>
            {/* <button type='submit'>Submit</button> */}
            <Button size="medium" sx={{ml:9,mt:2,backgroundColor:red[600]}} type='submit' variant="contained">Search</Button>
        {/* </form> */}

    </Box>
    </Grid>
    </Grid>
    </Grid>
    </>
  )
}

export default SearchBar;