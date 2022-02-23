import {Component} from "../../@cinera/component";
import {Route} from "../../@cinera/route";


@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrl: './product.component.css'
}, 'product')
export class ProductComponent {

    constructor(private route: Route) {
        console.log(this.route);
    }

    onInit() {
        // console.log(444);
    }

    onClick() {
        this.route.navigate('register');

    }
}
