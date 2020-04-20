import React from 'react';
import { StyleSheet, TextInput, View, Button, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useState, useEffect } from 'react'
import * as Location from 'expo-location'

export default function App() {
  const [address, setAddress] = useState('')
  const [region, setRegion] = useState([])

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = async () =>  {
    let { status } = await Location.requestPermissionsAsync()
    if(status !== 'granted') {
      Alert.alert('No permission to access location')
    } else {
      let location = await Location.getCurrentPositionAsync({})
      setAddress('Current position')
      setRegion([location['coords'].latitude, location['coords'].longitude])
    }
  }

  //Api key here
  const apiKey = 'API_KEY_HERE'

  const parseGetParams = (a) => {
    a.replace(', ', ',')
    return a
  }

  const getCoordinates = () => {
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${parseGetParams(address)}`
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const lat = data["results"][0]["locations"][0].latLng.lat
      const lng = data["results"][0]["locations"][0].latLng.lng
      setRegion([lat, lng])
    })
    .catch((error) => {
      Alert.alert('Error', error);
    });
  }

  return (
    <View style={styles.container}>
      <MapView 
       style={styles.map}
       region={{
        latitude: region[0] || 60.201615,
        longitude: region[1] || 24.933845,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
      }}
       >
         <Marker 
          coordinate={{
            latitude: region[0] || 60.201615,
            longitude: region[1] || 24.933845}}
          title={address || 'Ratapihantie 13'} />
      </MapView>
      <TextInput style={styles.textInput} 
        placeholder={'Example: Ratapihantie 13, Helsinki'}
        onChangeText={text => setAddress(text)}/>
      <Button style={{flex: 0.05}} title='show' onPress={() => getCoordinates()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  map: {
    flex: 0.9
  },
  textInput: {
    flex: 0.05,
    fontSize: 18,
    padding: 5,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 5
  }
});
