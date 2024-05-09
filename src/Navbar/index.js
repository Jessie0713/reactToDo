import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { navigate } from 'gatsby'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { signOut } from 'aws-amplify/auth'
import { Amplify } from 'aws-amplify'
export default function Navbar() {
  const [open, setOpen] = React.useState(false)

  const handleLogOut = async () => {
    try {
      await signOut()
      console.log('成功登出')
      await navigate('/')
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

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

          <Button variant='outlined' onClick={handleLogOut}>
            Logout
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>log in</DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography>email : </Typography>
                <TextField size='small' sx={{ ml: '5px' }} variant='standard' />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: '5px' }}>
                <Typography>password : </Typography>
                <TextField size='small' sx={{ ml: '5px' }} variant='standard' />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>close</Button>
              <Button
                onClick={async () => {
                  const currentConfig = Amplify.getConfig()
                  console.log('currentConfig', currentConfig)
                }}
              >
                log in
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
