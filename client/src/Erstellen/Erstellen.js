import { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import ImagePlaceholder from './imagePlaceholder.jpg'

import Button from '@mui/material/Button';

function SaveName() {

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
        setRecipeId(data)
        setDisabled(true)
        console.log(data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    name === "" ? setDisabled(true) : setDisabled(false)
  }, [name, setDisabled])

  return (
    <Box>
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

const Input = styled('input')({
  display: 'none',
});

const Img = styled('img')({
  width: '100%',
  marginTop: 30,
  borderRadius: 10,
});

function ImageUpload() {

  const [image, setImage] = useState(ImagePlaceholder)

  const handleChange = e => {
    console.log(e.target.id);
    if (image === ImagePlaceholder) {
      setImage("https://d3lut3gzcpx87s.cloudfront.net/image_encoded/aHR0cHM6Ly9zaWxrc3RhcnQuczMuYW1hem9uYXdzLmNvbS8xZjk2ZjdhZS1kNzExLTQwMzAtYTU3My05MjEyYTY0NDg2NmUuanBn/1600x1000")
    } else {
      setImage("https://mui.com/static/images/cards/paella.jpg")
    }
  }

  return (
    <label htmlFor="contained-button-file">
      <Input accept="image/*" id="contained-button-file" onChange={handleChange} type="file" />
      <Img src={image} alt="recipe image" />
    </label>

  );
}

function ZutatContainer() {
  return (
    <p>test</p>
  )
}

export default function Erstellen() {

  const items = [1, 2, 3]

  const Items = items.map((x, i) =>
    <ZutatContainer value={x} key={i} />
  )

  return (
    <Container sx={{ paddingTop: 2 }}>
      <SaveName />
      <ImageUpload />
      {Items}
    </Container>
  );
}