import { Component, Input,Output,EventEmitter, OnInit } from '@angular/core'; // ✅ Import Input
import { Note } from '../interfaces/note';
import { NoteFormComponent } from "../component/note-form/note-form.component";
import { NoteService } from '../services/note.service';
@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
  imports: [NoteFormComponent]
})
export class AddNoteComponent implements OnInit {
  selectedAddNote: boolean = false; // Change 'any' to 'boolean'
  @Input() selectedNote!: Note;  // ✅ Receive from BodyComponent
  @Output() noteAdded = new EventEmitter<Note>(); // ✅ Emit to BodyComponent

  constructor(private noteService: NoteService){}

  ngOnInit(): void {
    this.noteService.getIsEditObservable().subscribe(res=>{
      this.selectedAddNote = res;
    })
  }

  openPopup() {
    this.selectedAddNote = true;
  }

  closePopup() {
    this.selectedAddNote = false;
  }

  handleNoteSubmit(note: Note) {
    this.noteAdded.emit(note);  // ✅ Emit new note to BodyComponent
    this.closePopup();  // ✅ Close popup after adding note
  }

}
