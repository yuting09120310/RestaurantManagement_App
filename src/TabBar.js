import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import your local images
import shopIcon from '../Images/shop.png';
import locationIcon from '../Images/location.png';
import homeIcon from '../Images/home.png';
import teaIcon from '../Images/tea.png';
import profileIcon from '../Images/profile.png';

const TabBar = () => {
  const navigation = useNavigation();

  const handleTabPress = (tabName) => {
    navigation.navigate(tabName);
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress('MenuPage')}>
        <Image source={shopIcon} style={styles.icon} />
        <Text style={styles.tabText}>線上購物</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress('Menu2')}>
        <Image source={locationIcon} style={styles.icon} />
        <Text style={styles.tabText}>門市位置</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress('Menu3')}>
        <Image source={homeIcon} style={styles.icon} />
        <Text style={styles.tabText}>首頁</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress('Menu4')}>
        <Image source={teaIcon} style={styles.icon} />
        <Text style={styles.tabText}>找好茶</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => handleTabPress('MemberCenter')}>
        <Image source={profileIcon} style={styles.icon} />
        <Text style={styles.tabText}>會員中心</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    color: '#007AFF',
    fontSize: 12, // Adjust font size as needed
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
});

export default TabBar;
