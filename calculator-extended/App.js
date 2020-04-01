import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList
} from 'react-native'

export default function App() {
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  const [result, setResult] = useState('')
  const [history, setHistory] = useState([])

  const sum = () => {
    return Number(first) + Number(second)
  }

  const subtract = () => {
    return Number(first) - Number(second)
  }

  const printExpression = (first = 0, operator, second = 0, result) => {
    return `${first || 0} ${operator} ${second || 0} = ${result}`
  }

  return (
    <View style={styles.container}>
      <Text style={styles.result}>Result: {result}</Text>
      <TextInput
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        keyboardType={'numeric'}
        onChangeText={value => setFirst(value)}
        value={String(first)}
      />
      <TextInput
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        keyboardType={'numeric'}
        onChangeText={value => setSecond(value)}
        value={String(second)}
      />
      <View style={styles.rowSpaceBetween}>
        <Button
          onPress={() => {
            const currentResult = sum()
            setResult(currentResult)
            setHistory([
              ...history,
              {
                expression: printExpression(first, '+', second, currentResult)
              }
            ])
          }}
          title={' + '}
        />
        <Button
          onPress={() => {
            const currentResult = subtract()
            setResult(currentResult)
            setHistory([
              ...history,
              { expression: printExpression(first, '-', second, currentResult) }
            ])
          }}
          title={' - '}
        />
      </View>
      <Text>History</Text>
      <FlatList
        data={history}
        renderItem={({ item }) => <Text>{item.expression}</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  rowSpaceBetween: {
    width: 80,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  result: {
    textAlign: 'center',
    fontSize: 24
  }
})
