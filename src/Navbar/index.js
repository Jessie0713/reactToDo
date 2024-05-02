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
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import {
  signUp,
  confirmSignUp,
  autoSignIn,
  signIn,
  SignInInput,
  getCurrentUser,
  signOut,
} from 'aws-amplify/auth'
import { Amplify } from 'aws-amplify'
export default function Navbar() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
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

          <Button variant='outlined' onClick={handleClickOpen}>
            Login
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
                  let username = 'jessie07133@gmail.com'
                  let confirmationCode = '671987'
                  let password = '1Qaz@wsx'
                  // 1. sign up
                  // try {
                  //   const { isSignUpComplete, userId, nextStep } = await signUp(
                  //     {
                  //       username,
                  //       password,
                  //       options: {
                  //         userAttributes: {
                  //           email: username,
                  //         },
                  //         // optional
                  //         autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
                  //       },
                  //     }
                  //   )

                  //   console.log(userId)
                  // } catch (error) {
                  //   console.log('error signing up:', error)
                  // }

                  // 2.sign up complete
                  // try {
                  //   const { isSignUpComplete, nextStep } = await confirmSignUp({
                  //     username,
                  //     confirmationCode,
                  //   })
                  // } catch (error) {
                  //   console.log('error confirming sign up', error)
                  // }

                  //3.
                  // try {
                  //   const signInOutput = await autoSignIn()
                  //   // handle sign-in steps
                  // } catch (error) {
                  //   console.log(error)
                  // }

                  // try {
                  //   const { username, userId, signInDetails } =
                  //     await getCurrentUser()
                  //   console.log(`The username: ${username}`)
                  //   console.log(`The userId: ${userId}`)
                  //   console.log(`The signInDetails: ${signInDetails}`)
                  // } catch (err) {
                  //   console.log(err)
                  // }

                  // 4.sign in
                  // try {
                  //   const { isSignedIn, nextStep } = await signIn({
                  //     username,
                  //     password,
                  //   })
                  // } catch (error) {
                  //   console.log('error signing in', error)
                  // }
                  // try {
                  //   await signOut()
                  // } catch (error) {
                  //   console.log('error signing out: ', error)
                  // }
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
