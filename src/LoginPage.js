import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import background from '../Images/background.png';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('錯誤', '請輸入帳號和密碼');
      return;
    }

    try {
      const response = await fetch('https://restaurantmanage.alexbase.net/api/Login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          memberAccount: username,
          memberPassword: password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log('登入成功:', data.data);
        onLogin({
          memberId: data.data.memberId,
          memberName: data.data.memberName,
          memberEmail: data.data.memberEmail,
          memberPhone: data.data.memberPhone,
          profileImage: data.data.profileImage || 'https://picsum.photos/100/100'
        });
      } else {
        Alert.alert('登入失敗', data.message || '帳號或密碼錯誤');
      }
    } catch (error) {
      console.error('登入失敗', error);
      Alert.alert('錯誤', '登入失敗，請稍後重試。');
    }
  };

  return (
    <ImageBackground
      source={background} // 在此放入您的背景圖片網址
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>登入頁面</Text>
        <TextInput
          style={styles.input}
          placeholder="帳號"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="密碼"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>登入</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // 半透明白色背景，增強文字對比
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  loginButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default LoginPage;
