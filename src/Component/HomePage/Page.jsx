import React, { useEffect,useContext, useReducer, useState, useCallback, useMemo } from 'react'
import SearchBar from '../SearchBar'
import ReceipeItem from '../Receipe/ReceipeItem';
import { Grid, TextField, Typography,Box } from '@mui/material'
import { lightGreen, cyan,grey } from '@mui/material/colors';

import FavouriteRecipe from '../Receipe/FavouriteRecipe';
import { themeContext } from '../../App';

const style={dark:{backgroundColor:grey[800],color:'white'}, light:{backgroundColor:grey[300],color:'black'}}

///API https://api.spoonacular.com/recipes/complexSearch  API Key: 3169bffd3a644e0bb30bcffa42e3f355
const reducer = (state, action) => {
  switch (action.type) {
    case 'filterFavourite':
      // console.log(action)
      return { ...state, filterValue: action.value };
    default:
      return state

  }
}
const initState = { filterValue: "" };
const Page = () => {
  // loading State
  let [loadingState, setLoadingState] = useState(false);
  // Save result receive from API
  let [receips, setreceips] = useState([])
  //favourites data state
  let [favourites, setfavourites] = useState([])
  //API successful called or not
  let [APICallSuccess, setAPICallSuccess] = useState(false)
  //Favorutite Data state
  let [favouriteState, dispatch] = useReducer(reducer, initState)
  ////use Context for theme selction
  const {theme}=useContext(themeContext)

  console.log('----Page Component---')
  let getSearchData = (data) => {

    // keep the loading state truee before calling API
    setLoadingState(true);
    async function getApi() {
      const fetchdata = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=3169bffd3a644e0bb30bcffa42e3f355&query=${data}`)
      const res = await fetchdata.json();
      const { results } = res;
      if (results && results.length > 0) {
        //set laoding state false
        setLoadingState(false);

        setAPICallSuccess(true)
        setreceips(results);

      }
    }
    getApi()
  }
  /// add data in favorites

  const addfavourites = useCallback((getCurrent)=>{
    const cpyFavourite = [...favourites]
    const index = cpyFavourite.findIndex(item => item.id === getCurrent.id);
    if (index === -1) {
      cpyFavourite.push(getCurrent)
      setfavourites(cpyFavourite)

      /*save favourites in local storage
        localStorage.setItem(key,value)  */
      localStorage.setItem("favourites", JSON.stringify(cpyFavourite))
      window.scrollTo({top:'12',behaviour:'smooth'})
    }
    else { alert("item already in favourite") }
  },[favourites])
  
 
  /// Remove data in favorites
  const removeFavorite = (remid) => {
    let cpyremfav = [...favourites]
    cpyremfav = cpyremfav.filter(item => item.id !== remid)
    setfavourites(cpyremfav)
    localStorage.setItem("favourites", JSON.stringify(cpyremfav))
  }

    const reactRender=useCallback(()=>{
      if (receips && receips.length > 0)
      {
        return (
          receips.map((item,i)=>
            <Grid key={i} item sm={6} md={4}>
              <ReceipeItem addfavourites={() => addfavourites(item)} id={item.id} title={item.title} image={item.image} /></Grid>) 
        )
      }
    },[receips,addfavourites])
  ///set favoruite data in local storage
  useEffect(() => {
    const extractfavlocalStorage = JSON.parse(localStorage.getItem('favourites'))
    setfavourites(extractfavlocalStorage)
  }, [APICallSuccess,setAPICallSuccess])

  const filterFavourite = favourites.filter(item => item.title.toLowerCase().includes(favouriteState.filterValue))
  return (
    <Grid container style={{ gap: 15  }}>
      <SearchBar APICallSuccess={APICallSuccess} setAPICallSuccess={setAPICallSuccess} getSearchData={getSearchData} />
      {loadingState && <div>Page is Loading ! Please wait</div>}

      {/* map all recipes */}

      <Grid container alignItems="center" justifyContent="center" p={4}   sx={theme?style.light:style.dark} spacing={{ sm: 2, md: 1 }} >
        {/* <Grid item sm={12} md={12}> */}
        <Box display="flex" justifyContent="center">
          <Typography variant='h5'>This is Favourite Section</Typography>
          </Box>
        {/* </Grid> */}
        {/*Favoruite Input Search */}
        <Grid display="flex" justifyContent="center" item sm={12} md={12} sx={theme?style.light:style.dark}>
          <TextField onChange={(e) => dispatch({ type: "filterFavourite", value: e.target.value })} variant="outlined" sx={{ display: 'block', padding: 1 }} placeholder='Search'></TextField>
        </Grid>
        {!filterFavourite.length && <Typography variant='h5'>No Favourites Item Foud</Typography>}
        {filterFavourite && filterFavourite.length > 0 ?filterFavourite.map((item,i) => <Grid key={i} item sm={6} md={4}><FavouriteRecipe removeFavorite={() => removeFavorite(item.id)} id={item.id} title={item.title} image={item.image} /></Grid>) : null}
      </Grid>
      <Grid container alignItems="center" justifyContent="center" p={5} sx={theme?style.light:style.dark}  spacing={{ sm: 2, md: 1 }}>
        <Grid item sm={12} md={12}>
          <Typography variant='h5'>Recipe Section</Typography>
        </Grid>
        {/* {reactRender()} */}
        {!receips.length && <Typography variant='h5'>No Receipes are Foud</Typography>}
        {useMemo(()=>(
          !loadingState && receips && receips.length > 0 ?
          receips.map((item,i)=>
            <Grid key={i} item sm={6} md={4}>
              <ReceipeItem addfavourites={() => addfavourites(item)} id={item.id} title={item.title} image={item.image} /></Grid>) : null),[loadingState,receips,addfavourites])
        }
      </Grid>
    </Grid>
  )
}
export default Page