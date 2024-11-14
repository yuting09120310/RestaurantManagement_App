// 引入React和React Native所需的元件和函式
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';

// 商品詳情頁元件，從上頁接收 route 和 navigation 參數
const ProductDetailPage = ({ route, navigation }) => {
  // 從路由參數中取得商品資料 (product) 和用戶資訊 (user)
  const { product, user } = route.params;
  // 建立狀態來追蹤商品數量，預設值為1
  const [quantity, setQuantity] = useState(1);

  // 點擊加入購物車按鈕時的處理
  const handleAddToCart = () => {
    // 確認輸入的數量為正整數
    if (parseInt(quantity) > 0) {
      // 如果數量有效，則執行訂單提交函式
      submitOrder(product.productId, parseInt(quantity));
    } else {
      // 若無效顯示錯誤訊息
      Alert.alert('錯誤', '請輸入有效數量（大於0）。', [{ text: '確定' }]);
    }
    // 跳轉回購物車頁面
    navigation.navigate('MenuPage');
  };

  // 提交訂單到伺服器的函式
  const submitOrder = (productId, quantity) => {
    // 構建要發送的購物車資料
    const cartData = {
      cartId: 0, // 假設初始 cartId 為 0，可根據實際需求調整
      memberId: user.memberId, // 用戶 ID
      productId: productId, // 商品 ID
      quantity: quantity, // 選擇的商品數量
    };

    // 發送請求到伺服器新增至購物車
    fetch('https://restaurantmanage.alexbase.net/api/Cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData), // 將購物車資料轉成JSON
    })
      .then((response) => response.json()) // 將伺服器回應轉為JSON
      .then((data) => {
        // 若伺服器回應表示成功，顯示成功訊息
        if (data.success) {
          Alert.alert('操作成功', data.message, [{ text: '確定' }]);
        } else {
          // 否則顯示錯誤訊息
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        // 如果發生錯誤顯示錯誤訊息
        console.error('Error submitting order:', error);
        Alert.alert('新增錯誤', '新增失敗，請稍後重試。', [{ text: '確定' }]);
      });
  };

  // 商品單價，若無價格則設為0
  const unitPrice = product.price || 0;
  // 計算小計（單價 * 數量）
  const subtotal = unitPrice * quantity;
  // 假設固定折扣10元
  const discount = 10;

  return (
    <View style={styles.container}>
      {/* ScrollView：用於滾動顯示較多內容的頁面 */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* 商品圖片 */}
        <Image
          source={{ uri: `https://restaurantmanage.alexbase.net/uploads/Product/${product.productImg1}` }}
          style={styles.productImage}
        />

        {/* 商品名稱 */}
        <Text style={styles.productTitle}>{product.productName}</Text>

        {/* 分隔線 */}
        <View style={styles.separator} />

        {/* 數量選擇區 */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>選擇數量                             </Text>
          {/* 減少數量按鈕 */}
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))} // 避免數量低於1
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          {/* 顯示當前數量 */}
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric" // 讓鍵盤僅顯示數字
            value={String(quantity)} // 顯示數量
            onChangeText={(text) => setQuantity(Math.max(1, parseInt(text) || 1))} // 確保數量至少為1
          />

          {/* 增加數量按鈕 */}
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* 分隔線 */}
        <View style={styles.separator} />

        {/* 商品描述 */}
        <Text style={styles.productDescription}>{product.description}</Text>
      </ScrollView>

      {/* 小計和折扣區 */}
      <View style={styles.bottomSection}>
        <View style={styles.subtotalContainer}>
          <Text style={styles.subtotalText}>小計</Text>
          <Text style={styles.subtotalAmount}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.discountContainer}>
          <Text style={styles.discountText}>整組省</Text>
          <Text style={styles.discountAmount}>${discount.toFixed(2)}</Text>
        </View>
        {/* 加入購物車按鈕 */}
        <Button title="加入購物車" onPress={handleAddToCart} />
      </View>
    </View>
  );
};

// 樣式設置，控制頁面元素的外觀
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 200,
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD',
    marginVertical: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 18,
  },
  quantityButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#333',
  },
  quantityInput: {
    width: 60,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginHorizontal: 16,
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtotalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  discountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  discountText: {
    fontSize: 18,
  },
  discountAmount: {
    fontSize: 18,
    color: '#FF6347',
  },
});

export default ProductDetailPage;
