import {Component} from "../../@cinera/component";
import {Route} from "../../@cinera/route";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
}, 'profile')
export class ProfileComponent {
    profileMsg = 'Man Profile hastam!';

    constructor(private route: Route) {
        // console.log(this.route);
    }

    onInit() {
        // console.log(444);
    }

    onClick(): void {
        this.profileMsg = (Math.random() * 100).toString();
        console.log(this.profileMsg);
    }
}
