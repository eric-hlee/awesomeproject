import React, { useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AppLoading } from "expo";
import config from "../config";
import * as Font from "expo-font";

let customFonts = {
  Roboto: require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
  "Roboto-Black": require("../assets/fonts/Roboto/Roboto-Black.ttf"),
};

export default function HomeScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);
  const { apiKey } = config;
  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };

  const _getCurrentPosition = async () => {
    const success = (pos) => {
      const crd = pos.coords;
      setLatitude(crd.latitude);
      setLongitude(crd.longitude);
    };

    const error = (err) => {
      alert(`ERROR(${err.code}): ${err.message}`);
    };

    await navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const getCurrentWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    )
      .then((result) => result.json())
      .then((result) => setCurrentWeather(result));
  };

  const getWeatherForecast = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    )
      .then((result) => result.json())
      .then((result) => setWeatherForecast(result.list.splice(0, 8)));
  };

  const _loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  };

  useEffect(() => {
    _loadFontsAsync();
  });

  useEffect(() => {
    _getCurrentPosition();
    if (latitude && longitude) {
      getCurrentWeather();
      getWeatherForecast();
    }
  }, [latitude, longitude]);

  return fontsLoaded && currentWeather && weatherForecast ? (
    <View style={styles.container}>
      <Text adjustsFontSizeToFit minimumFontScale={3} style={styles.city}>
        {currentWeather.name}
      </Text>
      <Image
        style={styles.logo}
        source={{
          uri: `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`,
        }}
      />
      <Text style={styles.title}>{currentWeather.weather[0].main}</Text>
      <Text style={styles.description}>
        {currentWeather.weather[0].description}
      </Text>
      <FlatList
        data={weatherForecast}
        renderItem={({ item }) => {
          const date = new Date(item.dt * 1000);
          const hour =
            date.getHours() > 12
              ? (date.getHours() % 12) + " PM"
              : date.getHours() + " AM";
          const pop = Math.floor(item.pop * 100) + "%";
          return (
            <View style={styles.forecast}>
              <View style={styles.line} />
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                }}
              />
              <Text style={styles.subtitle}>{item.weather[0].main}</Text>
              <Text style={styles.time}>{hour}</Text>
              <Text>Chance of Rain: {pop}</Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  ) : (
    <AppLoading />
  );
}

const styles = StyleSheet.create({
  city: {
    fontFamily: "Roboto-Black",
    fontWeight: "800",
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "lightskyblue",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  description: {
    fontFamily: "Roboto",
    fontSize: 20,
    margin: 5,
    textTransform: "capitalize",
  },
  forecast: {
    alignItems: "center",
    backgroundColor: "lightskyblue",
    flex: 1,
    justifyContent: "center",
    margin: 15,
    width: Dimensions.get("window").width - 50,
  },
  line: {
    alignSelf: "stretch",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  logo: {
    width: 66,
    height: 58,
  },
  subtitle: {
    fontFamily: "Roboto",
    fontSize: 30,
  },
  time: {
    fontSize: 15,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 40,
    fontWeight: "800",
  },
});
