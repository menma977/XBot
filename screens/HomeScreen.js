import React from 'react';
import {
    Container,
    Content,
    Text,
    Card,
    CardItem,
    Body,
    Spinner,
    Col,
    Row,
    Button,
} from 'native-base';
import { AdMobInterstitial } from 'expo';
import { ImageBackground, Image } from 'react-native';
import { Icon } from 'expo';
import Header from '../constants/Header';
import User from '../components/model/User';
import Doge from '../components/model/Doge';
import UserController from '../components/controller/UserController';
let imageHeaderBackground = require('../assets/images/slide1.jpg');
let bitCoin = require('../assets/images/android2.png');

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            username: null,
            balance: null,
        }
    }

    async componentDidMount() {
        await this.setState({ isLoading: true });
        new UserController.prototype.LoginDoge(await Doge.prototype.getUsername(), await Doge.prototype.getPassword());
        let getUsername = await User.prototype.getUsername();
        let getBalance = await Doge.prototype.getBalance();
        await this.setState({
            username: getUsername,
            balance: getBalance
        })
        try {
            AdMobInterstitial.setAdUnitID('ca-app-pub-5099621259316805/4535207239');
            AdMobInterstitial.setTestDeviceID('EMULATOR');
            await AdMobInterstitial.requestAdAsync();
            await AdMobInterstitial.showAdAsync();
        } catch (error) {
            console.log(error);
        }
        await this.setState({ isLoading: false });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <Container style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }}>
                    <Spinner color='red' />
                </Container>
            );
        } else {
            return (
                <Container style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }}>
                    <Header {...this.props} Title='Home' />
                    <Content>
                        <ImageBackground style={{ height: 200, paddingTop: 20 }} source={imageHeaderBackground} >
                            <Image style={{ height: 150, width: 150, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', }} source={bitCoin} />
                        </ImageBackground>
                        <Col>
                            <Card>
                                <CardItem style={{ backgroundColor: '#fff' }}>
                                    <Body style={{ alignItems: 'center' }}>
                                        <Row>
                                            <Icon.MaterialIcons name='person' size={25} style={{ color: '#D6110B' }} />
                                            <Text style={{ color: '#D6110B' }}> {this.state.username}</Text>
                                        </Row>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardItem style={{ backgroundColor: '#fff' }}>
                                    <Body style={{ alignItems: 'center' }}>
                                        <Row>
                                            <Icon.MaterialIcons name='account-balance-wallet' size={25} style={{ color: '#D6110B' }} />
                                            <Text style={{ color: '#D6110B' }}> {this.state.balance * 0.00000001}</Text>
                                        </Row>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Col>
                        <Button danger block onPress={async () => await this.componentDidMount()} style={{ height: 25 }}>
                            <Icon.AntDesign name='retweet' size={25} style={{ color: '#fff' }} />
                            <Text>Synchronize</Text>
                        </Button>
                        <Text>{'\n'}</Text>
                        <Col>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <Text> Xbot is a tool used to produce Doge currencies on the market. Using Xbot must be ready for profit and ready to lose balance. Because Xbot's opponents are free markets throughout the world. Use your money wisely when you choose this feature.</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Col>
                    </Content>
                </Container>
            );
        }
    }
}