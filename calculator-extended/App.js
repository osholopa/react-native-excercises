import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'

export default function App() {
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  const [result, setResult] = useState('')

  const calculate = addition => {
    if (isNaN(first) | isNaN(second)) {
      setResult('Invalid input. Use only numbers and dots.')
    } else {
      addition
        ? setResult(Number(first) + Number(second))
        : setResult(Number(first) - Number(second))
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.result}>Result: {result}</Text>
      <TextInput
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        keyboardType={'numeric'}
        onChangeText={value => setFirst(value)}
        value={first}
      />
      <TextInput
        style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
        keyboardType={'numeric'}
        onChangeText={value => setSecond(value)}
        value={second}
      />
      <View style={styles.rowSpaceBetween}>
        <Button onPress={() => calculate(true)} title={' + '} />
        <Button onPress={() => calculate(false)} title={' - '} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
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
