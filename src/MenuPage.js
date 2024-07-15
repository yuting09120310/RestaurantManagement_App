import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';


const MenuPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default category

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
          <View key={item.productId} style={styles.item}>
            <Image source={{ uri: `https://restaurantmanage.ddns.net/uploads/Product/${item.productImg1}` }} style={styles.image} />
            <Text style={styles.title}>{item.productName}</Text>
            <Text style={styles.price}>NT${item.price}</Text>
          </View>
        ))}
      </View>
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
});

export default MenuPage;
