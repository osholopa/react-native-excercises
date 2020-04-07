import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button
} from 'react-native'

export default function Calculator({ navigation }) {
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
              { key: printExpression(first, '+', second, currentResult) }
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
              { key: printExpression(first, '-', second, currentResult) }
            ])
          }}
          title={' - '}
        />
        <Button
          onPress={() => navigation.navigate('History', {history: history})}
          title={'History'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowSpaceBetween: {
    width: 160,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  result: {
    textAlign: 'center',
    fontSize: 24
  }
})