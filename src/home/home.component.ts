import {Component} from "../../@cinera/component";
import {Route} from "../../@cinera/route";


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
}, 'home')
export class HomeComponent {

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
