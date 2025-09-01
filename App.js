import React,{useState,useEffect} from 'react';
import {View,Button,StyleSheet,Text,TextInput,ActivityIndicator, Alert,Image} from 'react-native';
import axios from 'axios';
import {API_KEY} from '@env';


export default function App(){
  const [city,setCity]=useState("");
  const [weather,setWeather]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  
  const apiKey = API_KEY;
  const getWeather= async()=>{
    if(!city) return Alert.alert("Lütfen bir şehir adı girin");
    setLoading(true);
    setError(null)

    try{
     
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;
     const response = await axios.get(url);

     
     console.log(response.data); 
     setWeather(response.data);
    }
    catch(err){
        console.log(err)
        Alert.alert("Hata", "Veri alınamadı: " + err.message);
        setError("veri alınamadı")

    }
    finally{
        setLoading(false)
    }
  }
  return(
    <View style={{padding:20}}>
     <TextInput 
      value={city} 
      onChangeText={setCity}
      placeholder='ŞEHİR ADI GİRİN'
      style={{borderWidth:1,padding:10,marginBottom:10}}/>

    <Button
     title = "şehri gönder" 
     onPress={getWeather}/>
     
     {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />}
     {weather && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Şehir: {weather.name}</Text>
          <Text>Sıcaklık: {weather.main.temp}°C</Text>
          <Text>Hava: {weather.weather[0].description}</Text>
          <Text>Nem: {weather.main.humidity}%</Text>
          <Text>Rüzgar Hızı: {weather.wind.speed} m/s</Text>
          <Image
  source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
  style={{ width: 100, height: 100, marginTop: 10 }}
/>

        </View>
      )}

      {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
    </View>
)}