import React, { useState } from 'react';
import { StyleSheet, Button, View, TextInput, FlatList, Text, Image, Alert } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('')
  const [recipes, setRecipes] = useState([])

  const getRecipes = () => {
    const url = `http://www.recipepuppy.com/api/?i=${ingredient}`
    
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setRecipes(data.results)
    })
    .catch((error) => {
      Alert.alert('Error', error);
    });
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.title}
        renderItem={({item}) => <View>
                                  <Text>{item.title}</Text>
                                  <Image style={{width: 50, height: 50}} source={{
                                    uri: `${item.thumbnail}`
                                  }}/>
                                </View>}
        data={recipes}
      />
      <TextInput
        style={styles.textInput} value={ingredient}
        placeholder="Input ingredient here" onChangeText={(ingredient) => setIngredient(ingredient)}
      />
      <Button title="Find" onPress={getRecipes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 18, 
    width: 200,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 5
  }
});
