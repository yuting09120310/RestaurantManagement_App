import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme, View, TouchableOpacity, Text, Image } from 'react-native';

// 页
import LoginPage from './src/LoginPage';
import MenuPage from './src/MenuPage';
import NavigationBar from './src/NavigationBar';
import TabBar from './src/TabBar';
import MemberCenterPage from './src/MemberCenterPage';
import ProfileEditPage from './src/ProfileEditPage';
import CartPage from './src/CartPage';
import OrderManagementPage from './src/OrderManagementPage';
import OrderDetailsPage from './src/OrderDetailsPage'; // 新增的訂單詳情頁面

// 图片
import CartIcon from './Images/cart.png';

const Stack = createStackNavigator();

// 更新 DrawerButton 组件
const DrawerButton = ({ onPressCart, onPressOrder }) => (
  <View style={styles.icons}>
    <TouchableOpacity onPress={onPressOrder} style={styles.iconItem}>
      <Image source={{ uri: 'https://picsum.photos/30/30?Random=6' }} style={styles.icon} />
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

  return (
    <NavigationContainer>
      <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />

        <View style={{ flex: 1 }}>
          {!isLoggedIn ? (
            <LoginPage onLogin={handleLogin} />
          ) : (
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
                  headerRightContainerStyle: styles.headerRightContainer, // Add this line to apply container style
                })}
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
              {/* <Stack.Screen 
                name="OrderDetails" 
                component={OrderDetailsPage} 
                options={{ title: '訂單詳細信息' }} 
              /> */}
            </Stack.Navigator>
          )}
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
