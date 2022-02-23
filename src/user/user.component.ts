import {Component} from "../../@cinera/component";
import {Route} from "../../@cinera/route";


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrl: './user.component.css'
}, 'user')
export class UserComponent {

    constructor(private route: Route) {
        console.log(this.route);
    }

    onInit() {
        // console.log(444);
    }

    onClick() {
        this.route.navigate('register');

    }
}
