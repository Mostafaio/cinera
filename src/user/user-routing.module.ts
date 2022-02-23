import {CModule} from "../../@cinera/c-module";
import {UserComponent} from "./user.component";


const routes: any = [
    {path: '', component: UserComponent},
    {path: 'ko', component: UserComponent},
    {path: 'lopo/jojo', loadChildren: () => import('../product/product.module').then(m => m.ProductModule)},
];

@CModule({
    routes: routes
})
export class UserRoutingModule {
    constructor() {
    }
}
