/* eslint-disable */
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
//@ts-ignore
import { isEmpty } from 'lodash';
import { ScrollView } from 'react-native-gesture-handler';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import {
  black,
  grey,
  lighterBlue,
  primary,
  primaryVariant,
  white,
} from '../../constants';
import { getPost } from '../../data';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../../state/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
//@ts-ignore
import RenderHtml from 'react-native-render-html';

const { width, height } = Dimensions.get('window');

const news = ({ navigation }: { navigation: any }) => {
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  const token = useSelector((state: any) => state.token);

  const loading = useSelector((state: any) => state.globalState.loading);

  const newsId = useSelector((state: any) => state.news.selectednews.post_id);

  const [news, setNews] = useState<any>([]);

  useEffect(() => {
    if (isFocused) {
      fetchNews();
    }
  }, [isFocused]);

  const fetchNews = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getPost(token.token, newsId);
      setNews(data.data);
      dispatch(setLoading(false));
    } catch (err) {
      console.warn('eeee', err);
      console.log(err);
      dispatch(setLoading(false));
    }
  };

  const source = {
    html: `<div style="color:black;">${news.body}</div>`,
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
          <View style={styles.header}>
            <Pressable
              style={({ pressed }) => [
                { backgroundColor: pressed ? primaryVariant : primary },
                styles.filter,
              ]}
              onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back"
                size={25}
                color="white"
                style={{}}
              />
            </Pressable>
          </View>
          <Image style={styles.image} source={{ uri: news?.images[0] }} />
          <View style={{ alignItems: 'flex-end', width: '90%' }}>
            <Text
              style={{
                color: grey,
                fontSize: 16,
                marginBottom: verticalScale(10),
                fontFamily: 'PlusJakartaSans-Regular',
              }}>
              {new Date(news?.created_at).toDateString()}
            </Text>
          </View>

          <View style={styles.containee}>
            <Text
              style={{
                color: black,
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: verticalScale(10),
                fontFamily: 'PlusJakartaSans-Regular',
              }}>
              {news.title}
            </Text>
            <RenderHtml contentWidth={width} source={source} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default news;

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
  containee: {
    width: '90%',
    alignItems: 'flex-start',
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
  header: {
    marginVertical: 20,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  filter: {
    width: 'auto',
    padding: 5,
    height: 'auto',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
