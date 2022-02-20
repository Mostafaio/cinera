import {Component} from "../../@cinera/component";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
}, 'profile')
export class ProfileComponent {
    profileMsg = 'Man Profile hastam!';

    constructor() {
    }

    onInit() {
        console.log(444);
    }

    onClick(): void {
        this.profileMsg = (Math.random() * 100).toString();
        console.log(this.profileMsg);
    }
}
