import { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import ImagePlaceholder from './imagePlaceholder.jpg'

import Button from '@mui/material/Button';

export default function SaveName(props) {

  const [recipeId, setRecipeId] = useState('')
  const [name, setName] = useState('')
  const [disabled, setDisabled] = useState(true)

  const handleChange = e => {
    setName(e.target.value);
  };

  const handleClick = async function (e) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "name": name
      })
    };
    try {
      const response = await fetch('http://localhost:5000/recipe/' + recipeId, requestOptions);
      const data = await response.json();
      if(data.code === 11000) {
        console.log('already exists')
      } else {
        setDisabled(true)
        if(recipeId === '') {
          setRecipeId(data)
          props.setRecipeId(data)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    name === "" ? setDisabled(true) : setDisabled(false)
  }, [name, setDisabled])

  return (
    <Box sx={{ paddingTop: 2 }}>
      <Grid container spacing={0}>
        <Grid item xs={9}>
          <TextField
            value={name}
            sx={{ width: '100%', height: '100%' }}
            label="Rezeptname eingeben"
            variant="standard"
            onChange={handleChange}
          />
        </Grid >
        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
          <Button disabled={disabled} variant="contained" onClick={handleClick} sx={{ height: '80%' }} >
            PUSH
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}