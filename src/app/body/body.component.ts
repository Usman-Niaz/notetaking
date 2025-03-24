import { Component } from '@angular/core';
import { AddNoteComponent } from "../add-note/add-note.component";
import { CardComponent } from "../card/card.component";
import { Note } from '../interfaces/note';

@Component({
  selector: 'app-body',
  imports: [AddNoteComponent, CardComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
 
  selectedNote!: Note; // ✅ Store selected note
  showToast: boolean = false;
  
  selectsNotes(note: Note) {
    console.log("Received note in BodyComponent:", note);
    this.selectedNote = note; // ✅ Update selected note
  }
  showDeleteToast() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
}
}