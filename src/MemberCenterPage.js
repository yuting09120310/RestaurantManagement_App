import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';

const MemberCenterPage = ({ navigation, route }) => {
  // 從路由參數中提取使用者資料
  const { user } = route.params;

  // 編輯個人資料的按鈕事件，跳轉到「編輯頁面」
  const handleEditProfile = () => {
    navigation.navigate('ProfileEdit', { user });
  };

  // 假設登出功能 - 可以在這裡連結 API 或處理登出邏輯
  const handleLogout = () => {
    Alert.alert('確認登出', '您確定要登出嗎？', [
      { text: '取消', style: 'cancel' },
      { text: '確定', onPress: () => navigation.replace('Login') }
    ]);
  };

  return (
    // 使用背景的容器包裹 ScrollView
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          
          {/* 使用者頭像和名稱 */}
          <View style={styles.header}>
            <Image
              source={{ uri: user.profileImage || 'https://picsum.photos/100/100' }}
              style={styles.profileImage}
            />
            <Text style={styles.name}>{user.memberName}</Text>
          </View>

          {/* 使用者資訊區域 */}
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>會員資訊</Text>
            <Text style={styles.infoText}>電子郵件: {user.memberEmail}</Text>
            <Text style={styles.infoText}>電話: {user.memberPhone}</Text>
          </View>

          {/* 動作按鈕區域 */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
              <Text style={styles.actionButtonText}>編輯個人資料</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>查看訂單紀錄</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>登出</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f0f4f8', // 更現代的淡色背景
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
    borderColor: '#007BFF',
    borderWidth: 2, // 增加邊框顏色提升專業感
  },
  name: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
  },
  infoSection: {
    width: '100%',
    marginVertical: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  actionButton: {
    width: '85%',
    paddingVertical: 14,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    width: '85%',
    paddingVertical: 14,
    backgroundColor: '#FF4C4C',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default MemberCenterPage;
