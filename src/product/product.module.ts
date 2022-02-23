import {CModule} from "../../@cinera/c-module";
import {ProductComponent} from "./product.component";
import {ProductRoutingModule} from "./product-routing.module";

@CModule({
    declarations: [
        ProductComponent,
    ],
    imports: [
        ProductRoutingModule
    ],
    providers: [],
})
export class ProductModule {
    constructor() {
    }
}
