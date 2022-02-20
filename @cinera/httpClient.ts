import {Observable} from "rxjs";

export class HttpClient {
    hs = 'ssds';

    constructor() {
    }

    get(url: string, options: { headers: any[] }) {
        const xhttp = new XMLHttpRequest();
        let isJSON = false;

        xhttp.open("GET", url);
        for (let i = 0; i < options.headers.length; i++) {
            var result: any = Object.keys(options.headers[i]).map((key) => [key, options.headers[i][key]])[0];
            xhttp.setRequestHeader(result[0], result[1]);
            if (result[1] === 'application/json') {
                isJSON = true;
            }
        }
        xhttp.send();
        return new Observable(subscriber => {
            xhttp.onload = (data: any) => {
                if (isJSON) {
                    subscriber.next(JSON.parse(data.target.responseText));
                } else {
                    subscriber.next(data.target.responseText);
                }
            }
        });
    }

    post(url: string, body: any, options: {headers: any[]}) {
        const xhttp = new XMLHttpRequest();
        let isJSON = false;

        xhttp.open("POST", url);
        for (let i = 0; i < options.headers.length; i++) {
            var result: any = Object.keys(options.headers[i]).map((key) => [key, options.headers[i][key]])[0];
            xhttp.setRequestHeader(result[0], result[1]);
            if (result[1] === 'application/json') {
                isJSON = true;
            }
        }
        xhttp.send(JSON.stringify(body));
        return new Observable(subscriber => {
            xhttp.onload = (data: any) => {
                if (isJSON) {
                    subscriber.next(JSON.parse(data.target.responseText));
                } else {
                    subscriber.next(data.target.responseText);
                }
            }
        });
    }
}
