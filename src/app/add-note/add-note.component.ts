import { Component } from '@angular/core';
import { NoteFormComponent } from "../component/note-form/note-form.component";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
  imports: [NoteFormComponent]
})
export class AddNoteComponent {
  selectedAddNote: boolean = false; // Change 'any' to 'boolean'

  openPopup() {
    this.selectedAddNote = true; // No argument needed
  }

  closePopup() {
    this.selectedAddNote = false; // No argument needed
  }
}
