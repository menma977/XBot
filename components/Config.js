import React from 'react';
import { Toast } from 'native-base';

export default class Config extends React.Component {
    newAlert(setNum, setMassage, setDuration, setPosition) {
        if (setNum == 1) {
            Toast.show({
                text: setMassage,
                buttonText: "x",
                position: setPosition,
                type: "success",
                duration: setDuration
            })
        } else if (setNum == 2) {
            Toast.show({
                text: setMassage,
                buttonText: "x",
                position: setPosition,
                type: "warning",
                duration: setDuration
            })
        } else if (setNum == 3) {
            Toast.show({
                text: setMassage,
                buttonText: "x",
                position: setPosition,
                type: "danger",
                duration: setDuration
            })
        } else {
            Toast.show({
                text: setMassage,
                buttonText: "x",
                position: setPosition,
                duration: setDuration
            })
        }
    }
}