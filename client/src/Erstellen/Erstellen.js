import { useState, useRef } from 'react';

import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ImagePlaceholder from './imagePlaceholder.jpg'

function SaveName() {

  const name = useRef(false)
 
  const handleClick = async function (e) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "name": name.current.value,
        "quantity": 4,
        "imageUrl": "https://test.de"
      })
    };
    const response = await fetch('http://localhost:5000/recipe', requestOptions);
    const data = await response.json();
    console.log(data)
  }

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={10}>
          <TextField
            inputRef={name}
            sx={{
              width: '100%',
              height: '100%',
            }}
            label="Rezeptname eingeben"
            variant="standard"
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton
            onClick={handleClick}
            color="primary"
            aria-label="Name Speichern"
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'right',
              '& svg': {
                fontSize: 45
              },
              padding: 0,
            }}
          >
            <CheckCircleOutlineIcon />
          </IconButton>
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
      <Img
        src={image}
        alt="recipe image"
      />
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
    <Container sx={{
      paddingTop: 2
    }}>
      <SaveName />
      <ImageUpload />
      {Items}
    </Container>
  );
}