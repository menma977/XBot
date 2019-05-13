import React from 'react';
import User from '../model/User';
import Doge from '../model/Doge';
export default class UserController extends React.Component {
    async Login(setUsername, setPassword) {
        let bodyXBot;
        bodyXBot = "a=LoginSession" +
            "&key=cb48f0ffc3614a5884517d6425506a6b" +
            "&username=" + setUsername +
            "&password=" + setPassword;
        return await fetch("https://xchangeprofit.com/api/index.php", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: bodyXBot
        }).then((responseXBot) => responseXBot.json()).then(async (responseJsonXBot) => {
            if (responseJsonXBot.Status == 0) {
                User.prototype.setUsername(setUsername);
                User.prototype.setPassword(setPassword);
                Doge.prototype.setUsername(responseJsonXBot.userdoge);
                Doge.prototype.setPassword(responseJsonXBot.passdoge);
            }
            return responseJsonXBot;
        }).catch((error) => {
            return { Pesan: error, Status: 1 };
        });
    }

    async LoginDoge(username, password) {
        let bodyDoge;
        bodyDoge = "a=Login" +
            "&Key=56f1816842b340a6bc07246801552702" +
            "&Username=" + username +
            "&Password=" + password +
            "&Totp=''";
        return await fetch("https://www.999doge.com/api/web.aspx", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: bodyDoge
        }).then((responseDoge) => responseDoge.json()).then((responseJsonDoge) => {
            Doge.prototype.setSession(responseJsonDoge.SessionCookie);
            Doge.prototype.setBalance(String(responseJsonDoge.Doge.Balance));
        }).catch((error) => {

        });
    }
}