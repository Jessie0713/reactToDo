import React, { useState, useEffect } from 'react'
import ListItems from './component/ListItem'
import { Box, Button, TextField, Card, Typography } from '@mui/material'
import List from '@mui/material/List'
import CircularProgress from '@mui/material/CircularProgress'
import { post, get } from 'aws-amplify/api'
import Hider from './component/Hider'
import Navbar from '../Navbar/index'
const Todolist = () => {
  const [addItem, setAddItem] = useState('')
  const [getItem, setGetItem] = useState([])
  const [addLoad, setAddLoad] = useState(false)
  const handlePost = async () => {
    try {
      let id = Date.now().toString()
      let finish = 'no'
      const response = post({
        apiName: 'todolist',
        path: '/index',
        options: {
          body: {
            id,
            finish,
            text: addItem,
          },
        },
      })
      let result = await response.response
      result = await result.body.json().then((res) => {
        console.log('res', res)
        setGetItem([{ id, finish, text: addItem }, ...getItem])
        setAddLoad(false)
      })
    } catch (e) {
      console.log(e)
    }
  }
  async function getItems() {
    console.log('getItem')
    try {
      const response = get({
        apiName: 'todolist',
        path: '/index',
      })
      let result = await response.response
      result = await result.body.json().then((res) => {
        console.log('res', res)
        res.sort((a, b) => {
          if (a.finish === 'no' && b.finish === 'yes') {
            return -1
          } else if (a.finish === 'yes' && b.finish === 'no') {
            return 1
          } else {
            return b.id - a.id
          }
        })
        setGetItem(res)
      })
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getItems()
  }, [])
  return (
    <>
      <Navbar />
      <Card>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
          <Typography
            variant='h2'
            sx={{ textAlign: 'center' }}
            // color={'primary.main'}
          >
            To do List
          </Typography>
        </Box>
        <Box>
          <Hider show={addLoad}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <TextField
                id='outlined-basic'
                label='加入事項'
                variant='outlined'
                className='customRounded'
                size='small'
                sx={{ width: '40%' }}
                value={addItem}
                onChange={(e) => {
                  setAddItem(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && addItem !== '') {
                    setAddLoad(true)
                    setAddItem('')
                    handlePost()
                  }
                }}
              />
              <Button
                variant='contained'
                sx={{
                  borderRadius: '16px',
                  height: '40px',
                  ml: '-60px',
                  p: '15px',
                }}
                onClick={() => {
                  setAddLoad(true)
                  setAddItem('')
                  handlePost()
                }}
              >
                <Typography color={'white'} sx={{ fontSize: '15px' }}>
                  Add
                </Typography>
              </Button>
            </Box>
          </Hider>

          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%', // 或者給定一個固定寬度
            }}
          >
            {getItem &&
              getItem.map((item, index) => {
                return (
                  <ListItems
                    item={item}
                    getItem={getItem}
                    setGetItem={setGetItem}
                    index={index}
                  />
                )
              })}
          </List>
        </Box>
      </Card>
    </>
  )
}
export default Todolist
