import React, { useState, useEffect } from 'react'
import {
  View
} from 'react-native'
import * as SQLite from 'expo-sqlite'
import { Header, Input, Button, ListItem } from 'react-native-elements'

const db = SQLite.openDatabase('shoppinglistdb.db')

export default function App() {
  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists products (id integer primary key not null, product text, amount text);')
    }, null, updateList)
  }, [])

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into products (product, amount) values (?, ?);', [product, amount])
    }, null, updateList)
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from products;',[], (_, { rows }) =>
        setList(rows._array)
      )
    })
    setProduct('')
    setAmount('')
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql(`delete from products where id = ?;`, [id])
    }, null, updateList)
  }

  return (
    <View>
      <Header
        centerComponent={{text: 'SHOPPING LIST', style: {color: '#fff', fontSize: 18}}}
      />
      <Input
        containerStyle={{marginTop: 15}}
        label='PRODUCT' 
        placeholder='Type name of product'
        value={product}
        onChangeText={value => setProduct(value)}
      />
      <Input
        label='AMOUNT' 
        onChangeText={value => setAmount(value)}
        value={amount}
        placeholder={'Type amount'}
      />
      <Button
        raised
        icon={{name: 'save'}}
        onPress={saveItem}
        title={'SAVE'}
      />
      <View>
        {list.map(item => (
          <ListItem 
            key={item.id}
            title={item.product}
            subtitle={item.amount}
            bottomDivider
            chevron
            rightSubtitle={'bought'}
            onPress={() => {deleteItem(item.id)}}
          />
        ))}
      </View>
    </View>
  )
}