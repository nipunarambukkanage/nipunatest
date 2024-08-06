import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import AboutMe from './components/AboutMe';
import MySchool from './components/MySchool';
import MyVillage from './components/MyVillage';
import MyAchievements from './components/MyAchievements';
import { AppBar, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { AccountCircleRounded, BlurOnRounded, CelebrationRounded, HolidayVillageRounded, HomeRounded, MenuOpen, SchoolRounded } from '@mui/icons-material';

import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

import './App.css';
import logo from './logo.svg';
import ParticlesPage from './components/ParticlesPage';

const DrawerItems = [
  { text: 'Home', icon: <HomeRounded />, path: '/' },
  { text: 'User Profile', icon: <AccountCircleRounded />, path: '/user-profile' },
  { text: 'My School', icon: <SchoolRounded />, path: '/my-school' },
  { text: 'My Village', icon: <HolidayVillageRounded />, path: '/my-village' },
  { text: 'My Achievements', icon: <CelebrationRounded />, path: '/my-achievements' },
  { text: 'Particles', icon: <BlurOnRounded />, path: '/particles' },
];

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Router>
      <div className="App" style={{ position: 'relative' }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 10 }}
          options={{
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: { enable: true, mode: 'push' },
                onHover: { enable: true, mode: 'repulse' },
                resize: true,
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 100, duration: 0.4 },
              },
            },
            particles: {
              color: { value: '#ffffff' },
              links: {
                color: '#ffffff',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: { enable: true },
              move: {
                direction: 'none',
                enable: true,
                outMode: 'bounce',
                random: false,
                speed: 6,
                straight: false,
              },
              number: { density: { enable: true, value_area: 800 }, value: 80 },
              opacity: { value: 0.5 },
              shape: { type: 'circle' },
              size: { random: true, value: 5 },
            },
            detectRetina: true,
          }}
        />
        <AppBar position="sticky">
          <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton aria-label='menu' onClick={toggleDrawer}>
                <MenuOpen />
              </IconButton>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                My Simple Web App
              </Typography>
            </div>
            <nav>
              <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
                <li>
                  <Link to="/user-profile" style={{ color: 'white', textDecoration: 'none' }}>User Profile</Link>
                </li>
                <li>
                  <Link to="/about-me" style={{ color: 'white', textDecoration: 'none' }}>About Me</Link>
                </li>
                <li>
                  <Link to="/my-school" style={{ color: 'white', textDecoration: 'none' }}>My School</Link>
                </li>
                <li>
                  <Link to="/my-village" style={{ color: 'white', textDecoration: 'none' }}>My Village</Link>
                </li>
                <li>
                  <Link to="/my-achievements" style={{ color: 'white', textDecoration: 'none' }}>My Achievements</Link>
                </li>
              </ul>
            </nav>
          </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
          <List>
            {DrawerItems.map((item) => (
              <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleDrawer}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/my-school" element={<MySchool />} />
          <Route path="/my-village" element={<MyVillage />} />
          <Route path="/my-achievements" element={<MyAchievements />} />
          <Route path="/particles" element={<ParticlesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
