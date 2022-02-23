import {CModule} from "../../@cinera/c-module";
import {UserComponent} from "./user.component";
import {UserRoutingModule} from "./user-routing.module";

@CModule({
    declarations: [
        UserComponent,
    ],
    imports: [
        UserRoutingModule
    ],
    providers: [],
})
export class UserModule {
    constructor() {
    }
}
