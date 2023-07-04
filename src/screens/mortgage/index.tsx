//@ts-nocheck
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Slider } from '@sharcoux/slider';
import {
  background,
  grey,
  lighterBlue,
  primary,
  primaryVariant,
  white,
} from '../../constants';
import CustomButton from '../../components/Button/component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CurrencyInput from 'react-native-currency-input';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Mortgage = ({ navigation }) => {
  const [mort, setMort] = useState<number>(0);

  const [price, setPrice] = useState<number>(0);

  const [deposit, setDeposit] = useState<number>(0);

  const [rate, setRate] = useState<number>(0);

  const [period, setPeriod] = useState<number>(0);

  const [loan, setLoan] = useState<number>(0);

  const handleCompute = () => {
    setLoan(price - deposit);

    const part1 = (price - deposit) * (rate / 12);

    const part2 = 1 - Math.pow(1 + rate / 12, -12 * period);

    const mortgage = part1 / part2;

    setMort(mortgage.toFixed(2));
  };

  const commaSeparators = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  // Payment = pv* apr/12*(1+apr/12)^(nper*12)/((1+apr/12)^(nper*12)-1)

  //   Rate is the interest rate, usually expressed as an annual percentage rate (APR). If payments are made once a year then just plug in the APR. However, payments are usually once a month. So you need to divide the rate by 12.
  // Nper is the number of payment periods. Again, if payments are made once a year then nper is just the number of years of the loan. However, payments are usually once a month. So you need to multiply the nper by 12.
  // Pv is the present value of the loan, in other words the loan amount today.

  return (
    <KeyboardAwareScrollView style={styles.super}>
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              position: 'absolute',
              top: 0,
              zIndex: 1,
              width: '100%',
            }}>
            <Pressable onPress={() => navigation.goBack()}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#EFF1FFA6',
                  marginLeft: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Ionicons
                  name="chevron-back"
                  size={30}
                  color="#3546CB"
                  style={{}}
                />
              </View>
            </Pressable>
          </View>
          <Text
            style={{
              color: primary,
              fontSize: 24,
              marginBottom: verticalScale(40),
              fontFamily: 'PlusJakartaSans-Regular',
            }}>
            Mortgage Calculator
          </Text>
        </View>
        <View style={styles.sections}>
          <Text
            style={{
              color: primary,
              fontSize: 14,
              marginBottom: verticalScale(10),
              fontFamily: 'PlusJakartaSans-Regular',
            }}>
            Price of the house
          </Text>
          <View style={styles.content}>
            <CurrencyInput
              style={styles.input}
              value={price}
              placeholderTextColor={grey}
              placeholder="1,000,000"
              onChangeValue={setPrice}
              delimiter=","
              separator="."
              precision={0}
              onChangeText={(formattedValue) => {
                console.log(formattedValue, price);
              }}
            />
            <Text
              style={{
                color: primary,
                fontSize: 14,
                fontFamily: 'PlusJakartaSans-Regular',
              }}>
              TZS
            </Text>
          </View>
        </View>

        <View style={styles.sections}>
          <Text
            style={{
              color: primary,
              fontSize: 14,
              marginBottom: verticalScale(10),
              fontFamily: 'PlusJakartaSans-Regular',
            }}>
            Down payment
          </Text>
          <View style={styles.content}>
            <CurrencyInput
              style={styles.input}
              value={deposit}
              placeholderTextColor={grey}
              placeholder="1,000,000"
              onChangeValue={setDeposit}
              delimiter=","
              separator="."
              precision={0}
              onChangeText={(formattedValue) => {
                console.log(formattedValue, price);
              }}
            />
            <Text
              style={{
                color: primary,
                fontSize: 14,
                fontFamily: 'PlusJakartaSans-Regular',
              }}>
              TZS
            </Text>
          </View>
        </View>

        <View style={styles.sections}>
          <Text
            style={{
              color: primary,
              fontSize: 14,
              marginBottom: verticalScale(10),
              fontFamily: 'PlusJakartaSans-Regular',
            }}>
            Interest Rate
          </Text>
          <View style={styles.content}>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor={grey}
              keyboardType="number-pad"
              value={rate}
              onChangeText={(text: number) => setRate(text / 100)}
            />
            <Text
              style={{
                color: primary,
                fontSize: 14,
                fontFamily: 'PlusJakartaSans-Regular',
              }}>
              %
            </Text>
          </View>
        </View>

        <View style={styles.sections}>
          <Text
            style={{
              color: primary,
              fontSize: 14,
              marginBottom: verticalScale(10),
              fontFamily: 'PlusJakartaSans-Regular',
            }}>
            Repayment Period
          </Text>
          <View style={styles.content}>
            <TextInput
              style={styles.input}
              placeholder="5"
              placeholderTextColor={grey}
              keyboardType="number-pad"
              value={period}
              onChangeText={(text: number) => setPeriod(text)}
            />
            <Text
              style={{
                color: primary,
                fontSize: 14,
                fontFamily: 'PlusJakartaSans-Regular',
              }}>
              Years
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 15,
          }}>
          <CustomButton onClick={handleCompute} text="Calculate" />
        </View>
        <View>
          <Text
            style={{
              color: primary,
              fontSize: 18,
              marginTop: verticalScale(15),
              fontFamily: 'PlusJakartaSans-Regular',
            }}>
            Loan Amount:{commaSeparators(loan)} TZS
          </Text>
          <Text
            style={{
              color: primary,
              fontSize: 18,
              marginTop: verticalScale(15),
              fontFamily: 'PlusJakartaSans-Regular',
            }}>
            Repayment Period:{period} years
          </Text>
          <Text
            style={{
              color: primary,
              fontSize: 18,
              marginTop: verticalScale(15),
              fontFamily: 'PlusJakartaSans-Regular',
            }}>
            Monthly Mortgage:{commaSeparators(parseInt(mort))} TZS
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Mortgage;

const styles = StyleSheet.create({
  super: {
    flex: 1,
    backgroundColor: lighterBlue,
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lighterBlue,
    flex: 1,
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(20),
  },
  input: {
    fontSize: moderateScale(14),
    height: 'auto',
    width: scale(270),
    borderRadius: 6,
    backgroundColor: white,
    color: primary,
    paddingLeft: 10,
  },
  content: {
    width: '100%',
    height: 'auto',
    backgroundColor: white,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sections: {
    height: 'auto',
    width: '90%',
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  chat: {
    width: '80%',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
});
