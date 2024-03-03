import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import BtnLarge from '../../(components)/BtnLarge';
import SCREENS from '../../navigation/Screens';
import CommonHeader from '../../(components)/CommonHeader';
import AddInput from '../../(components)/AddInput';
import ratio from '../../style/ratio';
import PasswordInput from '../../(components)/PasswordInput';
import {COLOR} from '../../style/GlobalStyles';
import GoogleLink from '../../(components)/GoogleLink';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const {
  widthPixel,
  heightPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  fontPixel,
} = ratio;

const SignUpScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const HandleSignUp = () => {
    if (!name || !email || !password) {
      return showToast('Please fill all fields');
    }
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        showToast('SignUp Successfully');
        firestore()
          .collection('Users')
          .doc(email)
          .collection('Login')
          .add({
            name: name,
            email: email,
          })
          .then(() => {
            showToast('User added!');
          });
        navigation.navigate(SCREENS.LOGIN);
        setLoading(false);
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
          setLoading(false);
          return;
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setLoading(false);
          return;
        }

        console.error(error);
        setLoading(false);
      });
  };

  const [showView, setShowView] = useState<boolean>(false);
  const handleSlideIconPress = () => {
    setShowView(!showView);
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '410122792339-986og3kdl5im005jcjr1o4a9rnls27b4.apps.googleusercontent.com',
    });
  }, []);
  const signInWithGoogle = () => {
    console.log('noew');

    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const usrInfo = await GoogleSignin.signIn();
    //   setUserInfo({usrInfo});
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (e.g. sign in) is in progress already
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //   } else {
    //     // some other error happened
    //   }
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
      <CommonHeader title={'Sign Up'} />
      <View style={styles.inputFields}>
        <AddInput value={name} changeText={setName} placeholder={'Name'} />
        <AddInput value={email} changeText={setEmail} placeholder={'Email'} />
        <PasswordInput value={password} changeText={setPassword} />
      </View>
      <View style={styles.checkBoxContainer}>
        {!showView ? (
          <View style={styles.checkBox}></View>
        ) : (
          <View style={styles.checkBoxFill}></View>
        )}
        <Text
          style={{
            marginLeft: pixelSizeHorizontal(12),
            fontSize: fontPixel(14),
            fontWeight: '500',
            color: COLOR.black,
          }}
          onPress={handleSlideIconPress}>
          By signing up, you agree to the{' '}
          <Text
            style={{
              color: COLOR.violet,
            }}>
            Terms of Service and Privacy Policy
          </Text>
        </Text>
      </View>
      <BtnLarge
        text={
          loading ? (
            <ActivityIndicator size="small" color={COLOR.white} />
          ) : (
            'Sign Up'
          )
        }
        handleFunc={() => HandleSignUp()}
      />
      <Text style={styles.orText}>or</Text>
      <GoogleLink handleFunc={() => signInWithGoogle()} />
      <View style={styles.noAccText}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.TAB_NAVIGATOR)}>
          <Text style={styles.accText}>Already have an account?</Text>
        </TouchableOpacity>
        <Text
          style={styles.signText}
          onPress={() => navigation.navigate(SCREENS.LOGIN)}>
          Login
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: pixelSizeHorizontal(16),
  },
  inputFields: {
    marginTop: pixelSizeVertical(90),
    gap: 23,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: pixelSizeHorizontal(12),
    paddingTop: pixelSizeVertical(20),
    paddingBottom: pixelSizeVertical(35),
  },
  checkBox: {
    width: widthPixel(24),
    height: heightPixel(24),
    borderWidth: widthPixel(2),
    borderColor: COLOR.violet,
    borderRadius: widthPixel(4),
  },
  checkBoxFill: {
    width: widthPixel(24),
    height: heightPixel(24),
    borderWidth: widthPixel(2),
    borderColor: COLOR.violet,
    borderRadius: widthPixel(4),
    backgroundColor: COLOR.violet,
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
