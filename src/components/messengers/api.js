// alloc messenger
// dealloc messenger
// send
// receive

import uuid from 'uuidjs';

class Messenger {
    constructor(uri, content, fetch) {
        this.uri = uri;
        this.content = content;
        this.fetch = fetch;
    }

    async dealloc() {

    }

    async speak() {

    }

    async hear() {

    }
}

export default class Messengers {


    constructor(client) {
        this.client = client;
    }

    async alloc() {
        return await this.client.fetch("/messengers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: {
                    id: `${uuid.generate()}`,
                    type: "messengers",
                    attributes: {}
                }
            })
        }).then(res => {
            console.log(res);
            console.log(res.headers.get("Location"));
            res.headers.forEach((k, v) => console.log(k, "=>", v));
            return {
                uri: this.client.abs(res.headers.get("Location"))
            };
        });
    }

    async dealloc() {

    }

    async speak() {

    }

    async hear() {

    }
}