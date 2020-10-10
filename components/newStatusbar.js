import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import * as c from '../utils/colors';

const MyStatusBar = () => (
	<View style={{ backgroundColor: c.turquoise }}>
		<StatusBar style="auto" /> 
	</View>
);

export default MyStatusBar;