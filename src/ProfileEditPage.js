import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ProfileEditPage = ({ route, navigation }) => {
  const { user } = route.params;
  const [name, setName] = useState(user.memberName);
  const [email, setEmail] = useState(user.memberEmail);
  const [phone, setPhone] = useState(user.memberPhone);
  const [password, setPassword] = useState(user.memberPassword);

  const handleSave = async () => {
    // 這裡處理更新邏輯
    const response = await fetch('https://restaurantmanage.ddns.net/api/UpdateMember', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        memberId: user.memberId,
        memberName: name,
        memberEmail: email,
        memberPhone: phone,
        memberPassword: password,
      })
    });

    if (response.ok) {
      const updatedUser = await response.json();
      Alert.alert('成功', '資料更新成功');
      navigation.navigate('MemberCenter', { user: updatedUser });
    } else {
      console.error('資料更新失敗', response.statusText);
      Alert.alert('失敗', '資料更新失敗');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>編輯個人資料</Text>
      <TextInput
        style={styles.input}
        placeholder="姓名"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="電子郵件"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="電話"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="密碼"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="保存" onPress={handleSave} />
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

export default ProfileEditPage;
