import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import DrawerNavigator from './DrawerNavigator';
import MartinAngelBot from '../screens/BotScreen/MartinAngelBot';
import FibonacciBot from '../screens/BotScreen/FibonacciBot';
import LabouchereBot from '../screens/BotScreen/LabouchereBot';
import ManualScreen from '../screens/ManualScreen';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: LoginScreen,
  Src: DrawerNavigator,
  Manual: ManualScreen,
  MartinAngelBot: MartinAngelBot,
  FibonacciBot: FibonacciBot,
  LabouchereBot: LabouchereBot
}));