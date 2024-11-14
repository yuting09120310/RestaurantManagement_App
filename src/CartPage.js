import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

const CartPage = ({ route }) => {
  const { user } = route.params; // 從路由參數中提取 memberId
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.memberId) {
      fetch(`https://restaurantmanage.alexbase.net/api/Cart/${user.memberId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setCartItems(data.data);
            setLoading(false);
          } else {
            Alert.alert('錯誤', '獲取購物車資料失敗，請稍後重試。');
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching cart items:', error);
          setLoading(false);
          Alert.alert('錯誤', '獲取購物車資料失敗，請稍後重試。');
        });
    } else {
      Alert.alert('錯誤', '無效的會員ID');
    }
  }, [user.memberId]);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.cartText}>商品ID: {item.productId}</Text>
      <Text style={styles.cartText}>數量: {item.quantity}</Text>
      <Text style={styles.cartText}>單價: ${item.unitPrice}</Text>
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
      <Text style={styles.title}>購物車</Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.productId.toString()}
        contentContainerStyle={styles.cartList}
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
  cartList: {
    paddingBottom: 16,
  },
  cartItem: {
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginBottom: 16,
  },
  cartText: {
    fontSize: 16,
    marginBottom: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartPage;
