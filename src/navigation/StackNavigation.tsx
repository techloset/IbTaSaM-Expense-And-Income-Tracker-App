import DetailTransactionExpenseScreen from '../screens/DetailTransactionExpenseScreen';
import ExpenseScreen from '../screens/ExpenseScreen';
import FinancialExpenseScreen from '../screens/FinancialExpenseScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SCREENS from './Screens';
import TabNavigator from './TabNavigator';

const StackNavigation = [
  {
    screenName: SCREENS.LOGIN,
    component: LoginScreen,
  },
  {
    screenName: SCREENS.SIGN_UP,
    component: SignUpScreen,
  },
  {
    screenName: SCREENS.FORGOT_PASSWORD,
    component: ForgotPasswordScreen,
  },
  {
    screenName: SCREENS.UPDATE_PROFILE,
    component: UpdateProfileScreen,
  },
  {
    screenName: SCREENS.RESET_PASSWORD,
    component: ResetPasswordScreen,
  },
  {
    screenName: SCREENS.FINANCIAL_EXPENSE,
    component: FinancialExpenseScreen,
  },
  {
    screenName: SCREENS.DETAIL_TRANSACTION_EXPENSE,
    component: DetailTransactionExpenseScreen,
  },
  {
    screenName: SCREENS.EXPENSE,
    component: ExpenseScreen,
  },
  {
    screenName: SCREENS.TAB_NAVIGATOR,
    component: TabNavigator,
  },
];
export default StackNavigation;
