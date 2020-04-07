import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import History from './components/History'
import Calculator from './components/Calculator'
import { StyleSheet } from 'react-native'

export default function App() {

  const Stack = createStackNavigator()
  
  return ( 
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Calculator">
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center'
  }
})