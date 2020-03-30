import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'

export default function App() {
  const [guess, setGuess] = useState('')
  const [text, setText] = useState('')
  const [guesses, setGuesses] = useState(1)
  const [number, setNumber] = useState(0)

  useEffect(() => {
    setText('Guess a number between 1-100')
    setNumber(Math.floor(Math.random() * 100) + 1)
  }, [])

  const match = guess => {
    setGuesses(guesses + 1)
    const guessedNumber = Number(guess)
    if (number > guessedNumber) {
      setText(`Your guess ${guess} is too low`)
    } else if (number < guessedNumber) {
      setText(`Your guess ${guess} is too high`)
    } else {
      Alert.alert(`You guessed the number in ${guesses} guesses`)
      setText('Guess a number between 1-100')
      setGuesses(1)
      setGuess('')
      setNumber(Math.floor(Math.random() * 100) + 1)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TextInput
        style={styles.textInput}
        keyboardType={'numeric'}
        onChangeText={value => setGuess(value)}
        value={guess}
      />
      <Button title={'make guess'} onPress={() => match(guess)} />
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
  textInput: {
    margin: 20,
    width: 50,
    borderColor: 'gray',
    borderWidth: 1
  },
  text: {
    textAlign: 'center',
    width: 300,
    fontSize: 18
  }
})
