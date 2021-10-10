import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Message from './Message';

export default function Name(props) {

  const [recipeId, setRecipeId] = useState('')
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false);
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
      const response = await fetch('http://localhost:5000/api/recipe/' + recipeId, requestOptions);
      const data = await response.json();
      if(data.code === 11000) {
        console.log('already exists')
      } else {
        setDisabled(true)
        if(recipeId === '') {
          setRecipeId(data)
          props.setRecipeId(data)
        }

        setOpen(true)
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
            autoFocus={true}
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
      <Message open={open} setOpen={setOpen} />
    </Box>
  )
}