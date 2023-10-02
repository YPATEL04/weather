import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    FlatList, TouchableOpacity,
    View,
    Image,
    TextInput,
    Button,
    ImageBackground
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Weather = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const { lat, long, city } = route.params;
    const [weatherData, setWeatherData] = useState(null);
    const [weatherForDate, setWeatherForDate] = useState('');
    const [date, setDate] = useState('');
    const apiKey = 'YOUR_API_KEY'
    const dateKey = 'YOUR_API_KEY'

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then((response) => {
                setWeatherData(response.data);
                navigation.setOptions({ title: `${city} Weather` })
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleDateChange = () => {
        const selectedDate = new Date(date).getTime() / 1000;
        fetchWeatherData(selectedDate);
    };

    const fetchWeatherData = (dateTimestamp) => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${weatherData?.coord?.lat}&lon=${weatherData?.coord?.lon}&dt=${dateTimestamp}&appid=${dateKey}`)
            .then((response) => {
                setWeatherForDate(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./assets/images/image2.jpg')}
                style={styles.backgroundImage}
                imageStyle={styles.backgroundImageStyle}
            >
                {weatherData && (
                    <>
                        <View style={styles.contentContainer}>
                            <Text style={styles.locationText}>
                                {city}
                            </Text>
                            <Text style={styles.locationText}>
                                {`${(weatherData.main.temp - 273).toFixed(0)}°C`}
                            </Text>
                            <Text style={styles.locationProp}>
                                {`pressure: ${weatherData.main.pressure}`}
                            </Text>
                            <Text style={styles.locationProp}>
                                {`visibility: ${weatherData.visibility}`}
                            </Text>
                            <Text style={styles.locationProp}>
                                {`humidity: ${weatherData?.main.humidity}`}
                            </Text>
                            <TextInput
                                placeholder="Enter a date (YYYY-MM-DD)"
                                value={date}
                                onChangeText={(text) => setDate(text)}
                                style={styles.input}
                            />
                            <Button title="Get Weather" onPress={handleDateChange} />
                        </View>
                    </>
                )}

                {weatherForDate && (
                    <>
                        <View style={styles.contentContainer}>
                            <Text style={styles.locationText}>
                                {`Data of ${date}`}
                            </Text>
                            <Text style={styles.locationText}>
                                {`${(weatherData.main.temp - 273).toFixed(0)}°C`}
                            </Text>
                            <Text style={styles.locationProp}>
                                {`pressure: ${weatherData.main.pressure}`}
                            </Text>
                            <Text style={styles.locationProp}>
                                {`visibility: ${weatherData.visibility}`}
                            </Text>
                            <Text style={styles.locationProp}>
                                {`humidity: ${weatherData?.main.humidity}`}
                            </Text>
                        </View>
                    </>
                )}

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
    locationProp: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'left'
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 8,
        marginBottom: 10,
    },
});

export default Weather;