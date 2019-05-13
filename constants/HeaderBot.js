import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Title } from 'native-base';
import { StatusBar, View } from 'react-native';
import { Icon } from 'expo';

export default class HeaderBotScreen extends Component {
    render() {
        return (
            <View style={{ marginTop: 25 }}>
                <StatusBar barStyle='default' />
                <Header style={{ backgroundColor: '#D6110B' }} >
                    <Body style={{ alignItems: 'flex-end' }}>
                        <Title style={{ color: '#fff' }}>{this.props.Title}</Title>
                    </Body>
                </Header>
            </View>
        );
    }
}
