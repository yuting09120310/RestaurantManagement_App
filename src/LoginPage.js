import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Username:', username);
    console.log('Password:', password);

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
        console.log('登入成功: ', data.data);
        onLogin({
          memberId: data.data.memberId,
          memberName: data.data.memberName,
          memberEmail: data.data.memberEmail,
          memberPhone: data.data.memberPhone,
          profileImage: data.data.profileImage || 'https://picsum.photos/100/100'
        }); // 調用父組件的 onLogin 函數，並傳遞使用者資料
      } else {
        Alert.alert('登入失敗', data.message || '帳號或密碼錯誤');
      }
    } catch (error) {
      console.error('登入失敗', error);
      Alert.alert('錯誤', '登入失敗，請稍後重試。');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default LoginPage;
