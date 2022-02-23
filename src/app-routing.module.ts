import {CModule} from "../@cinera/c-module";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";


const routes: any = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'havij/golabi', component: LoginComponent},
    {path: 'sib/miko', loadChildren: () => import('./register.module').then(m => m.RegisterModule)},
];

@CModule({
    routes: routes
})
export class AppRoutingModule {
    constructor() {
    }
}
