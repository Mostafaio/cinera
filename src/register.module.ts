import {CModule} from "../@cinera/c-module";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterRoutingModule} from "./register-routing.module";

@CModule({
    declarations: [
        RegisterComponent,
        ProfileComponent
    ],
    imports: [
        RegisterRoutingModule
    ],
    providers: [],
})
export class RegisterModule {
    constructor() {
    }
}
