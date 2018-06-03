// alloc messenger
// dealloc messenger
// send
// receive

import uuid from 'uuidjs';

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
                    attributes: {
                    }
                }
            })
        }).then(({headers}) => {
            let location = headers.get("Location");
            let id = location.split("/")[location.split("/").length - 1];
            return {
                id: id,
                type: "messengers",
                self: this.client.abs(location)
            };
        });
    }

    async dealloc() {

    }

    async said() {

    }

    async heard(messenger) {
        console.log(messenger);
        let {self} = messenger;
        return await this.client.fetch(this.client.rel(self), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(({json}) => {
            return {
                id: messenger.id,
                type: "messengers",
                self: self,
                attributes: json.data.attributes
            };
        });
    }
}