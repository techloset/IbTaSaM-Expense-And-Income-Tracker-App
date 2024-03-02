import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
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
import Modal from 'react-native-modal';
import AddInput from '../(components)/AddInput';
import DownIcon from '../assets/icons/down.svg';

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
  const userEmail: string = auth().currentUser?.email || '';

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

  const [isModalFirst, setModalFirst] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateCategory, setUpdateCategory] = useState<string>('');
  const [updateDescription, setUpdateDescription] = useState<string>('');
  const [updateMoney, setUpdateMoney] = useState<string>('');

  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const dateString = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const updateTransaction = async () => {
    // console.log('DE');

    if (!updateCategory) {
      showToast('Enter Category');
      return;
    }

    if (!updateDescription) {
      showToast('Enter Description');
      return;
    }

    if (!updateMoney) {
      showToast('Enter Money');
      return;
    }

    try {
      db.collection('Users')
        .doc(userEmail)
        .collection('UsersTransation')
        .doc(item.id)
        .update({
          category: updateCategory,
          description: updateDescription,
          money: updateMoney,
          updateTime: timeString,
          updateDate: dateString,
        });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const updateSuccess = () => {
    setTimeout(() => {
      navigation.navigate(SCREENS.DETAIL_TRANSACTION_EXPENSE);
    }, 2000);
  };

  const [touch, setTouch] = useState<boolean>(false);
  return (
    <>
      <Modal
        backdropOpacity={0}
        style={touch ? styles.model1_1 : styles.model1}
        isVisible={isModalFirst}>
        <TouchableOpacity
          style={styles.closeLine}
          onPress={() => {
            setModalFirst(false);
          }}></TouchableOpacity>
        <View style={styles.Box1Inputs}>
          <Text>Add Category</Text>
          <AddInput
            onPressInData={() => {
              setTouch(true);
            }}
            handleBlur={() => {
              setTouch(false);
            }}
            placeholder={item.category}
            changeText={setUpdateCategory}
          />
          <Text>Add Description</Text>
          <AddInput
            onPressInData={() => {
              setTouch(true);
            }}
            handleBlur={() => {
              setTouch(false);
            }}
            changeText={setUpdateDescription}
            placeholder={item.description}
          />
          <Text>Add Money</Text>
          <TextInput
            style={[styles.price]}
            onChangeText={text => setUpdateMoney(text)}
            keyboardType="numeric"
            onFocus={() => {
              setTouch(true);
            }}
            onBlur={() => {
              setTouch(false);
            }}
            placeholder={item.money}
          />
        </View>
        <BtnLarge handleFunc={updateSuccess} text={'Update Transaction'} />
      </Modal>

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
            <BtnLarge
              text={'Edit'}
              handleFunc={() => {
                setModalFirst(true);
              }}
            />
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
  model1: {
    backgroundColor: COLOR.white,
    borderTopEndRadius: widthPixel(24),
    borderTopStartRadius: widthPixel(24),
    width: '100%',
    height: heightPixel(191),
    marginTop: pixelSizeHorizontal(420),
    marginBottom: pixelSizeHorizontal(1),
    marginLeft: pixelSizeVertical(1),
    padding: pixelSizeHorizontal(16),
    display: 'flex',
    justifyContent: 'flex-start',
  },
  model1_1: {
    backgroundColor: COLOR.white,
    borderTopEndRadius: widthPixel(24),
    borderTopStartRadius: widthPixel(24),
    width: '100%',
    height: heightPixel(191),
    marginTop: pixelSizeHorizontal(180),
    marginBottom: pixelSizeHorizontal(1),
    marginLeft: pixelSizeVertical(1),
    padding: pixelSizeHorizontal(16),
    display: 'flex',
    justifyContent: 'flex-start',
  },
  price: {
    height: heightPixel(56),
    width: widthPixel(343),
    borderWidth: fontPixel(1),
    borderColor: COLOR.baseLight,
    borderRadius: widthPixel(16),
    fontSize: fontPixel(18),
    alignSelf: 'center',
    paddingStart: pixelSizeVertical(16),
    color: COLOR.black,
  },
  categoriesTextContainer: {
    height: heightPixel(56),
    width: widthPixel(343),
    borderWidth: fontPixel(1),
    borderColor: COLOR.baseLight,
    borderRadius: widthPixel(16),
    alignSelf: 'center',
    paddingStart: pixelSizeVertical(16),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: pixelSizeHorizontal(10),
  },
  categoryText: {
    fontSize: fontPixel(16),
  },
  Box1Inputs: {
    gap: 5,
    marginTop: pixelSizeVertical(30),
    marginBottom: pixelSizeVertical(15),
  },
  closeLine: {
    borderWidth: widthPixel(4),
    width: widthPixel(36),
    borderColor: COLOR.baseLight,
    borderRadius: widthPixel(50),
    alignSelf: 'center',
  },
});
