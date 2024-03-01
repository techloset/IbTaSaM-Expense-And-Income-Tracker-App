import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import BtnLarge from '../../(components)/BtnLarge';
import SCREENS from '../../navigation/Screens';
import CommonHeader from '../../(components)/CommonHeader';
import AddInput from '../../(components)/AddInput';
import ratio from '../../style/ratio';
import PasswordInput from '../../(components)/PasswordInput';
import {COLOR} from '../../style/GlobalStyles';
import GoogleLink from '../../(components)/GoogleLink';
import auth from '@react-native-firebase/auth';
const {pixelSizeVertical, pixelSizeHorizontal, fontPixel} = ratio;

const LoginScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const HandleLogIn = () => {
    if (!email || !password) {
      showToast('Please fill all fields');
      return;
    }

    setLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate(SCREENS.TAB_NAVIGATOR);
        showToast('User Loged In');
        setLoading(false);
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        console.log(error);
        showToast('Network Error');
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
      <CommonHeader title={'Login'} />
      <View style={styles.inputFields}>
        <AddInput value={email} changeText={setEmail} placeholder={'Email'} />
        <PasswordInput value={password} changeText={setPassword} />
      </View>
      <BtnLarge
        text={
          loading ? (
            <ActivityIndicator size="small" color={COLOR.white} />
          ) : (
            'Login'
          )
        }
        handleFunc={() => HandleLogIn()}
      />
      <Text
        style={styles.forgot}
        onPress={() => navigation.navigate(SCREENS.FORGOT_PASSWORD)}>
        Forgot Password?
      </Text>
      <Text style={styles.orText}>or</Text>
      <GoogleLink />
      <View style={styles.noAccText}>
        <Text style={styles.accText}>Don’t have an account yet?</Text>
        <Text
          style={styles.signText}
          onPress={() => navigation.navigate(SCREENS.SIGN_UP)}>
          Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: pixelSizeHorizontal(16),
  },
  inputFields: {
    marginTop: pixelSizeVertical(90),
    marginBottom: pixelSizeVertical(45),
    gap: 23,
  },
  forgot: {
    fontSize: fontPixel(18),
    fontWeight: '600',
    color: COLOR.violet,
    alignSelf: 'flex-end',
    marginTop: pixelSizeVertical(10),
  },
  orText: {
    fontSize: fontPixel(14),
    fontWeight: '700',
    color: COLOR.baseLight,
    alignSelf: 'center',
    marginVertical: pixelSizeVertical(15),
  },
  noAccText: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: pixelSizeVertical(19),
    gap: 5,
  },
  accText: {
    fontSize: fontPixel(16),
    color: COLOR.baseLight,
    fontWeight: '500',
  },
  signText: {
    fontSize: fontPixel(16),
    color: COLOR.violet,
    fontWeight: '500',
  },
});
