import React from 'react';
import { AsyncStorage } from 'react-native';
export default class User extends React.Component {
    async getUsername() {
        return await AsyncStorage.getItem('username').then(response => { return response });;
    }

    setUsername(value) {
        AsyncStorage.setItem('username', value);
    }

    async getPassword() {
        return await AsyncStorage.getItem('password').then(response => { return response });
    }

    setPassword(value) {
        AsyncStorage.setItem('password', value);
    }
}