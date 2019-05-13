import React from 'react';
import {
    Container,
    Content,
    Text,
    Spinner,
    Col,
    Item,
    Input,
    Button,
    Form,
} from 'native-base';
import { ImageBackground, Image, KeyboardAvoidingView } from 'react-native';
import UserController from '../components/controller/UserController';
import Config from '../components/Config';
import Doge from '../components/model/Doge';
let imageHeaderBackground = require('../assets/images/slide1.jpg');
let bitCoin = require('../assets/images/android2.png');
let Banner = require('../assets/images/android1.png');

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            loopEarth: 0,
            username: '',//XCHANGEPROFIT
            password: '',//462066
        }
    }

    async componentDidMount() {
        let session = await Doge.prototype.getSession();
        if (session) {
            setTimeout(() => {
                this.props.navigation.navigate('Home');
            }, 1000);
        } else {
            setTimeout(() => {
                this.setState({ isLoading: false });
            }, 2000);
            setInterval(() => {
                if (!this.state.isLoading) {
                    if (this.state.loopEarth == 360) {
                        this.setState({
                            loopEarth: 1
                        })
                    } else {
                        this.setState({
                            loopEarth: this.state.loopEarth + 1
                        })
                    }
                }
            }, 90);
        }
    }

    async onLogin() {
        this.setState({ isLoading: true });
        let dataLogin = await new UserController.prototype.Login(this.state.username, this.state.password);
        if (dataLogin.Status == 1) {
            Config.prototype.newAlert(3, dataLogin.Pesan, 10000, 'bottom');
            this.setState({ isLoading: false });
        } else {
            await new UserController.prototype.LoginDoge(await Doge.prototype.getUsername(), await Doge.prototype.getPassword());
            setTimeout(() => {
                this.props.navigation.navigate('Home');
            }, 1000);
        }
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
                    <Content>
                        <ImageBackground style={{ height: 200, paddingTop: 20 }} source={imageHeaderBackground} >
                            <Image style={{ height: 150, width: 150, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', }} source={bitCoin} />
                        </ImageBackground>
                        <KeyboardAvoidingView behavior="padding" enabled>
                            <Image source={Banner} style={{ height: 50, flex: 1, maxWidth: 300, resizeMode: 'contain', alignSelf: 'center' }} />
                            <Col>
                                <Form >
                                    <Item style={{ borderBottomColor: '#D6110B' }}>
                                        <Input style={{ color: '#D6110B', textShadowColor: '#8b0c05' }}
                                            placeholder="Username"
                                            value={this.state.username} onChangeText={(value) => {
                                                this.setState({ username: value })
                                            }} />
                                    </Item>
                                    <Item style={{ borderBottomColor: '#D6110B' }}>
                                        <Input style={{ color: '#D6110B', textShadowColor: '#8b0c05', shadowColor: '#8b0c05' }}
                                            placeholder="Password" secureTextEntry={true}
                                            value={this.state.password} onChangeText={(value) => {
                                                this.setState({ password: value })
                                            }} />
                                    </Item>
                                </Form>
                            </Col>
                            <Text>{'\n'}</Text>
                            <Col>
                                <Button block primary onPress={this.onLogin.bind(this)}><Text> Login </Text></Button>
                            </Col>
                        </KeyboardAvoidingView>
                    </Content>
                </Container >
            );
        }
    }
}