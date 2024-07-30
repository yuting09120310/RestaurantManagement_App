import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert, Modal, Button, TextInput } from 'react-native';

const MenuPage = ({ route }) => {
  const { user } = route.params; // 从路由参数获取 memberId
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState('1');

  useEffect(() => {
    fetch('https://restaurantmanage.alexbase.net/api/Menu')
      .then((response) => response.json())
      .then((data) => {
        if(data.success){
          setItems(data.data);
          setLoading(false);
        }else {
          Alert.alert('錯誤', '菜單載入失敗，請稍後重試。');
        }
      })
      .catch((error) => {
        console.error('Error fetching menu:', error);
        setLoading(false);
      });
  }, []);

  const filterItemsByCategory = (category) => {
    if (category === 'All') {
      return items;
    } else {
      return items.filter(item => item.productClassId === category);
    }
  };

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (parseInt(quantity) > 0) {
      submitOrder(selectedItem.productId, parseInt(quantity));
      setModalVisible(false);
    } else {
      Alert.alert(
        '錯誤',
        '請輸入有效數量（大於0）。',
        [{ text: '確定' }]
      );
    }
  };

  const submitOrder = (productId, quantity) => {
    const cartData = {
      cartId: 0, // 假設cartId為0，根據需要修改
      memberId: user.memberId,
      productId: productId,
      quantity: quantity,
    };

    fetch('https://restaurantmanage.alexbase.net/api/Cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartData),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        Alert.alert(
          '操作成功',
          data.message,
          [{ text: '確定' }]
        );
      } else {
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      console.error('Error submitting order:', error);
      Alert.alert(
        '新增錯誤',
        '新增失敗，請稍後重試。',
        [{ text: '確定' }]
      );
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
        <TouchableOpacity style={selectedCategory === 'All' ? styles.selectedCategoryButton : styles.categoryButton} onPress={() => setSelectedCategory('All')}>
          <Text style={selectedCategory === 'All' ? styles.selectedCategoryText : styles.categoryText}>全部</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selectedCategory === 1 ? styles.selectedCategoryButton : styles.categoryButton} onPress={() => setSelectedCategory(1)}>
          <Text style={selectedCategory === 1 ? styles.selectedCategoryText : styles.categoryText}>炸物</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selectedCategory === 2 ? styles.selectedCategoryButton : styles.categoryButton} onPress={() => setSelectedCategory(2)}>
          <Text style={selectedCategory === 2 ? styles.selectedCategoryText : styles.categoryText}>飲料</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        {filterItemsByCategory(selectedCategory).map((item) => (
          <TouchableOpacity key={item.productId} style={styles.item} onPress={() => handleItemPress(item)}>
            <Image source={{ uri: `https://restaurantmanage.alexbase.net/uploads/Product/${item.productImg1}` }} style={styles.image} />
            <Text style={styles.title}>{item.productName}</Text>
            <Text style={styles.price}>NT${item.price}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selectedItem ? `${selectedItem.productName} - NT$${selectedItem.price}` : ''}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
            />
            <View style={styles.modalButtonContainer}>
              <View style={styles.modalButton}>
                <Button title="取消" onPress={() => setModalVisible(false)} />
              </View>
              <View style={styles.modalButton}>
                <Button title="確定" onPress={handleConfirm} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    elevation: 3,
  },
  selectedCategoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#007bff',
    elevation: 3,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  selectedCategoryText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    marginVertical: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff6347',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '80%',
    textAlign: 'center',
  },
});

export default MenuPage;
