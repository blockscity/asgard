import {KJUR, KEYUTIL} from 'jsrsasign';

export const encode = async (key, payload) => {
    const header = {alg: 'ES256', typ: 'JWT'};
    let k = KEYUTIL.getKey({
        d: key,
        curve: "secp256k1"
    });

    return KJUR.jws.JWS.sign("ES256", header, payload, k);
};


// as a app, I should register with the identity also, cause I need use the key to communicate with people.
export const decode = async (provide, jwt) => {
    let parsed = KJUR.jws.JWS.parse(jwt);

    let profile = provide(parsed.payloadPP.iss);
    let pub = KEYUTIL.getKey(
        {
            xy: profile.key("Secp256k1VerificationKey2018"),
            curve: "secp256k1"
        }
    );

    const isValid = KJUR.jws.JWS.verifyJWT(jwt, pub, {alg: ['ES256']});
    if (isValid) {
        return {
            payload: parsed.payloadObj,
            profile: profile
        }
    } else {
        return Promise.reject("Invalid signature")
    }


}

export default {encode, decode}