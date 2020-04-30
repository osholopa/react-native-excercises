import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList
} from 'react-native'
import * as SQLite from 'expo-sqlite'

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

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    )
  }

  return (
    <View style={styles.app}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={value => setProduct(value)}
          value={product}
          placeholder={'Product'}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={value => setAmount(value)}
          value={amount}
          placeholder={'Amount'}
        />
        <Button
          onPress={saveItem}
          title={' save '}
        />
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listHeader}>Shopping list</Text>
        <FlatList
          style={{ paddingLeft: 15 }}
          keyExtractor={item => item.id.toString()}
          data={list}
          renderItem={({ item }) => <View style={styles.listItem}><Text style={{fontSize: 16}}> {item.product}, {item.amount} </Text><Text style={{fontSize: 16, color: '#0000ff'}} onPress={() => deleteItem(item.id)}>  bought</Text></View>}
          ItemSeparatorComponent={listSeparator}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5
  },
  listHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    width: 120,
    marginBottom: 10
  },
  listContainer: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#fff'
   }
})
