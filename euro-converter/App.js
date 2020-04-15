import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Picker, Button, Alert } from 'react-native'

export default function App() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [rates, setRates] = useState({})
  const [amount, setAmount] = useState(0)
  const [result, setResult] = useState(0)

  useEffect(() => {
    getRates()
  }, [])

  const getRates = () => {
    const url = `http://data.fixer.io/api/latest?access_key=${YOUR_KEY}`
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setRates(data.rates)
    })
    .catch((error) => {
      Alert.alert('Error', error);
    });
  }

  const convert = (amount) => {
    const result = amount / rates[selectedCurrency]
    if(result > 0 && result < 0.01) {
      return result.toFixed(4)
    } else {
      return result.toFixed(2)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('./assets/euro.png')}></Image>
      {result === 0 ? null : <Text style={{fontSize: 24}}>{result} €</Text>}
      <View style={styles.containerRow}>
        <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder={'Amount'} onChangeText={val => setAmount(Number(val))} />
        <Picker
          selectedValue={selectedCurrency}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedCurrency(itemValue)}
        >
          {Object.keys(rates).map(item => {
            return (<Picker.Item label={item} key={item} value={item} />)
          })}
        </Picker>
      </View>
      <Button title={'convert'} onPress={() => setResult(convert(amount))} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  textInput: {
    fontSize: 18, 
    width: 100,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 5
  }
})
