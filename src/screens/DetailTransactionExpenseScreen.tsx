import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  ToastAndroid,
} from 'react-native';
import {ImageSourcePropType} from 'react-native';
const attachmentImg: ImageSourcePropType = require('../assets/imgs/attachment.png');
import ratio from '../style/ratio';
import {COLOR} from '../style/GlobalStyles';
import ExpenseCommonHeader from '../(components)/ExpenseCommonHeader';
import BtnLarge from '../(components)/BtnLarge';
import TransactionModel from '../(components)/TransactionModel';
import SuccessfullModel from '../(components)/SuccessfullModel';
import {db} from '../config/firebase';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import SCREENS from '../navigation/Screens';

const {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
} = ratio;

interface DetailTransactionExpenseProps {
  route: {
    params: {
      item: {
        money: string;
        bank: string;
        category: string;
        date: string;
        description: string;
        time: string;
        transactionType: string;
        id: string;
      };
    };
  };
}

const DetailTransactionExpenseScreen: React.FC<
  DetailTransactionExpenseProps
> = ({route}) => {
  const navigation = useNavigation();
  const {item} = route.params;

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isModalSuccess, setModalSuccess] = useState<boolean>(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalSuccess = () => {
    setModalVisible(false);
    setModalSuccess(!isModalSuccess);
    setTimeout(() => {
      navigation.navigate(SCREENS.TRANSACTION);
    }, 2000);
  };

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const deleteTransaction = async () => {
    const userEmail: string = auth().currentUser?.email || '';
    try {
      db.collection('Users')
        .doc(userEmail)
        .collection('UsersTransation')
        .doc(item.id)
        .delete()
        .then(() => {
          console.log('User deleted!');
        });

      showToast('Transaction delete Successfully');
      toggleModalSuccess();
    } catch (error) {
      console.error(error);
      showToast('Error');
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
        <View
          style={[
            styles.mainHeader,
            item.transactionType == 'Income'
              ? {backgroundColor: COLOR.green}
              : {backgroundColor: COLOR.red},
          ]}>
          <ExpenseCommonHeader
            title={'Detail Transaction'}
            handleFun={toggleModal}
          />
          <Text style={styles.payment}>{item.money}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.dateTime}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.time}>{item.description}</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.boxContent}>
              <Text style={styles.type}>Type</Text>
              <Text style={styles.typeDescription}>{item.transactionType}</Text>
            </View>
            <View style={styles.boxContent}>
              <Text style={styles.type}>Category</Text>
              <Text style={styles.typeDescription}>{item.category}</Text>
            </View>
            <View style={styles.boxContent}>
              <Text style={styles.type}>Wallet</Text>
              <Text style={styles.typeDescription}>Wallet</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.comText}>Description</Text>
          <Text style={styles.detailDescription}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </Text>
          <Text style={styles.comText}>Attachment</Text>
          <Image source={attachmentImg} />
          <View style={styles.editBtn}>
            <BtnLarge text={'Edit'} />
          </View>
        </View>
      </SafeAreaView>
      <TransactionModel
        isVisible={isModalVisible}
        modelCancel={toggleModal}
        modelSuccess={deleteTransaction}
        text={'Remove this transaction?'}
        description={'Are you sure do you wanna remove this transaction?'}
      />
      <SuccessfullModel
        isVisible={isModalSuccess}
        description={'Transaction has been successfully removed'}
      />
    </>
  );
};

export default DetailTransactionExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  mainHeader: {
    paddingHorizontal: pixelSizeHorizontal(16),
    height: pixelSizeVertical(282),
    borderBottomLeftRadius: widthPixel(16),
    borderBottomRightRadius: widthPixel(16),
  },
  mainHeaderRed: {
    backgroundColor: COLOR.red,
  },
  mainHeaderGreen: {
    backgroundColor: COLOR.green,
  },
  payment: {
    fontSize: fontPixel(48),
    fontWeight: '700',
    color: COLOR.white,
    alignSelf: 'center',
    marginTop: pixelSizeVertical(30),
  },
  description: {
    fontSize: fontPixel(16),
    fontWeight: '500',
    color: COLOR.white,
    alignSelf: 'center',
    marginTop: pixelSizeVertical(15),
  },
  dateTime: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginTop: pixelSizeVertical(8),
    marginBottom: pixelSizeVertical(18),
  },
  date: {
    fontSize: fontPixel(13),
    fontWeight: '500',
    color: COLOR.white,
  },
  time: {
    fontSize: fontPixel(13),
    fontWeight: '500',
    color: COLOR.white,
  },
  box: {
    width: widthPixel(343),
    height: heightPixel(70),
    backgroundColor: COLOR.white,
    borderWidth: widthPixel(1),
    borderRadius: widthPixel(12),
    borderColor: COLOR.baseLight,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  boxContent: {
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  type: {
    fontSize: fontPixel(14),
    fontWeight: '500',
    color: COLOR.baseLight,
  },
  typeDescription: {
    fontSize: fontPixel(16),
    fontWeight: '600',
    color: COLOR.black,
  },
  bottomContainer: {
    marginTop: pixelSizeVertical(40),
    paddingHorizontal: pixelSizeHorizontal(16),
    gap: 15,
  },
  comText: {
    fontSize: fontPixel(16),
    fontWeight: '600',
    color: COLOR.baseLight,
  },
  detailDescription: {
    fontSize: fontPixel(16),
    fontWeight: '500',
    color: COLOR.black,
    lineHeight: 19,
  },
  editBtn: {
    marginTop: pixelSizeVertical(115),
  },
});
