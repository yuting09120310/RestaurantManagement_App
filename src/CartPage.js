import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CartPage = ({ navigation }) => {
  // 假設有一個商品列表的資料
  const cartItems = [
    { id: '1', name: '綠茶', price: 100, quantity: 2, image: 'https://picsum.photos/100/100?random=1' },
    { id: '2', name: '紅茶', price: 150, quantity: 1, image: 'https://picsum.photos/100/100?random=2' },
    { id: '3', name: '奶茶', price: 200, quantity: 3, image: 'https://picsum.photos/100/100?random=3' },
    { id: '4', name: '奶茶', price: 200, quantity: 3, image: 'https://picsum.photos/100/100?random=4' },
    { id: '5', name: '奶茶', price: 200, quantity: 3, image: 'https://picsum.photos/100/100?random=5' },
    { id: '6', name: '奶茶', price: 200, quantity: 3, image: 'https://picsum.photos/100/100?random=6' },
    { id: '7', name: '奶茶', price: 200, quantity: 3, image: 'https://picsum.photos/100/100?random=7' },
    { id: '8', name: '奶茶', price: 200, quantity: 3, image: 'https://picsum.photos/100/100?random=8' },
    { id: '9', name: '奶茶', price: 200, quantity: 3, image: 'https://picsum.photos/100/100?random=9' },
  ];

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text style={styles.itemQuantity}>數量: {item.quantity}</Text>
      </View>
    </View>
  );

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>購物車</Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>總金額: ${getTotalPrice()}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={() => alert('結帳功能未實作')}>
        <Text style={styles.checkoutButtonText}>結帳</Text>
      </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginBottom: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666666',
  },
  totalContainer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#EEEEEE',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  checkoutButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartPage;
