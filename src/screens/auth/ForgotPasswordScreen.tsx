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
import CommonHeader from '../../(components)/CommonHeader';
import AddInput from '../../(components)/AddInput';
import ratio from '../../style/ratio';
import {COLOR} from '../../style/GlobalStyles';
import auth from '@react-native-firebase/auth';
const {pixelSizeVertical, pixelSizeHorizontal, fontPixel} = ratio;

const ForgotPasswordScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const [email, setEmail] = useState('');
  const forgotPassword = async () => {
    setLoading(true);
    try {
      if (!email) {
        showToast('Please enter your email address');
        return;
      }
      await auth().sendPasswordResetEmail(email);
      showToast('Password reset email sent!');
      navigation.goBack();
    } catch (error: any) {
      let errorMessage =
        'An error occurred while sending the password reset email. Please try again.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'That email address is not registered!';
      }
      console.log(errorMessage);
      console.log(error);
      showToast('Something wrong');
    }
    setLoading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
      <CommonHeader title={'Forgot Password'} />
      <View style={styles.forgotTextContainer}>
        <Text style={styles.forgotText}>Don’t worry.</Text>
        <Text style={styles.forgotText}>
          Enter your email and we’ll send you a link to reset your password.
        </Text>
      </View>
      <View style={styles.forgotBottom}>
        <AddInput changeText={setEmail} placeholder={'ibtasma116@gmail.com'} />
        <BtnLarge
          text={
            loading ? (
              <ActivityIndicator size="small" color={COLOR.white} />
            ) : (
              'Send Email'
            )
          }
          handleFunc={forgotPassword}
        />
      </View>
    </SafeAreaView>
  );
};
export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingHorizontal: pixelSizeHorizontal(16),
  },
  forgotTextContainer: {
    marginTop: pixelSizeVertical(90),
    marginBottom: pixelSizeVertical(53),
  },
  forgotText: {
    fontSize: fontPixel(25),
    color: COLOR.black,
    fontWeight: '700',
  },
  forgotBottom: {
    gap: 35,
  },
});
