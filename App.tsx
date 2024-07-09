import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

import LoginPage from './src/LoginPage';
import MenuPage from './src/MenuPage';
import NavigationBar from './src/NavigationBar';
import TabBar from './src/TabBar';
import MemberCenterPage from './src/MemberCenterPage';

const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTab, setSelectedTab] = useState('線上購物');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleTabChange = (tabName) => {
    setSelectedTab(tabName);
  };

  const renderScreen = () => {
    switch (selectedTab) {
      case '線上購物':
        return <MenuPage />;
      case '門市位置':
        // Replace with the appropriate screen component for '門市位置'
        return <View><Text>門市位置頁面</Text></View>;
      case '首頁':
        // Replace with the appropriate screen component for '首頁'
        return <View><Text>首頁頁面</Text></View>;
      case '找好茶':
        // Replace with the appropriate screen component for '找好茶'
        return <View><Text>找好茶頁面</Text></View>;
      case '會員中心':
        return <MemberCenterPage />;
      default:
        return null;
    }
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
        
        {isLoggedIn && <NavigationBar />}
        
        <View style={{ flex: 1 }}>
          {!isLoggedIn ? (
            <LoginPage onLogin={handleLogin} />
          ) : (
            renderScreen()
          )}
          {/* Render the selected screen based on the tab selection */}

        </View>
        
        {isLoggedIn && <TabBar selectedTab={selectedTab} onTabPress={handleTabChange} />}
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
