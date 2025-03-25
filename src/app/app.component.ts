import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { BodyComponent } from "./body/body.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
@Component({
  selector: 'app-root',
  imports: [ HeaderComponent, BodyComponent,  SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'notetaking';

  
}
