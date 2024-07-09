import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const NavigationBar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>線上購物</Text>
      <View style={styles.icons}>
        <TouchableOpacity style={styles.iconItem}>
          <Image source={{ uri: 'https://picsum.photos/30/30?Random=6' }} style={styles.icon} />
          <Text>訂單管理</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconItem}>
          <Image source={{ uri: 'https://picsum.photos/30/30?Random=7' }} style={styles.icon} />
          <Text>購物車</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  iconItem: {
    marginLeft: 20,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
});

export default NavigationBar;
