import {Observable} from "rxjs";

export class Route {
    url: string = '';
    rawUrl: string = '';
    params: { title: string }[] = [];

    constructor() {
        this.getUrl();
    }

    getUrl() {
        this.url = window.location.href;
        this.rawUrl = this.url.split('?')[0];
    }

    getQueryParams(): Observable<{ title: string }[]> {
        return new Observable(subscriber => {
            let tempParams: string[] = [];
            const splitUrl = this.url.split('?');
            if (splitUrl.length > 1) {
                tempParams = splitUrl[1].split('&');
                var myObject: any = {};
                for (let i = 0; i < tempParams.length; i++) {
                    const temp = tempParams[i].split('=');
                    if (temp.length > 0) {
                        myObject[temp[0]] = temp[1];
                    }
                }
                this.params = myObject;
            } else {
                this.params = [];
            }
            subscriber.next(this.params);
        });
    }

    urlChanges(): Observable<{ preUrl: string, url: string }> {
        var preUrl = this.url;
        return new Observable(subscriber => {
            window.onpopstate = (event) => {
                if (this.url !== location.href) {
                    this.url = location.href;
                    if (event.state) {
                        // history changed because of pushState/replaceState
                        console.warn('THEY DID IT AGAIN222!');
                    } else {
                        // history changed because of a page load
                        console.warn('THEY DID IT AGAIN!');
                    }
                }
            }
            subscriber.next({
                preUrl: preUrl,
                url: this.url
            });
        });
    }

    navigate(url: string, params: {}) {
        window.history.pushState('page2', 'Title', url);
        if (this.url !== location.href) {
            console.log(this.url);
            window.dispatchEvent(new Event('popstate'));
        }
    }
}
