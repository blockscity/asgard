import React, {Component} from 'react';
import qr from 'qr-image'

class QRCode extends Component {
    dataify(data) {
        let png = qr.imageSync(data, {type: 'png'});
        return 'data:image/png;charset=utf-8;base64, ' + png.toString('base64');
    };

    render() {
        const {data} = this.props;
        return (
            <div>
                <img src={this.dataify(data)}/>
            </div>
        );
    }
}

export default QRCode;
