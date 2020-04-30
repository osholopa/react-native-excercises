
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Map from './components/Map'
import Places from './components/Places'
import { StyleSheet } from 'react-native'

export default function App() {

  const Stack = createStackNavigator()
  
  return ( 
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="My Places">
        <Stack.Screen name="My Places" component={Places} />
        <Stack.Screen name="Map" component={Map} />
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
