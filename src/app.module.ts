import {CModule} from "../@cinera/c-module";
import {RegisterComponent} from "./register/register.component";
import {AppComponent} from "./app.component";
import {ProfileComponent} from "./profile/profile.component";
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./home/home.component";
import {TesttComponent} from "./testt/testt.component";

@CModule({
    declarations: [
        RegisterComponent,
        ProfileComponent,
        HomeComponent,
        TesttComponent
    ],
    imports: [
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
    }
}
