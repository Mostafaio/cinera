import {Component} from "../@cinera/component";
import {Route} from "../@cinera/route";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
}, 'app')
export class AppComponent {
    constructor(private route: Route) {
        console.log(this.route);
        // this.route.navigate('register');
    }
}
