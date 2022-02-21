import {CModule} from "../@cinera/c-module";
import {RegisterComponent} from "./register/register.component";
import {RegisterRoutingModule} from "./register-routing.module";

@CModule({
    declarations: [
        RegisterComponent
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
