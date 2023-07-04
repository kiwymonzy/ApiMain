//@ts-nocheck
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { black, grey, white, primary, primaryVariant } from '../../constants';
import { NavigationAction } from '@react-navigation/native';
import CustomButton from '../Button/component';

const { width } = Dimensions.get('window');

type NewsFeedParams = {
  post_id: string;
  title: string;
  body: string;
  image: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  navigator: () => void;
};

const NewsCard = ({
  post_id,
  title,
  body,
  image,
  author_id,
  created_at,
  updated_at,
  navigator,
}: // navigator,
NewsFeedParams) => {
  return (
    <View key={post_id} style={styles.newsCard}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.content}>
          <Text
            style={{
              color: black,
              fontSize: 18,
              fontFamily: 'PlusJakartaSans-Regular',
              flexShrink: 1,
              fontWeight: 'bold',
            }}>
            {title}
          </Text>
          <View style={styles.bottom}>
            <Text
              style={{
                color: grey,
                fontSize: 14,
                fontFamily: 'PlusJakartaSans-Regular',
              }}>
              Posted: {new Date(created_at).toDateString()}
            </Text>
            <Pressable
              style={({ pressed }) => [
                { backgroundColor: pressed ? primaryVariant : primary },
                styles.filter,
              ]}
              onPress={navigator}>
              <Text
                style={{
                  color: white,
                  fontSize: 14,
                  fontFamily: 'PlusJakartaSans-Regular',
                }}>
                Read
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: '95%',
    padding: scale(5),
  },
  filter: {
    width: 'auto',
    padding: 5,
    paddingHorizontal: 15,
    height: 'auto',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
