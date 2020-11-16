import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { OrderTableComponent } from "./order-table/order-table.component";
import { HeaderComponent } from "./header/header.component";
import { RouterModule } from "@angular/router";
import { HttpService } from "./http.service";
import { HttpClientModule } from "@angular/common/http";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    Ng2SmartTableModule,
    NgbModule,
    RouterModule.forRoot([
      { path: ``, component: OrderTableComponent },
      { path: `:filter`, component: OrderTableComponent }
    ])
  ],
  declarations: [AppComponent, OrderTableComponent, HeaderComponent],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
