import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme, View, TouchableOpacity, Text, Image } from 'react-native';

// 頁面
import LoginPage from './src/LoginPage';
import MenuPage from './src/MenuPage';
import NavigationBar from './src/NavigationBar';
import TabBar from './src/TabBar';
import MemberCenterPage from './src/MemberCenterPage';
import ProfileEditPage from './src/ProfileEditPage';
import CartPage from './src/CartPage';
import OrderManagementPage from './src/OrderManagementPage';
import OrderDetailsPage from './src/OrderDetailsPage';

// 圖片
import CartIcon from './Images/cart.png';
import OrderIcon from './Images/order.png';

const Stack = createStackNavigator();

// 更新 DrawerButton 组件
const DrawerButton = ({ onPressCart, onPressOrder }) => (
  <View style={styles.icons}>
    <TouchableOpacity onPress={onPressOrder} style={styles.iconItem}>
      <Image source={OrderIcon} style={styles.icon} />
      <Text style={styles.buttonText}>訂單管理</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPressCart} style={styles.iconItem}>
      <Image source={CartIcon} style={styles.icon} />
      <Text style={styles.buttonText}>購物車</Text>
    </TouchableOpacity>
  </View>
);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // 存储用户数据

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData); // 更新用户数据
  };

  if (!isLoggedIn || !userData) {
    return (
      <NavigationContainer>
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
          <LoginPage onLogin={handleLogin} />
        </SafeAreaView>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />
        <View style={{ flex: 1 }}>
          <Stack.Navigator>
            <Stack.Screen
              name="Menu"
              component={MenuPage}
              options={({ navigation }) => ({
                headerTitle: '線上菜單',
                headerRight: () => (
                  <DrawerButton 
                    onPressCart={() => navigation.navigate('Cart')} 
                    onPressOrder={() => navigation.navigate('OrderManagement')} 
                  />
                ),
                headerRightContainerStyle: styles.headerRightContainer,
              })}
              initialParams={{ user: userData }} // 傳遞使用者資料
            />
            <Stack.Screen 
              name="MemberCenter" 
              component={MemberCenterPage} 
              options={{ title: '會員中心' }} 
              initialParams={{ user: userData }} 
            />
            <Stack.Screen 
              name="ProfileEdit" 
              component={ProfileEditPage} 
              options={{ title: '編輯個人資料' }} 
            />
            <Stack.Screen 
              name="Cart" 
              component={CartPage} 
              options={{ title: '購物車' }} 
            />
            <Stack.Screen 
              name="OrderManagement" 
              component={OrderManagementPage} 
              options={{ title: '訂單管理' }} 
            />
            <Stack.Screen 
              name="OrderDetails" 
              component={OrderDetailsPage} 
              options={{ title: '訂單詳細信息' }} 
            />
          </Stack.Navigator>
        </View>
        {isLoggedIn && <TabBar />}
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerRightContainer: {
    paddingRight: 10, // Add padding to ensure icons are within the screen
  },
  icons: {
    flexDirection: 'row',
  },
  iconItem: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 12,
  },
});

export default App;
