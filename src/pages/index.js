import React, { useState, useEffect } from 'react'
import Link from '@mui/material/Link'
import Hider from './component/Hider'

import {
  Box,
  Button,
  TextField,
  Card,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material'
import {
  signUp,
  confirmSignUp,
  autoSignIn,
  signIn,
  SignInInput,
  getCurrentUser,
  signOut,
} from 'aws-amplify/auth'

const IndexPage = () => {
  const [newAccount, setNewAccount] = useState(true)
  const [confirmation, setConfirmation] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newEmail, setnewEmail] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const [confirmationCode, setconfirmationCode] = useState('')
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#efe8e8cd',
      }}
    >
      <Hider show={newAccount}>
        <Card sx={{ borderRadius: '12px' }}>
          <CardContent sx={{ mb: '20px' }}>
            <Typography variant='h3' sx={{ mb: '5px' }}>
              登入
            </Typography>
            <Typography>email : </Typography>
            <TextField
              size='small'
              variant='outlined'
              sx={{ mb: '10px' }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <Typography>密碼 : </Typography>
            <TextField
              size='small'
              variant='outlined'
              value={password}
              type='password'
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </CardContent>
          <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              sx={{ width: '100%', mb: '15px', color: 'white' }}
              variant='contained'
              onClick={async () => {
                console.log(typeof email, typeof password)
                try {
                  const { isSignedIn, nextStep } = await signIn({
                    username: email,
                    password,
                  })
                  console.log('isSignedIn', isSignedIn)
                  const { username } = await getCurrentUser()
                  console.log(`The username: ${username}`)
                  console.log('成功登入')
                } catch (error) {
                  console.log('error signing in', error)
                }
                // try {
                //   await signOut()
                // } catch (error) {
                //   console.log('error signing out: ', error)
                // }
              }}
            >
              登入
            </Button>
            <Button
              sx={{ width: '100%' }}
              variant='outlined'
              onClick={() => {
                setNewAccount(false)
              }}
            >
              創建一個新帳戶
            </Button>
          </CardActions>
        </Card>
        <Hider show={confirmation}>
          <Card sx={{ borderRadius: '12px' }}>
            <CardContent sx={{ mb: '20px' }}>
              <Typography variant='h3' sx={{ mb: '5px' }}>
                註冊
              </Typography>
              <Typography>email : </Typography>
              <TextField
                size='small'
                variant='outlined'
                sx={{ mb: '10px' }}
                value={newEmail}
                onChange={(e) => {
                  setnewEmail(e.target.value)
                }}
              />
              <Typography>密碼 : </Typography>
              <TextField
                size='small'
                variant='outlined'
                value={newPassword}
                onChange={(e) => {
                  setnewPassword(e.target.value)
                }}
              />
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                sx={{ width: '100%', mb: '15px', color: 'white' }}
                variant='contained'
                onClick={async () => {
                  console.log(newEmail, newPassword)
                  setConfirmation(false)
                  try {
                    const { isSignUpComplete, userId, nextStep } = await signUp(
                      {
                        username: newEmail,
                        password: newPassword,
                        options: {
                          userAttributes: {
                            email: newEmail,
                          },
                          // optional
                          autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
                        },
                      }
                    )

                    console.log(userId)
                  } catch (error) {
                    console.log('error signing up:', error)
                  }
                }}
              >
                驗證電子郵件地址
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ borderRadius: '12px' }}>
            <CardContent sx={{ mb: '20px' }}>
              <Typography variant='h3' sx={{ mb: '5px' }}>
                輸入驗證碼
              </Typography>
              <TextField
                size='small'
                variant='outlined'
                sx={{ mb: '10px' }}
                value={confirmationCode}
                onChange={(e) => {
                  setconfirmationCode(e.target.value)
                }}
              />
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                sx={{ width: '100%', mb: '15px', color: 'white' }}
                variant='contained'
                onClick={async () => {
                  console.log('confirmation code', confirmationCode)
                  try {
                    const { isSignUpComplete, nextStep } = await confirmSignUp({
                      username: newEmail,
                      confirmationCode, //email驗證碼
                    })
                    console.log('isSignUpComplete', isSignUpComplete)
                    if (isSignUpComplete) {
                      try {
                        await autoSignIn()
                        // const { username } = await getCurrentUser()
                        // console.log(`The username: ${username}`)
                        // console.log('成功登入')
                      } catch (error) {
                        console.log(error)
                      }
                    }
                  } catch (error) {
                    console.log('error confirming sign up', error)
                  }
                }}
              >
                確認
              </Button>
            </CardActions>
          </Card>
        </Hider>
      </Hider>
      <Button
        onClick={async () => {
          try {
            await signOut()
            console.log('成功登出')
          } catch (error) {
            console.log('error signing out: ', error)
          }
        }}
      >
        登出
      </Button>
      <Button
        onClick={async () => {
          const { username } = await getCurrentUser()
          console.log(`The username: ${username}`)
          console.log('成功登入')
        }}
      >
        test 登入有沒有成功
      </Button>
    </Box>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
