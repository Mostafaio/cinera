import {Injectable} from "../../../@cinera/injectable";
import {map} from 'rxjs/operators';
import {HttpClient} from "../../../@cinera/httpClient";


@Injectable()
export class SharedService {
    backendURL = 'https://api.publicapis.org/';
    hh = 'hhh';

    constructor(private http: HttpClient) {
        console.log(this.http);
    }

    havij() {
        console.log(88);
    }

    getData(url: string = 'entries'): any {
        return this.http.get(
            'https://api.poralist.com/api-v1/blogs',
            {headers: [{'ACCEPT': 'application/json'}]}
        ).pipe(map((response: any) => {
                const data: any = response;
                return data;
            }
        ));
    }

    sendData(url: string, mainData: any): any {
        return this.http.post(
            url,
            mainData,
            {headers: [{'ACCEPT': 'application/json'}]}
        ).pipe(map((response: any) => {
                const data: any = response;
                return data;
            }
        ));
    }
}
