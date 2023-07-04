//@ts-nocheck
import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { verticalScale } from 'react-native-size-matters';
import UserAvatar from 'react-native-user-avatar';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getMessages, createMessage } from '../../data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Swipeable } from 'react-native-gesture-handler';
import { black, grey, lighterBlue, white } from '../../constants';
import { tSh } from '../../utility';
import { Avatar } from 'react-native-elements';

const Chat = ({ navigation, route }) => {
  const auth = useSelector((state: any) => state.auth);
  const [item, setItem] = useState<Item>({});

  const handleSubmit = async (message) => {
    const datum = await AsyncStorage.getItem('@Token');
    const token = await JSON.parse(datum);
    const newMessage = {
      message_body: message[0].text,
    };

    if (item.id) {
      newMessage.property_ref = item.id;
    }
    const response = await createMessage(token.token, newMessage);

    if (response.success) {
      setItem({});
    }
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    dragAnimatedValue: Animated.AnimatedInterpolation,
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.swipedRow}>
        <View style={styles.swipedConfirmationContainer}>
          <Text style={styles.deleteConfirmationText}>Are you sure?</Text>
        </View>
        <Animated.View style={[styles.deleteButton, { opacity }]}>
          <TouchableOpacity>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  type Item = {
    id: string;
    name: string;
    location: string;
    price: string;
    baths: string;
    rooms: string;
    square: string;
    image: string;
  };

  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState<boolean>(false);

  /*useEffect(() => {
    if (route.params) {
      const {id, name, location, price, baths, rooms, square, image} =
        route.params;

      setItem({
        id,
        name,
        location,
        price,
        baths,
        rooms,
        square,
        image,
      });
      setShow(true);
    } else {
      setShow(false);
      navigation.setParams({});
    }
  }, [navigation, route.params]);*/

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Avatar
            rounded
            source={{
              uri: 'https://res.cloudinary.com/deex1bwvl/image/upload/v1647738498/Bluescope/alex-suprun-ZHvM3XIOHoE-unsplash_ptlaxf.jpg',
            }}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={signOutNow}>
          <Text>logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      const datum = await AsyncStorage.getItem('@Token');
      const token = JSON.parse(datum);
      const response = await getMessages(token.token);
      const info = response.data.reverse().map((item) => {
        return {
          _id: item._id,
          text: item.text,
          createdAt: item.created_at,
          user: item.user,
          sent: item.sent,
          received: item.received,
          conversation_id: item.conversation_id,
        };
      });

      // dispatch(CreateMessage(data.data))
      setMessages(info);
    };

    fetchData();
  }, [messages]);

  let renderBubble = (props) => (
    <Bubble
      {...props}
      textProps={{
        style: {
          color: props.position === 'left' ? black : white,
        },
      }}
      textStyle={{
        left: {
          color: black,
        },
        right: {
          color: white,
        },
      }}
    />
  );

  const onSend = useCallback(
    (previousMessages = []) => handleSubmit(previousMessages),
    [handleSubmit],
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, styles.boxShadow]}>
        <UserAvatar
          size={35}
          style={{
            borderRadius: 5,
            height: 'auto',
            width: 'auto',
            marginRight: 10,
          }}
          imageStyle={{ borderRadius: 5 }}
          name={auth.firstname}
          // src="https://res.cloudinary.com/deex1bwvl/image/upload/v1647738498/Bluescope/alex-suprun-ZHvM3XIOHoE-unsplash_ptlaxf.jpg"
        />
        <Text style={{ color: black, fontFamily: 'PlusJakartaSans-Regular' }}>
          {`${auth.firstname} ${auth.lastname}`}
        </Text>
      </View>

      <GiftedChat
        isTyping={true}
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={onSend}
        renderBubble={renderBubble}
        user={{
          _id: auth.id,
          name: auth.firstname,
          avatar: 'https://placeimg.com/140/140/any',
        }}
        textInputStyle={{
          color: black,
        }}
      />

      {item.id != undefined && (
        <Swipeable renderRightActions={renderRightActions}>
          <View style={[styles.item, styles.boxShadow]}>
            <Image
              source={{
                uri: item.image[0],
              }}
              style={{ flex: 2.3, borderRadius: 10, margin: 7 }}
            />

            <View style={{ flex: 3, margin: 10 }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '500',
                  fontSize: 14,
                  fontFamily: 'PlusJakartaSans-Regular',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  color: '#BDBDBD',
                  fontFamily: 'PlusJakartaSans-Regular',
                  fontSize: 11,
                }}>
                {item.location}
              </Text>

              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Text
                  style={{
                    marginRight: 15,
                    color: '#BDBDBD',
                    fontSize: 11,
                    fontFamily: 'PlusJakartaSans-Regular',
                  }}>
                  <Icon name="bathtub" size={12} color="#3546CB" />
                  {item.baths} Baths
                </Text>
                <Text
                  style={{
                    marginRight: 15,
                    color: '#BDBDBD',
                    fontSize: 11,
                    fontFamily: 'PlusJakartaSans-Regular',
                  }}>
                  <Icon name="hotel" size={12} color="#3546CB" />
                  {item.rooms} Rooms
                </Text>
                <Text
                  style={{
                    marginRight: 15,
                    color: '#BDBDBD',
                    fontSize: 11,
                    fontFamily: 'PlusJakartaSans-Regular',
                  }}>
                  <Icon name="business" size={12} color="#3546CB" />
                  {item.square} sq
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: '#BDBDBD',
                margin: 10,
                fontFamily: 'PlusJakartaSans-Regular',
              }}>
              {item.price} Tsh
            </Text>
          </View>
        </Swipeable>
      )}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lighterBlue,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: white,
  },
  send: {
    flexDirection: 'row',
    width: 340,
    backgroundColor: lighterBlue,
    borderRadius: 25,
    justifyContent: 'center',
  },
  item: {
    height: verticalScale(80),
    backgroundColor: white,
    margin: 15,
    borderRadius: 15,
    flexDirection: 'row',
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
