import { Observable } from "rxjs";
export declare class Route {
    url: string;
    rawUrl: string;
    params: {
        title: string;
    }[];
    constructor();
    getUrl(): void;
    getQueryParams(): Observable<{
        title: string;
    }[]>;
    urlChanges(): Observable<{
        preUrl: string;
        url: string;
    }>;
    navigate(url: string, params: {}): void;
}
