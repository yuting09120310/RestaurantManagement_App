import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';

// 主功能頁面組件（MenuPage）
const MenuPage = ({ navigation, route }) => {
  const { user } = route.params; // 從上一頁獲取使用者資訊

  // 初始化菜單項目、載入指示與選擇的分類狀態
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 組件加載時調用API獲取菜單
  useEffect(() => {
    // 從API取得菜單資料
    fetch('https://restaurantmanage.alexbase.net/api/Menu')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setItems(data.data); // 成功則設置菜單項目
        } else {
          Alert.alert('錯誤', '菜單載入失敗，請稍後重試。');
        }
        setLoading(false); // 設置載入狀態
      })
      .catch(error => {
        console.error('菜單載入錯誤:', error);
        setLoading(false); // 設置載入狀態
      });
  }, []);

  // 過濾菜單項目，顯示所選分類
  const filterItemsByCategory = category => {
    return category === 'All' ? items : items.filter(item => item.productClassId === category);
  };

  // 導航到菜單詳細頁面
  const handleItemPress = product => {
    navigation.navigate('ProductDetailPage', { product, user });
  };

  // 當資料加載中時顯示指示器
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  // 主渲染內容
  return (
    <ScrollView style={styles.container}>
      {/* 顯示菜單分類按鈕 */}
      <View style={styles.banner}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <CategoryButton label="全部" category="All" selectedCategory={selectedCategory} onPress={setSelectedCategory} />
          <CategoryButton label="炸物" category={1} selectedCategory={selectedCategory} onPress={setSelectedCategory} />
          <CategoryButton label="飲料" category={2} selectedCategory={selectedCategory} onPress={setSelectedCategory} />
          <CategoryButton label="火鍋" category={3} selectedCategory={selectedCategory} onPress={setSelectedCategory} />
          <CategoryButton label="韓料" category={4} selectedCategory={selectedCategory} onPress={setSelectedCategory} />
        </ScrollView>
      </View>

      {/* 顯示過濾後的菜單項目 */}
      <View style={styles.row}>
        {filterItemsByCategory(selectedCategory).map(item => (
          <TouchableOpacity key={item.productId} style={styles.item} onPress={() => handleItemPress(item)}>
            <Image source={{ uri: `https://restaurantmanage.alexbase.net/uploads/Product/${item.productImg1}` }} style={styles.image} />
            <Text style={styles.title}>{item.productName}</Text>
            <Text style={styles.price}>NT${item.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// 類別按鈕組件，負責顯示不同分類的按鈕並處理按下事件
const CategoryButton = ({ label, category, selectedCategory, onPress }) => {
  const isSelected = selectedCategory === category;
  return (
    <TouchableOpacity
      style={[styles.categoryButton, isSelected && styles.selectedCategoryButton]}
      onPress={() => onPress(category)}
    >
      <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>{label}</Text>
    </TouchableOpacity>
  );
};

// 样式表 (StyleSheet)，使頁面更現代化、專業化
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f7f7f7', // 淡灰色背景，讓內容突出
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    padding: 5,
    backgroundColor: '#ffffff', // 背景顏色設定為白色，增加對比
    borderRadius: 30, // 更大圓角
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  categoryButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0', // 單純的背景色
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: '#007bff', // 選中的分類顏色
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff', // 選中的字體顏色
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    marginVertical: 15,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // 提升卡片的層次感
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  price: {
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 15,
    color: '#ff5733',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuPage;
