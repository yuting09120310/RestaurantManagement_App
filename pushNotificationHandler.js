// pushNotificationHandler.ts
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

// 配置推播通知
export const configurePushNotifications = () => {
  // 前景通知處理
  messaging().onMessage(async (remoteMessage) => {
    try {
      console.log('Foreground notification received:', remoteMessage);
      showNotification(remoteMessage.notification);
    } catch (error) {
      console.error('Error handling foreground notification:', error);
    }
  });

  // 當應用在背景或被關閉時，開啟通知會觸發
  messaging().onNotificationOpenedApp((remoteMessage) => {
    try {
      console.log('Notification caused app to open:', remoteMessage);
    } catch (error) {
      console.error('Error handling notification opened app:', error);
    }
  });

  // 應用被完全關閉後，從推播通知啟動應用
  messaging().getInitialNotification().then((remoteMessage) => {
    try {
      if (remoteMessage) {
        console.log('App was opened from a terminated state by a notification:', remoteMessage);
      }
    } catch (error) {
      console.error('Error handling initial notification:', error);
    }
  });
};

// 顯示通知
const showNotification = (notification) => {
  try {
    PushNotification.localNotification({
      channelId: '8088',          // 頻道ID，需提前在 Android 設定
      title: notification?.title, // 標題
      message: notification?.body,// 內容
      playSound: true,            // 播放聲音
      soundName: 'default',       // 預設聲音
      vibrate: true,              // 震動
      priority: 'high',           // 優先級
      visibility: 'public',       // 顯示通知
    });
  } catch (error) {
    console.error('Error showing notification:', error);
  }
};
