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

// 圖片
import CartIcon from './Images/cart.png';

const Stack = createStackNavigator();

// 示例的抽屉按钮组件
const DrawerButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.drawerButton}>
    <Image source={CartIcon} style={styles.icon} />
    <Text style={styles.buttonText}>購物車</Text>
  </TouchableOpacity>
);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // 儲存使用者資料

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData); // 更新使用者資料
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
                  headerRight: () => <DrawerButton onPress={() => navigation.navigate('Cart')} />,
                })}
              />
              <Stack.Screen name="MemberCenter" component={MemberCenterPage} options={{ title: '會員中心' }} initialParams={{ user: userData }} />
              <Stack.Screen name="ProfileEdit" component={ProfileEditPage} options={{ title: '編輯個人資料' }} />
              <Stack.Screen name="Cart" component={CartPage} options={{ title: '購物車' }} />
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
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
