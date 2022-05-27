import { StyleSheet, Text, ActivityIndicator, View } from 'react-native';
import React from 'react';

const Loader = ({ color }) => {
  return <ActivityIndicator size="large" color={color} />;
};

export { Loader };
