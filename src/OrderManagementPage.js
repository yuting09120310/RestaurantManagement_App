import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

const OrderManagementPage = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const memberId = 3; // 假設會員ID

  useEffect(() => {
    fetch(`https://restaurantmanage.alexbase.net/api/Order/${memberId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.data);
          setLoading(false);
        } else {
          Alert.alert('錯誤', '獲取訂單資料失敗，請稍後重試。');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
        Alert.alert('錯誤', '獲取訂單資料失敗，請稍後重試。');
      });
  }, []);

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={styles.orderItem} onPress={() => navigation.navigate('OrderDetails', { orderId: item.orderId })}>
      <Text style={styles.orderTitle}>訂單號碼: {item.orderId}</Text>
      <Text style={styles.orderDate}>日期: {new Date(item.orderDate).toLocaleDateString()}</Text>
      <Text style={styles.orderAmount}>總金額: ${item.totalAmount}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>訂單管理</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.orderId.toString()}
        contentContainerStyle={styles.orderList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  orderList: {
    paddingBottom: 16,
  },
  orderItem: {
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginBottom: 16,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 4,
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderManagementPage;
