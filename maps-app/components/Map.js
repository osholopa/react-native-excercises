import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { useState, useEffect } from 'react'

export default function App({ route }) {
  const [region, setRegion] = useState([])
  const { address } = route.params

  useEffect(() => {
    getCoordinates()
  }, [])

  //Api key here
  const apiKey = 'YOUR_API_KEY_HERE'

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
      <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 5, textAlign: 'center'}}>{address}</Text>
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