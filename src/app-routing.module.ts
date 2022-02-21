import {CModule} from "../@cinera/c-module";


const routes: any = [
    {path: 'register', loadChildren: () => import('./register.module').then(m => m.RegisterModule)},
];

@CModule({
    routes: routes
})
export class AppRoutingModule {
    constructor() {
    }
}
