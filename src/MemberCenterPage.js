import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const MemberCenterPage = ({ navigation, route }) => {
  const { user } = route.params;

  const handleEditProfile = () => {
    navigation.navigate('ProfileEdit', { user });
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://picsum.photos/100/100' }}
              style={styles.profileImage}
            />
            <Text style={styles.name}>{user.memberName}</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>會員資訊</Text>
            <Text style={styles.infoText}>電子郵件: {user.memberEmail}</Text>
            <Text style={styles.infoText}>電話: {user.memberPhone}</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
              <Text style={styles.actionButtonText}>編輯個人資料</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>查看訂單紀錄</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>登出</Text>
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
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoSection: {
    width: '100%',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    alignItems: 'center',
  },
  actionButton: {
    width: '80%',
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MemberCenterPage;
