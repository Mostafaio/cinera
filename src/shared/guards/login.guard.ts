import {Observable, Subject} from 'rxjs';
import {Injectable} from "../../../@cinera/injectable";

@Injectable()
export class LoginGuard {

  constructor() {
    console.log(2);
  }

  canActivate(): Observable<any> | any {
    const subject = new Subject<boolean>();
    setTimeout(() => {
      console.log(1);
      subject.next(true);
    }, 2000);
    // return true;
    return subject.asObservable();
  }

}
