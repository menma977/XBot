import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Title } from 'native-base';
import { AsyncStorage } from 'react-native';
import { StatusBar, View } from 'react-native';
import { Icon } from 'expo';

export default class HeaderScreen extends Component {
    async onLogout() {
        await AsyncStorage.clear();
        await this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={{ marginTop: 25 }}>
                <StatusBar barStyle='default' />
                <Header style={{ backgroundColor: '#D6110B' }} >
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.toggleDrawer() }}>
                            <Icon.Foundation name='list' size={25} style={{ color: '#fff' }} />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: 'flex-end' }}>
                        <Title style={{ color: '#fff' }}>{this.props.Title}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.onLogout.bind(this)}>
                            <Icon.AntDesign name='logout' size={25} style={{ color: '#fff' }} />
                        </Button>
                    </Right>
                </Header>
            </View>
        );
    }
}
