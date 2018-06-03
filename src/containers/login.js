import React, {Component} from 'react';
import logo from '../logo.svg';
import './login.css';
import QRCode from 'components/qrcode';
import Messenger from 'components/messengers'
import Share from 'components/messengers/share'

const QR = (props) => {
    const {messenger} = props;
    let data = messenger.attributes.content.access_token;
    return <QRCode data={data}/>;
};

class Login extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to the blockcity</h1>
                </header>
                <Messenger hearing={<div>Loading the messenger</div>}>
                    <Share>
                        <QR/>
                    </Share>
                </Messenger>
            </div>
        )
    }
}

export default Login;
