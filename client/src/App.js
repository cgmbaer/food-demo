import { useState } from 'react';
import { Link, Route, BrowserRouter } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TodayIcon from '@mui/icons-material/Today';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppleIcon from '@mui/icons-material/Apple';

import Kochbuch from './Kochbuch/Kochbuch';
import Einkauf from './Einkauf/Einkauf';
import Kalender from './Kalender/Kalender';
import Zutaten from './Zutaten/Zutaten';
import Erstellen from './Erstellen/Erstellen';

export default function App() {

  const [state, setState] = useState('kochbuch');

  const handleChange = (event, newValue) => {
    setState(newValue);
  }

  return (
    <BrowserRouter>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation value={state} onChange={handleChange}>
          <BottomNavigationAction
            label="Kochbuch"
            value="kochbuch"
            to="/"
            icon={<MenuBookIcon />}
            component={Link}
          />
          <BottomNavigationAction
            label="Einkauf"
            value="einkauf"
            to="/einkauf"
            icon={<ShoppingCartIcon />}
            component={Link}
          />
          <BottomNavigationAction
            label="Kalender"
            value="kalender"
            to="/kalender"
            icon={<TodayIcon />}
            component={Link}
          />
          <BottomNavigationAction
            label="Zutaten"
            value="zutaten"
            to="/zutaten"
            icon={<AppleIcon />}
            component={Link}
          />
        </BottomNavigation>
      </Paper>
      <Route exact path='/'><Kochbuch /></Route>
      <Route path='/einkauf'><Einkauf /></Route>
      <Route path='/kalender'><Kalender /></Route>
      <Route path='/zutaten'><Zutaten /></Route>
      <Route path='/erstellen'><Erstellen /></Route>
    </BrowserRouter>
  );
}