import {CModule} from "../@cinera/c-module";
import {RegisterComponent} from "./register/register.component";


const routes: any = [
    {path: '', component: RegisterComponent},
];

@CModule({
    routes: routes
})
export class RegisterRoutingModule {
    constructor() {
    }
}
