import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { createStackNavigator } from 'react-navigation';
import PendingApprovals from "../PendingApprovals/PendingApprovals";
import AllApprovals from "../AllApprovals/AllApprovals";
import HomePage from '../HomePage/HomePage';
import PendingApprovals from "../PendingApprovals/PendingApprovals";
import AllApprovals from "../AllApprovals/AllApprovals";

export const AppNavigator = createStackNavigator({
  Home: HomePage,
  Pending: PendingApprovals,
  All: AllApprovals
});