import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

let customFonts = {
  Roboto: require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
  'Roboto-Black': require('../assets/fonts/Roboto/Roboto-Black.ttf'),
};

export default function HomeScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  _loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  };

  useEffect(() => {
    _loadFontsAsync();
  });

  return fontsLoaded ? (
    <ImageBackground
      style={styles.container}
      source={require('../assets/fall.jpg')}
    >
      <Text style={styles.title}>Should I bring an umbrella?</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Result', { name: 'Result' })}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Find out!</Text>
      </TouchableOpacity>
    </ImageBackground>
  ) : (
    <AppLoading />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  title: {
    color: 'white',
    fontFamily: 'Roboto-Black',
    fontSize: 25,
    fontWeight: '800',
    padding: 10,
    textAlign: 'center',
  },
});
