import { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import SaveName from './Name'

const Input = styled('input')({
  display: 'none'
});

const Img = styled('img')({
  width: '168px',
  height: '126px',
  borderRadius: '16px',
});

function ImageBox(props) {

  const [image, setImage] = useState(null)

  const handleChange = async e => {
    if (e.target.files.length > 0) {
      let fd = new FormData()
      fd.append('recipeId', props.recipeId)
      fd.append('type', props.id)
      fd.append('image', e.target.files[0])

      try {
        const res = await fetch('http://localhost:5000/api/uploadImage', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: fd
        })
        const fn = await res.json()
        console.log(fn)
        setImage('http://localhost:5000/static/' + props.id + '/' + fn)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid ',
      width: '160px',
      height: '120px',
      borderRadius: '16px',
      borderColor: '#1976d2'
    }}>
      <label htmlFor={props.id}>
        <Input accept="image/*" id={props.id} onChange={handleChange} type="file" />
        {!image ? (<IconButton color="primary" component="span">
          <AddAPhotoIcon sx={{ fontSize: 40 }} />
        </IconButton>) : (
          <Img src={image} alt='add' />
        )}
      </label>
    </Box>
  );
}

function Image(props) {

  return (
    <Grid container spacing={2} sx={{ paddingTop: 2 }}>
      <Grid item xs={6}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button>Gericht</Button>
        </Box>
        <ImageBox recipeId={props.recipeId} id="images" />
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button>Rezept</Button>
        </Box>
        <ImageBox recipeId={props.recipeId} id="recipes" />
      </Grid>
    </Grid>
  );
}

function ZutatContainer() {
  return (
    <p>test</p>
  )
}

export default function Erstellen() {

  const [recipeId, setRecipeId] = useState(null);

  const items = [1, 2, 3]

  const Items = items.map((x, i) =>
    <ZutatContainer value={x} key={i} />
  )

  useEffect(() => {
    console.log(recipeId)
  })

  return (
    <Container>
      <SaveName setRecipeId={setRecipeId} />
      {recipeId ? (
        <Image recipeId={recipeId} />
      ) : null}
      {Items}
    </Container>
  );
}