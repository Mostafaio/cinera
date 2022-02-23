import {CModule} from "../../@cinera/c-module";
import {ProductComponent} from "./product.component";


const routes: any = [
    {path: '', component: ProductComponent},
];

@CModule({
    routes: routes
})
export class ProductRoutingModule {
    constructor() {
    }
}
