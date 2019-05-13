import React from 'react';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
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
    Left,
    Label,
    Right,
    Title,
    Header
} from 'native-base';
import { LineChart, YAxis, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Icon } from 'expo';
import Doge from '../components/model/Doge';
import Config from '../components/Config';

export default class ManualScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isBotLodging: false,
            balance: 0,
            defaultLot: 0.1,
            lot: 0.1,
            probability: 50,
            charts: [],
            payIn: [],
            payOut: [],
            profit: [],
            //neuron
            input: [],
            wight: [],
            feed: [],
            output: [],
            thinking: 0,
        }
    }

    async minerva() {
        let localLot, localProbability, localProfit, localLotVector, localProfitVector, localProbabilityVector, localOutPut;
        const chartLang = (this.state.charts.length - 1) < 0 ? 0 : (this.state.charts.length - 1);
        localLot = this.state.lot;
        localProfit = chartLang <= 0 ? this.state.charts[0] : this.state.charts[chartLang];
        localProbability = this.state.probability;
        this.state.input.push({
            lot: localLot,
            profit: localProfit,
            probability: localProbability
        });
        localLotVector = (Math.random() * (1 - (-1))) + (-1);
        localProfitVector = (Math.random() * (1 - (-1))) + (-1);
        localProbabilityVector = (Math.random() * (1 - (-1))) + (-1);
        this.state.wight.push({
            lot: localLotVector,
            profit: localProfitVector,
            probability: localProbabilityVector
        });
        localOutPut = ((this.state.wight[chartLang].lot * this.state.input[chartLang].lot) +
            (this.state.wight[chartLang].profit * this.state.input[chartLang].profit) +
            (this.state.wight[chartLang].probability * this.state.input[chartLang].probability)) / 10;
        this.state.output.push(localOutPut);
        this.setState({
            thinking: this.state.output.reduce(this.sum)
        })
    }

    sum(count, num) {
        return count + num;
    }

    async onBot() {
        this.setState({ isBotLodging: true });
        var session, seed, basePlayIn, high, bodyUrl;
        session = await Doge.prototype.getSession();
        seed = Math.floor(Math.random() * (+99999 - +0)) + +0;
        basePlayIn = (this.state.lot / 0.00000001).toFixed(0);
        high = this.state.probability * 10000;
        bodyUrl = (
            "a=PlaceBet" +
            "&s=" + session +
            "&Low=0" +
            "&High=" + high +
            "&PayIn=" + basePlayIn +
            "&ProtocolVersion=2" +
            "&ClientSeed=" + seed +
            "&Currency=doge"
        )
        await fetch("https://www.999doge.com/api/web.aspx", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: bodyUrl
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                Config.prototype.newAlert(3, 'Connection interrupted', 50000, 'bottom');
            }
        }).then(async (responseJson) => {
            if (!responseJson.error) {
                const localPayIn = -basePlayIn;
                const localPayOut = responseJson.PayOut;
                const localProfit = localPayOut + localPayIn;
                const chartLang = this.state.charts.length - 1;
                const sumLastChart = chartLang < 0 ? localProfit : (this.state.charts[chartLang] / 0.00000001) + localProfit;
                if (this.state.charts.length == 50) {
                    this.state.charts.shift();
                    this.state.payIn.pop();
                    this.state.payOut.pop();
                    this.state.profit.pop();
                    await this.state.charts.push(sumLastChart * 0.00000001);
                    await this.state.payIn.unshift(localPayIn * 0.00000001);
                    await this.state.payOut.unshift(localPayOut * 0.00000001);
                    await this.state.profit.unshift(localProfit * 0.00000001);
                } else {
                    await this.state.charts.push(sumLastChart * 0.00000001);
                    await this.state.payIn.unshift(localPayIn * 0.00000001);
                    await this.state.payOut.unshift(localPayOut * 0.00000001);
                    await this.state.profit.unshift(localProfit * 0.00000001);
                }
                await this.setState({
                    balance: parseFloat(this.state.balance + localProfit),
                });
                await Doge.prototype.setBalance(String(this.state.balance));
            } else {
                Config.prototype.newAlert(3, responseJson.error, 50000, 'bottom');
            }
        }).catch((error) => {
            Config.prototype.newAlert(3, error, 50000, 'bottom');
        });
        // await this.minerva();
        this.setState({ isBotLodging: false });
    }

    async componentDidMount() {
        let balance = await Doge.prototype.getBalance();
        await this.setState({ balance: balance, })
        await this.setState({ isLoading: false });
    }

    render() {
        let data = this.state.charts;
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
                        <StatusBar barStyle='default' />
                        <Header style={{ backgroundColor: '#D6110B', marginTop: 25 }} >
                            <Left>
                                <Button transparent onPress={() => { this.props.navigation.navigate('Home') }}>
                                    <Icon.AntDesign name='caretleft' size={25} style={{ color: '#fff' }} />
                                </Button>
                            </Left>
                            <Body style={{ alignItems: 'flex-end' }}>
                                <Title style={{ color: '#fff' }}>Manual</Title>
                            </Body>
                            <Right></Right>
                        </Header>
                        <Content>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <Left><Text>Balance</Text></Left>
                                        <Right><Text>{this.state.balance * 0.00000001}</Text></Right>
                                        <Row>
                                            <YAxis
                                                data={data}
                                                contentInset={{ top: 30, bottom: 30 }}
                                                svg={{ fill: '#000', fontSize: 10, }}
                                                numberOfTicks={10}
                                                formatLabel={value => `${value}`}
                                            />
                                            <Col>
                                                <LineChart style={{ minHeight: 200, flex: 1 }} data={data} svg={{ stroke: '#f10000' }}
                                                    contentInset={{ top: 30, bottom: 30 }} curve={shape.curveLinear}>
                                                    <Grid svg={{ stroke: '#000' }} />
                                                </LineChart>
                                            </Col>
                                        </Row>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card>
                                <CardItem>
                                    <Body>
                                        {/* <Label>percentage Win: {this.state.thinking.toFixed(2)}%</Label> */}
                                        <Row>
                                            <Col>
                                                <Label>Lot</Label>
                                                <Item>
                                                    <Input placeholder='Lot' defaultValue={String(this.state.lot)}
                                                        onChangeText={(value) => { this.setState({ defaultLot: value, lot: value }) }} />
                                                </Item>
                                            </Col>
                                            <Col>
                                                <Label>Probability(%)</Label>
                                                <Item>
                                                    <Input placeholder='Probability' defaultValue={String(this.state.probability)}
                                                        onChangeText={(value) => { this.setState({ probability: value }) }} />
                                                </Item>
                                            </Col>
                                        </Row>
                                        <Text>{'\n'}</Text>
                                        <Row>
                                            <Col>
                                                <Button danger block onPress={() => {
                                                    this.setState({
                                                        lot: this.state.lot * 2
                                                    })
                                                }}>
                                                    <Text>Double</Text>
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button warning block onPress={() => {
                                                    this.setState({
                                                        lot: this.state.lot / 2
                                                    })
                                                }}>
                                                    <Text>Half</Text>
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button primary block onPress={() => {
                                                    this.setState({
                                                        lot: this.state.defaultLot
                                                    })
                                                }}>
                                                    <Text>Reset</Text>
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Text>{'\n'}</Text>
                                        <Button success block onPress={this.onBot.bind(this)} disabled={this.state.isBotLodging}>
                                            <Text>Trade</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <Row>
                                            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Label>PayIn</Label>
                                                {this.state.payIn.map((value, key) => {
                                                    return (<Text key={key} >{value}</Text>);
                                                })}
                                            </Col>
                                            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Label>PayOut</Label>
                                                {this.state.payOut.map((value, key) => {
                                                    return (<Text key={key} >{value}</Text>);
                                                })}
                                            </Col>
                                            <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Label>Profit</Label>
                                                {this.state.profit.map((value, key) => {
                                                    return (<Text key={key} >{value}</Text>);
                                                })}
                                            </Col>
                                        </Row>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Content>
                    </Container>
                </KeyboardAvoidingView>
            );
        }
    }
}