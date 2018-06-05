import chai from 'chai';
import Profile from './profile';

const expect = chai.expect;

import {encode, decode} from "./jwt";


describe('jwt', () => {
    let pair = {
        pub: "042405b75973b9ca7be906e4f6975a38a45991e3db01fc125e901be7770d4041767c2bbb5eecc3b75d13947b6cb1c29299f8b0e7b594e76c07331efa6d9dbc89a7",
        pri: "00c62fb57362fbdc8e6f37315ed45a5716ab30f6ebafabc31d299fcd30c3292159"
    };
    let iss = "0xd8d27E1E5328B009BCDD8e3dE357f79051cf00fe";
    let provider = id => {
        return new Profile(
            {
                "@context": "https://w3id.org/did/v1",
                id: "0xd8d27E1E5328B009BCDD8e3dE357f79051cf00fe",
                publicKey: [{
                    id: "0xd8d27E1E5328B009BCDD8e3dE357f79051cf00fe#keys-1",
                    type: "Secp256k1VerificationKey2018",
                    owner: "0xd8d27E1E5328B009BCDD8e3dE357f79051cf00fe",
                    publicKeyHex: pair.pub
                }, {
                    id: "0xd8d27E1E5328B009BCDD8e3dE357f79051cf00fe#keys-2",
                    type: "Curve25519EncryptionPublicKey",
                    owner: "0xd8d27E1E5328B009BCDD8e3dE357f79051cf00fe",
                    publicKeyBase64: "QCFPBLm5pwmuTOu+haxv0+Vpmr6Rrz/DEEvbcjktQnQ="
                }],
                authentication: [{
                    type: "Secp256k1SignatureAuthentication2018",
                    publicKey: "0xd8d27E1E5328B009BCDD8e3dE357f79051cf00fe#keys-1"
                }]
            }
        );
    };

    it('should able to encode payload to jwt', async () => {
        let encoded = await encode(pair.pri, {
            iss: iss
        });
        expect(encoded).to.not.be.null;
    });


    it('should able to decode jwt payload', async () => {
        let encoded = await encode(pair.pri, {
            iss: iss
        });
        let decoded = await decode(provider, encoded);

        expect(decoded.payload.iss).to.equal(iss);
    });

    it('should not able to encode when iss missing', function () {

    });

    it('should add the exp when encoded', function () {

    });

    it('should add iat when encoded', function () {

    });

    it('should not able decode jwt when signature is invalid', async () => {
    });

    it('should not able to decode when public key not found', async () => {
    });

    it('should not able to decode when the jwt is expired', async () => {
    });

    it('should not able to decode when the jwt is issued for the future', async () => {
    });
});