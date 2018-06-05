export default class Profile {
    constructor(param) {
        let _param;
        if (typeof  param === 'object') {
            _param = param;
        } else if (typeof  param === 'string') {
            _param = JSON.parse(param);
        } else {
            throw new Error("please pass valid param for profile: string || object");
        }

        // todo: should ensure all the value passed is valid

        this._id = _param.id;
        this._publicKeys = _param.publicKey;
        this._authentication = _param.authentication;
    }

    authentication(type) {

    }

    get id() {
        return this._id;
    }

    key(type) {
        let filtered = this._publicKeys.filter(e => {
            return e.type === type
        });

        if (filtered.length !== 1) {
            throw new Error(`Expect 1 publicKey of type:${type}, but found ${filtered.length}`);
        }

        return filtered[0].publicKeyHex;
    }
}