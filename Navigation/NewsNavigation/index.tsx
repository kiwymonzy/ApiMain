import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import newsFeed from '../../src/screens/newsFeed';
import news from '../../src/screens/news';

const News = createNativeStackNavigator();

const NewsNavigation = () => {
  return (
    <News.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Newsfeed">
      <News.Screen name="Newsfeed" component={newsFeed} />
      <News.Screen name="News" component={news} />
    </News.Navigator>
  );
};

export default NewsNavigation;
