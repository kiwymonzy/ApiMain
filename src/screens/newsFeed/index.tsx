//@ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import NewsCard from '../../components/NewsCard';
import { lighterBlue, primary, white, black } from '../../constants';
import { getPosts } from '../../data';
import { isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { saveNews, saveSelectedNews } from '../../state/news/newsSlice';
import { setLoading } from '../../state/global';

const { width, height } = Dimensions.get('window');

const newsFeed = ({ navigation }: { navigation: any }) => {
  const isFocused = useIsFocused();

  const token = useSelector((state: any) => state.token);

  const news = useSelector((state: any) => state.news.news);

  const loading = useSelector((state: any) => state.globalState.loading);

  const dispatch = useDispatch();

  // const [news, setNews] = useState<any>([]);

  useEffect(() => {
    if (isFocused) {
      fetchNews();
    }
  }, [isFocused]);

  const fetchNews = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getPosts(token.token);
      dispatch(saveNews(data.data));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
      console.log(err);
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <NewsCard
        key={item.id}
        image={item.images[0]}
        title={item.title}
        post_id={item.post_id}
        body={item.body}
        author_id={item.author_id}
        created_at={item.created_at}
        updated_at={item.updated_at}
        navigator={() => {
          dispatch(saveSelectedNews(item));
          navigation.navigate('News');
        }}
      />
    );
  };
  return (
    <ScrollView style={styles.scroll}>
      {loading && (
        <View
          style={{
            width,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            height: height,
          }}>
          <ActivityIndicator size="large" color={primary} />

          <Text
            style={{
              color: primary,
              fontSize: 12,
              fontFamily: 'PlusJakartaSans-Regular',
              marginTop: 10,
            }}>
            Fetching News
          </Text>
        </View>
      )}
      {!loading && !isEmpty(news) && (
        <View style={styles.container}>
          {/* <View style={[styles.header, styles.boxShadow]}> */}
          <Text
            style={{
              color: primary,
              fontSize: 24,
              marginBottom: verticalScale(40),
              fontFamily: 'PlusJakartaSans-Regular',
            }}>
            News Feed
          </Text>
          {/* </View> */}
          <View>
            <FlatList
              data={news}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default newsFeed;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: lighterBlue,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: lighterBlue,
    flex: 1,
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(20),
  },
  newsCard: {
    borderRadius: 8,
    paddingTop: verticalScale(8),
    backgroundColor: white,
    marginBottom: 10,
    width: width - 30,
    paddingBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageCover: {
    position: 'absolute',
    left: 100,
    top: 100,
    elevation: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 2555, 0.4)',
    overflow: 'hidden',
    opacity: 0.3,
  },
  image: {
    width: '95%',
    marginBottom: 5,
    borderRadius: moderateScale(8),
    height: verticalScale(200),
  },
  tags: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  content: {
    justifyContent: 'flex-start',
    width: '100%',
    padding: scale(5),
  },
});

const generateBoxShadowStyle = (
  xOffset: number,
  yOffset: number,
  shadowColorIos: string,
  shadowOpacity: number,
  shadowRadius: number,
  elevation: number,
  shadowColorAndroid: string,
) => {
  if (Platform.OS === 'ios') {
    styles.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOffset: { width: xOffset, height: yOffset },
      shadowOpacity,
      shadowRadius,
    };
  } else if (Platform.OS === 'android') {
    styles.boxShadow = {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
};

generateBoxShadowStyle(-2, 4, black, 0.2, 3, 7, black);
