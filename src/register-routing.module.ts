import {CModule} from "../@cinera/c-module";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";


const routes: any = [
    {path: '', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'kiko/piko', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
];

@CModule({
    routes: routes
})
export class RegisterRoutingModule {
    constructor() {
    }
}
