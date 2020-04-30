
import React, { useState, useEffect } from 'react'
import {
  View
} from 'react-native'
import { Input, Button, ListItem } from 'react-native-elements'
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('myPlacesdb.db')

export default function Places({ navigation }) {
  const [places, setPlaces] = useState([])
  const [address, setAddress] = useState('')

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists places (id integer primary key not null, address text);')
    }, null, updateList)
  }, [])

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into places (address) values (?);', [address])
    }, null, updateList)
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql(`delete from places where id = ?;`, [id])
    }, null, updateList)
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from places;',[], (_, { rows }) =>
        setPlaces(rows._array)
      )
    })
    setAddress('')
  }

  return (
    <View>
      <Input 
        placeholder='Example: Ratapihantie 13, Helsinki' label={'PLACEFINDER'}
        onChangeText={address => setAddress(address)}
        value={address}
      />
       <Button
        raised
        icon={{name: 'save'}}
        onPress={saveItem}
        title={'SAVE'}
      />
      <View>
        {places.map(item => (
          <ListItem 
            key={item.id}
            title={item.address}
            bottomDivider
            chevron
            rightSubtitle={'show on map'}
            onPress={() => {navigation.navigate('Map', {address: item.address})}}
            onLongPress={() => {deleteItem(item.id)}}
          />
        ))}
      </View>
    </View>
  )

}