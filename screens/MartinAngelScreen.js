import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
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
    Item,
    Input,
    Button,
    Label,
    Picker,
} from 'native-base';
import { Icon, AdMobBanner } from 'expo';
import Header from '../constants/Header';
import Doge from '../components/model/Doge';
import User from '../components/model/User';
import MartinAngel from '../components/model/MartinAngel';
import Config from '../components/Config';

export default class MartinAngelScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isBotLodging: false,
            balance: 0,
            username: '',
            lot: 0.1,
            probability: 50,
            multiPlay: 2,
            stopLose: 1000,
            target: 1,
        }
    }

    async componentDidMount() {
        let getUsername = await User.prototype.getUsername();
        let getBalance = await Doge.prototype.getBalance();
        this.setState({ balance: getBalance, username: getUsername })
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 1000);
    }

    goToBot() {
        this.setState({ isLoading: true });
        if (this.state.lot < -1 || !this.state.lot) {
            Config.prototype.newAlert(2, 'lot should not be less than 0', 50000, 'bottom');
            this.setState({ isLoading: false });
        } else if (this.state.probability <= -1 && this.state.probability >= 100 || !this.state.probability) {
            Config.prototype.newAlert(2, 'Probability should not be less than 0 and should not be more than 100', 50000, 'bottom');
            this.setState({ isLoading: false });
        } else if (this.state.multiPlay <= -1 || !this.state.multiPlay) {
            Config.prototype.newAlert(2, 'MultiPlay should not be less than 0', 50000, 'bottom');
            this.setState({ isLoading: false });
        } else if (this.state.stopLose <= -1 || !this.state.stopLose) {
            Config.prototype.newAlert(2, 'Stoploss should not be less than 0', 50000, 'bottom');
            this.setState({ isLoading: false });
        } else {
            MartinAngel.prototype.setLot(this.state.lot);
            MartinAngel.prototype.setProbability(this.state.probability);
            MartinAngel.prototype.setMultiPlay(this.state.multiPlay);
            MartinAngel.prototype.setStopLose(this.state.stopLose);
            MartinAngel.prototype.setTarget(this.state.target);
            setTimeout(() => {
                this.props.navigation.navigate('MartinAngelBot');
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
                <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
                    <Container style={{ flex: 1, justifyContent: 'center', backgroundColor: '#000' }}>
                        <Header {...this.props} Title='Martin Angel' />
                        <Content>
                            <Row>
                                <Col>
                                    <Card>
                                        <CardItem>
                                            <Body style={{ alignItems: 'center' }}>
                                                <Label>Username</Label>
                                                <Item>
                                                    <Text style={{ fontSize: 12 }}>{this.state.username}</Text>
                                                </Item>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <CardItem>
                                            <Body style={{ alignItems: 'center' }}>
                                                <Label>Balance</Label>
                                                <Item>
                                                    <Text style={{ fontSize: 12 }}>{this.state.balance * 0.00000001}</Text>
                                                </Item>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </Col>
                            </Row>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <Row>
                                            <Col>
                                                <Label>Lot</Label>
                                                <Item>
                                                    <Input placeholder='Lot' defaultValue={String(this.state.lot)}
                                                        onChangeText={(value) => { this.setState({ lot: value }) }} keyboardType='numeric' />
                                                </Item>
                                            </Col>
                                            <Col>
                                                <Label>Probability(%)</Label>
                                                <Item>
                                                    <Input placeholder='Probability' defaultValue={String(this.state.probability)}
                                                        onChangeText={(value) => { this.setState({ probability: value }) }} keyboardType='numeric' />
                                                </Item>
                                            </Col>
                                        </Row>
                                        <Text>{'\n'}</Text>
                                        <Row>
                                            <Col>
                                                <Label>MultiPly</Label>
                                                <Item>
                                                    <Input placeholder='multiPlay' defaultValue={String(this.state.multiPlay)}
                                                        onChangeText={(value) => { this.setState({ multiPlay: value }) }} keyboardType='numeric' />
                                                </Item>
                                            </Col>
                                            <Col>
                                                <Label>Stoploss</Label>
                                                <Item>
                                                    <Input placeholder='Stoploss' defaultValue={String(this.state.stopLose)}
                                                        onChangeText={(value) => { this.setState({ stopLose: value }) }} keyboardType='numeric' />
                                                </Item>
                                            </Col>
                                        </Row>
                                        <Text>{'\n'}</Text>
                                        <Button danger block>
                                            <Picker mode="dropdown" iosHeader="Target" style={{ color: '#fff' }}
                                                selectedValue={this.state.target} onValueChange={(value) => { this.setState({ target: value }) }}
                                                iosIcon={<Icon.Ionicons name="md-arrow-dropdown-circle" style={{ color: '#fff', fontSize: 25 }} />}>
                                                <Picker.Item label="Target 1%" value="1" />
                                                <Picker.Item label="Target 2%" value="2" />
                                                <Picker.Item label="Target 3%" value="3" />
                                            </Picker>
                                        </Button>
                                        <Text>{'\n'}</Text>
                                        <Button success block onPress={this.goToBot.bind(this)}>
                                            <Text>Start</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Content>
                        <AdMobBanner
                            bannerSize="fullBanner"
                            adUnitID="ca-app-pub-5099621259316805/6696721743" // Test ID, Replace with your-admob-unit-id
                            testDeviceID="EMULATOR"
                            onDidFailToReceiveAdWithError={this.bannerError} />
                    </Container>
                </KeyboardAvoidingView>
            );
        }
    }
}