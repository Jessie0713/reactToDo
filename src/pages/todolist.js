import React, { useState, useEffect } from 'react'
import ListItems from './component/ListItem'
import { Box, Button, TextField, Card, Typography } from '@mui/material'
import List from '@mui/material/List'
import { post, get } from 'aws-amplify/api'
const Todolist = () => {
  const [addItem, setAddItem] = useState('')
  const [getItem, setGetItem] = useState([])
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
    <Card>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
        <Typography
          variant='h2'
          sx={{ textAlign: 'center' }}
          color={'primary.main'}
        >
          To do List
        </Typography>
        {/* <FormatListNumberedIcon
          sx={{
            color: '#28aeb1',
            fontWeight: 'bold',
            fontSize: '28px',
            m: '-1px 10px 0',
          }}
          fontSize='large'
        /> */}
      </Box>
      <Box>
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
          />
          <Button
            variant='contained'
            sx={{
              borderRadius: '16px',
              height: '40px',
              ml: '-60px',
              p: '15px',
            }}
            onClick={async () => {
              setAddItem('')
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
                })
              } catch (e) {
                console.log(e)
              }
            }}
          >
            <Typography color={'white'} sx={{ fontSize: '15px' }}>
              Add
            </Typography>
          </Button>
        </Box>

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
  )
}
export default Todolist
