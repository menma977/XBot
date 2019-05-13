import React from 'react'; ''
import { Platform, View, SafeAreaView, ImageBackground, ScrollView, Text, Animated, Image } from 'react-native';
import { createDrawerNavigator, DrawerItems, createSwitchNavigator } from 'react-navigation';
import { Icon } from 'expo';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ManualScreen from '../screens/ManualScreen';
import MartinAngelScreen from '../screens/MartinAngelScreen';
import FibonacciScreen from '../screens/FibonacciScreen';
import LabouchereScreen from '../screens/LabouchereScreen';
import { Button, Row, Col, Label } from 'native-base';

let imageHeaderBackground = require('../assets/images/slide1.jpg');
let bitCoin = require('../assets/images/android2.png');

const CustomDrowerNavigator = (props) => {
    return (
        <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
            <ImageBackground style={{ height: 200, }} source={imageHeaderBackground} >
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20, }}>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#fff' }}>THE MOST </Text>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#D6110B' }}>SUCRE </Text>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#fff' }}>CRYPTO </Text>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#D6110B' }}>CURRENCY </Text>
                </View>
                <Animated.View >
                    <Image style={{ height: 150, width: 150, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }} source={bitCoin} />
                </Animated.View>
            </ImageBackground>
            <ScrollView>
                <DrawerItems {...props} />
                <Button transparent onPress={() => { props.navigation.navigate('Manual') }}>
                    <Row>
                        <Col size={0.8} style={{ alignItems: 'center' }}>
                            <Icon.Octicons name='gear' size={25} style={{ color: '#fff' }} />
                        </Col>
                        <Col size={3} style={{ marginLeft: 20 }}>
                            <Label style={{ color: '#fff' }}>Manual</Label>
                        </Col>
                    </Row>
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
}

export default createDrawerNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => (
                <TabBarIcon name={Platform.OS === 'ios' ? `ios-home` : 'md-home'}
                    size={25} style={{ color: tintColor }} />
            ),
        }
    },
    // Manual: {
    //     screen: ManualScreen,
    //     navigationOptions: {
    //         drawerIcon: ({ tintColor }) => (
    //             <Icon.Octicons name='gear' size={25} style={{ color: tintColor }} />
    //         ),
    //     }
    // },
    MartinAngel: {
        screen: MartinAngelScreen,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => (
                <Icon.AntDesign name='dingding' size={25} style={{ color: tintColor }} />
            ),
        }
    },
    Fibonacci: {
        screen: FibonacciScreen,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => (
                <Icon.AntDesign name='dotchart' size={25} style={{ color: tintColor }} />
            ),
        }
    },
    Labouchere: {
        screen: LabouchereScreen,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => (
                <Icon.AntDesign name='barchart' size={25} style={{ color: tintColor }} />
            ),
        }
    }
}, {
        initialRouteName: 'Home',
        contentComponent: CustomDrowerNavigator,
        contentOptions: {
            activeBackgroundColor: '#D6110B',
            activeTintColor: '#fff',
            inactiveBackgroundColor: '#000000',
            inactiveTintColor: '#fff',
        }
    }
)