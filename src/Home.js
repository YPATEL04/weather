import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, PermissionsAndroid, Platform, ImageBackground, Dimensions, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

const Home = () => {
    const navigation = useNavigation()
    const [city, setCity] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
    const apiKey = 'YOUR_API_KEY'
    const [weatherData, setWeatherData] = useState(null);
    const [date, setDate] = useState('');
    const deviceHeight = Dimensions.get('window').height
    const deviceWidth = Dimensions.get('window').width

    useEffect(() => {
        if (Platform.OS === 'android') {
            requestLocationPermission();
        }

        getCurrentLocation();
    }, []);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'WeatherApp needs access to your location.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Location permission granted');
            } else {
                console.log('Location permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
            },
            (error) => {
                console.error(error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    const handleSearch = () => {
        if (city) {
            if (currentLocation) {
                navigation.navigate('City Weather', { lat: currentLocation?.latitude, long: currentLocation?.longitude, city: city });
            } else {
                navigation.navigate('City Weather', { lat: currentLocation?.latitude, long: currentLocation?.longitude, city: city });
            }
        } else {
            alert('Please enter city')
        }
    };

    useEffect(() => {
        getCurrentLocation();
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation?.latitude}&lon=${currentLocation?.longitude}&appid=${apiKey}`)
            .then((response) => {
                setWeatherData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [currentLocation, city]);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./assets/images/image1.jpg')}
                style={styles.backgroundImage}
                imageStyle={styles.backgroundImageStyle}
            >
                <View style={styles.contentContainer}>
                    {currentLocation && (
                        <Text style={styles.locationText}>
                            {weatherData?.name}
                        </Text>
                    )}
                    <TextInput
                        placeholder="Enter a city"
                        value={city}
                        onChangeText={(text) => setCity(text)}
                        style={styles.input}
                    />
                    <Button title="Get Weather" onPress={handleSearch} />
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover',
    },
    backgroundImageStyle: {
        opacity: 0.6,
        backgroundColor: 'black',
    },
    contentContainer: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    locationText: {
        color: 'white',
        fontSize: 30,
        marginBottom: 30,
        textAlign: 'center'
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 8,
        marginBottom: 10,
    },
});

export default Home;