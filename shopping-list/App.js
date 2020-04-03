import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  Alert
} from 'react-native'

export default function App() {
  const [text, setText] = useState('')
  const [list, setList] = useState([])

  const generateId = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    return s4() + '-' + s4() + '-' + s4()
  }

  return (
    <View style={styles.app}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={value => setText(value)}
          value={text}
        />
        <View style={styles.buttonView}>
          <Button
            onPress={() => {
              if (text === '') {
                Alert.alert('Cannot add empty string')
              } else {
                setList([...list, { id: generateId(), content: text }])
                setText('')
              }
            }}
            title={' add '}
          />
          <Button
            onPress={() => {
              setList([])
            }}
            title={' clear '}
          />
        </View>
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.listHeader}>Shopping list</Text>
        <FlatList
          style={{ paddingLeft: 15 }}
          data={list}
          renderItem={({ item }) => <Text>{item.content}</Text>}
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
    marginBottom: 60
  },
  buttonView: {
    flexDirection: 'row'
  },
  listHeader: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
    width: 120
  },
  listContainer: {
    flex: 1
  }
})
