import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const TabBar = ({ selectedTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tabItem, selectedTab === '線上購物' && styles.selectedTabItem]}
        onPress={() => onTabPress('線上購物')}
      >
        <Image source={{ uri: 'https://picsum.photos/30/30?Random=1' }} style={styles.icon} />
        <Text style={styles.tabText}>線上購物</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabItem, selectedTab === '門市位置' && styles.selectedTabItem]}
        onPress={() => onTabPress('門市位置')}
      >
        <Image source={{ uri: 'https://picsum.photos/30/30?Random=2' }} style={styles.icon} />
        <Text style={styles.tabText}>門市位置</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabItem, selectedTab === '首頁' && styles.selectedTabItem]}
        onPress={() => onTabPress('首頁')}
      >
        <Image source={{ uri: 'https://picsum.photos/30/30?Random=3' }} style={styles.icon} />
        <Text style={styles.tabText}>首頁</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabItem, selectedTab === '找好茶' && styles.selectedTabItem]}
        onPress={() => onTabPress('找好茶')}
      >
        <Image source={{ uri: 'https://picsum.photos/30/30?Random=4' }} style={styles.icon} />
        <Text style={styles.tabText}>找好茶</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabItem, selectedTab === '會員中心' && styles.selectedTabItem]}
        onPress={() => onTabPress('會員中心')}
      >
        <Image source={{ uri: 'https://picsum.photos/30/30?Random=5' }} style={styles.icon} />
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
  selectedTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#333', // 改變選中時的底線顏色
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  tabText: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default TabBar;
