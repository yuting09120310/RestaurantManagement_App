import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

const CartPage = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const memberId = 3; // 這裡替換成實際的 memberId

  useEffect(() => {
    fetch(`https://restaurantmanage.ddns.net/api/Cart/${memberId}`)
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
  }, []);

  const deleteCartItem = (cartId) => {
    fetch('https://restaurantmanage.ddns.net/api/Cart/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCartItems(cartItems.filter(item => item.cartId !== cartId));
          Alert.alert('成功', '商品已成功刪除');
        } else {
          Alert.alert('錯誤', '刪除商品失敗，請稍後重試。');
        }
      })
      .catch((error) => {
        console.error('Error deleting cart item:', error);
        Alert.alert('錯誤', '刪除商品失敗，請稍後重試。');
      });
  };

  const createOrder = () => {
    console.log(memberId)
    fetch('https://restaurantmanage.ddns.net/api/Order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ memberId: memberId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Alert.alert('成功', '訂單已成功創建');
          setCartItems([]);
        } else {
          Alert.alert('錯誤', data.message);
        }
      })
      .catch((error) => {
        console.error('Error creating order:', error);
        Alert.alert('錯誤', '創建訂單失敗，請稍後重試。');
      });
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: `https://restaurantmanage.ddns.net/uploads/Product/${item.productImg1}` }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.productName}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text style={styles.itemQuantity}>數量: {item.quantity}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteCartItem(item.cartId)}>
        <Image source={require('../Images/delete_icon.png')} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

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
        keyExtractor={item => item.cartId.toString()}
        contentContainerStyle={styles.cartList}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>總金額: ${getTotalPrice()}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={createOrder}>
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
    position: 'relative',
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
  deleteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: 50,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    width: 24,
    height: 24,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartPage;
