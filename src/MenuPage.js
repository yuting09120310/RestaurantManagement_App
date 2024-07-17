import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert, Modal, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MenuPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default category
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState('1');

  useEffect(() => {
    fetch('https://restaurantmanage.ddns.net/api/Menu')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching menu:', error);
        setLoading(false);
      });
  }, []);

  const filterItemsByCategory = (category) => {
    if (category === 'All') {
      return items; // Return all items
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
      Alert.alert('錯誤', '請輸入有效數量（大於0）。');
    }
  };

  const submitOrder = (productId, quantity) => {
    // Example POST request to submit order
    fetch('https://restaurantmanage.ddns.net/api/SubmitOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      // Handle success response from API
      Alert.alert('訂單提交成功', `訂單號：${data.orderId}`);
    })
    .catch((error) => {
      console.error('Error submitting order:', error);
      Alert.alert('錯誤', '訂單提交失敗，請稍後重試。');
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
          <Text style={selectedCategory === 'All' ? styles.selectedCategoryText : styles.categoryText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selectedCategory === 1 ? styles.selectedCategoryButton : styles.categoryButton} onPress={() => setSelectedCategory(1)}>
          <Text style={selectedCategory === 1 ? styles.selectedCategoryText : styles.categoryText}>Category 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={selectedCategory === 2 ? styles.selectedCategoryButton : styles.categoryButton} onPress={() => setSelectedCategory(2)}>
          <Text style={selectedCategory === 2 ? styles.selectedCategoryText : styles.categoryText}>Category 2</Text>
        </TouchableOpacity>
        {/* Add more categories as needed */}
      </View>
      <View style={styles.row}>
        {filterItemsByCategory(selectedCategory).map((item) => (
          <TouchableOpacity key={item.productId} style={styles.item} onPress={() => handleItemPress(item)}>
            <Image source={{ uri: `https://restaurantmanage.ddns.net/uploads/Product/${item.productImg1}` }} style={styles.image} />
            <Text style={styles.title}>{item.productName}</Text>
            <Text style={styles.price}>NT${item.price}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal for selecting quantity */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selectedItem ? `${selectedItem.productName} - NT$${selectedItem.price}` : ''}</Text>
            <Picker
              selectedValue={quantity}
              onValueChange={(itemValue, itemIndex) => setQuantity(itemValue)}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
            </Picker>
            <View style={styles.modalButtonContainer}>
              <Button title="取消" onPress={() => setModalVisible(false)} />
              <Button title="確定" onPress={handleConfirm} />
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
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

export default MenuPage;
