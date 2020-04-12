import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Alert, AsyncStorage } from 'react-native'

export default function App() {
  const [guess, setGuess] = useState('')
  const [text, setText] = useState('')
  const [guesses, setGuesses] = useState(1)
  const [number, setNumber] = useState(0)
  const [highScore, setHighScore] = useState(0)

  useEffect(() => {
    setText('Guess a number between 1-100')
    setNumber(Math.floor(Math.random() * 100) + 1)
    async function setInitialHighScore() {
      const score = JSON.parse(await AsyncStorage.getItem('highScore'))
      if(score !== null) {
        setHighScore(score)
      }
    }
    setInitialHighScore()
  }, [])

  const saveHighScore = async () => {
    try {
      await AsyncStorage.setItem('highScore', JSON.stringify(guesses))
    } catch (error) {
      console.error(error)
    }
  }

  const updateHighScore = async () => {
    const currentHighScore = JSON.parse(await AsyncStorage.getItem('highScore'))
    if(currentHighScore === null || guesses < Number(currentHighScore)) {
      await saveHighScore()
      const newHighScore = JSON.parse(await AsyncStorage.getItem('highScore'))
      setHighScore(Number(newHighScore))
    }
  }

  const reset = () => {
    setText('Guess a number between 1-100')
    setGuesses(1)
    setGuess('')
    setNumber(Math.floor(Math.random() * 100) + 1)
  }

  const match = async guess => {
    setGuesses(guesses + 1)
    const guessedNumber = Number(guess)
    if (number > guessedNumber) {
      setText(`Your guess ${guess} is too low`)
    } else if (number < guessedNumber) {
      setText(`Your guess ${guess} is too high`)
    } else {
      Alert.alert(`You guessed the number in ${guesses} guesses`)
      await updateHighScore()
      reset()
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
      <Text style={{marginTop: 20}}>{highScore === 0 ? null : `Highscore: ${highScore} guesses`}</Text>
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
