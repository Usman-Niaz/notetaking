import { Component } from '@angular/core';
import { AddNoteComponent } from "../add-note/add-note.component";
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-body',
  imports: [AddNoteComponent, CardComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

}
