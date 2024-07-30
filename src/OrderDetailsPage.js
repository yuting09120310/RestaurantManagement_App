import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';

const OrderDetailsPage = ({ route }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://restaurantmanage.alexbase.net/api/Order/OrderDetails/${orderId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setOrderDetails(data.data);
          setLoading(false);
        } else {
          Alert.alert('錯誤', '獲取訂單詳細資料失敗，請稍後重試。');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching order details:', error);
        setLoading(false);
        Alert.alert('錯誤', '獲取訂單詳細資料失敗，請稍後重試。');
      });
  }, [orderId]);

  const renderOrderDetailItem = ({ item }) => (
    <View style={styles.detailItem}>
      <Text style={styles.detailText}>商品ID: {item.productId}</Text>
      <Text style={styles.detailText}>數量: {item.quantity}</Text>
      <Text style={styles.detailText}>單價: ${item.unitPrice}</Text>
    </View>
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
      <Text style={styles.title}>訂單詳細信息</Text>
      <FlatList
        data={orderDetails}
        renderItem={renderOrderDetailItem}
        keyExtractor={item => item.orderDetailsId ? item.orderDetailsId.toString() : item.productId.toString()} // 使用备用唯一标识符
        contentContainerStyle={styles.detailsList}
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
  detailsList: {
    paddingBottom: 16,
  },
  detailItem: {
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderDetailsPage;
