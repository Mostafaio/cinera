import {CModule} from "../@cinera/c-module";
import {RegisterComponent} from "./register/register.component";
import {AppComponent} from "./app.component";
import {ProfileComponent} from "./profile/profile.component";
import {AppRoutingModule} from "./app-routing.module";

@CModule({
    declarations: [
        RegisterComponent,
        ProfileComponent
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
