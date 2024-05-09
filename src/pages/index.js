import React, { useState } from 'react'
import Hider from './component/Hider'
import { navigate } from 'gatsby'

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
  getCurrentUser,
  signOut,
  resendSignUpCode,
} from 'aws-amplify/auth'

const IndexPage = () => {
  const [login, setlogin] = useState(true)
  const [confirmation, setConfirmation] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newEmail, setnewEmail] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const [confirmationCode, setconfirmationCode] = useState('')
  const [verifyerr, setverifyerr] = useState('')
  const [loginerr, setloginerr] = useState('')
  const [confirmationCodeErr, setconfirmationCodeErr] = useState('')
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
      <Hider show={login}>
        <Card sx={{ borderRadius: '12px', width: '20%' }}>
          <CardContent sx={{ mb: '20px' }}>
            <Typography variant='h3' sx={{ mb: '5px' }}>
              登入
            </Typography>
            <Typography>email : </Typography>
            <TextField
              size='small'
              fullWidth
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
              fullWidth
              value={password}
              type='password'
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <Typography color='error.main' sx={{ fontSize: '12px' }}>
              {loginerr}
            </Typography>
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
                  navigate('/todolist')
                } catch (error) {
                  console.log(
                    'error signing in',
                    error.message,
                    typeof error.message
                  )
                  setloginerr(error.toString())
                  if (
                    error.message ===
                    'User needs to be authenticated to call this API.'
                  ) {
                    setconfirmationCodeErr('帳戶未驗證，請到信箱收驗證碼')
                    setnewEmail('')
                    setlogin(false)
                    setConfirmation(false)
                  }
                  // setconfirmationCodeErr(err.toString())
                }
              }}
            >
              登入
            </Button>
            <Button
              sx={{ width: '100%' }}
              variant='outlined'
              onClick={() => {
                setlogin(false)
              }}
            >
              創建一個新帳戶
            </Button>
          </CardActions>
        </Card>
        <Hider show={confirmation}>
          <Card sx={{ borderRadius: '12px', width: '20%' }}>
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
                fullWidth
              />
              <Typography>密碼 : </Typography>
              <TextField
                size='small'
                variant='outlined'
                value={newPassword}
                onChange={(e) => {
                  setnewPassword(e.target.value)
                }}
                fullWidth
              />
              <Typography color='error.main' sx={{ fontSize: '12px' }}>
                {verifyerr}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                sx={{ width: '100%', mb: '15px', color: 'white' }}
                variant='contained'
                onClick={async () => {
                  console.log(newEmail, newPassword)

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
                    setConfirmation(false)
                  } catch (error) {
                    // console.log('error signing up:', error)
                    // console.log(typeof error)
                    // console.log(JSON.stringify(error), error.toString())
                    setverifyerr(error.toString())
                  }
                }}
              >
                驗證電子郵件地址
              </Button>
              <Button
                sx={{ width: '100%' }}
                variant='outlined'
                onClick={() => {
                  setlogin(true)
                }}
              >
                返回登入頁面
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ borderRadius: '12px', width: '20%' }}>
            <CardContent
              sx={{ mb: '20px', display: 'flex', flexDirection: 'column' }}
            >
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
              <Button
                size='small'
                sx={{
                  width: '60%',
                }}
                variant='outlined'
                onClick={async () => {
                  setconfirmationCodeErr('')
                  try {
                    const { destination } = await resendSignUpCode({
                      username: newEmail === '' ? email : newEmail,
                    })
                    console.log('destination', destination)
                    setlogin(false)
                    setConfirmation(false)
                  } catch (err) {
                    console.log('verify code error', err)
                    setconfirmationCodeErr(err.toString())
                  }
                }}
              >
                重新發送驗證碼
              </Button>
              <Typography color='error.main' sx={{ fontSize: '12px' }}>
                {confirmationCodeErr}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                sx={{ width: '100%', mb: '15px', color: 'white' }}
                variant='contained'
                onClick={async () => {
                  console.log('confirmation code', confirmationCode)
                  try {
                    const { isSignUpComplete, nextStep } = await confirmSignUp({
                      username: newEmail === '' ? email : newEmail,
                      confirmationCode, //email驗證碼
                    })
                    console.log('isSignUpComplete', isSignUpComplete)
                    if (newEmail === '') {
                      console.log()
                      setlogin(true)
                      setConfirmation(true)
                      setloginerr('')
                    } else if (isSignUpComplete && newEmail !== '') {
                      try {
                        await autoSignIn()
                        const { username } = await getCurrentUser()
                        console.log(`The username: ${username}`)
                        console.log('成功登入')
                        navigate('/todolist')
                      } catch (error) {
                        console.log(error)
                        setconfirmationCodeErr(error.toString())
                      }
                    }
                  } catch (error) {
                    console.log('error confirming sign up', error)
                    setconfirmationCodeErr(error.toString())
                  }
                }}
              >
                確認
              </Button>
              <Button
                sx={{ width: '100%' }}
                variant='outlined'
                onClick={() => {
                  setlogin(true)
                  setConfirmation(false)
                }}
              >
                返回登入頁面
              </Button>
            </CardActions>
          </Card>
        </Hider>
      </Hider>
      {/* <Button
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
      <Button
        onClick={async () => {
          setlogin(false)
          setConfirmation(false)
        }}
      >
        驗證碼頁面
      </Button>
      <Button
        onClick={async () => {
          setlogin(true)
          setConfirmation(true)
        }}
      >
        登入頁面
      </Button>
      <Button
        onClick={async () => {
          setlogin(false)
          setConfirmation(true)
        }}
      >
        新增頁面頁面
      </Button> */}
    </Box>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
