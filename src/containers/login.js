import React, {Component} from 'react';
import logo from '../logo.svg';
import './login.css';
import QRCode from 'components/qrcode';
import Messenger from 'components/messengers'
import Share from 'components/messengers/share'

class Login extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to the blockcity</h1>
                </header>
                <Messenger>
                    <Share>
                        <QRCode data={"test"}/>
                    </Share>
                </Messenger>
            </div>
        )
    }
}

export default Login;
