import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{ backgroundColor: 'white', borderBottom: '1px solid #efe8e8cd' }}
      >
        <Toolbar
          sx={{ mr: 2, display: 'flex', justifyContent: 'space-between' }}
        >
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ color: 'primary.main' }} />
          </IconButton>

          <Button variant='outlined'>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
