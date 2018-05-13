import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {allAppComponents, appRoutingProviders, routing} from "./app.routes";

const moduleDeclarations = [AppComponent];

@NgModule({
	imports:      [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, routing],
	declarations: [...moduleDeclarations, ...allAppComponents],
	bootstrap:    [AppComponent],
	providers:    [...appRoutingProviders]
})
export class AppModule {}