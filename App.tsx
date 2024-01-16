
import React, { useState, useEffect } from 'react';
import {SafeAreaView, StatusBar, Text,Alert, useColorScheme} from 'react-native';
import WebView from 'react-native-webview';
import DatePicker , {getFormatedDate} from 'react-native-modern-datepicker';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';


import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [ipInfo, setIpInfo] = useState(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  useEffect(() => {
    fetchIpInfo();
  }, []);

  
  const fetchIpInfo = async () => {
    try {
      const response = await axios.get('https://ipinfo.io/json');
      const data = response.data;
      setIpInfo(data);
    } catch (error) {
      console.error('Error fetching IP info:', error);
    }
  };

  const calenda = () => {
    return (
        <SafeAreaView style={backgroundStyle}>
      <Calendar/>
        </SafeAreaView>
    )
  };

    const web = () => {
      return (
        <SafeAreaView style={backgroundStyle}>
        <WebView source={{uri: 'https://45.119.82.206'}} tyle={{flex: 1, justifyContent: 'center', alignItems: 'center',  height: undefined, width: undefined}} />
        </SafeAreaView>
       
      )
    };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      { ipInfo && ipInfo.country === 'VN' ? ( web()) : calenda() }
    </SafeAreaView>
  );
}

export default App;