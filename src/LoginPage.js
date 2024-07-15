import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // 這裡處理登錄邏輯
    console.log('Username:', username);
    console.log('Password:', password);
  
    const response = await fetch('https://restaurantmanage.ddns.net/api/Login', {
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
  
    if (response.ok) {
      const data = await response.json();
      console.log('登入成功: ', data);
      onLogin({
        memberName: data.memberName,
        memberEmail: data.memberEmail,
        memberPhone: data.memberPhone,
        profileImage: data.profileImage || 'https://picsum.photos/100/100'
      }); // 調用父組件的 onLogin 函數，並傳遞使用者資料
    } else {
      console.error('登入失敗 帳號或密碼錯誤', response.statusText);
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
