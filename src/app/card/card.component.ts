import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Note } from '../interfaces/note';
import { NoteService } from '../services/note.service';
import { NoteFormComponent } from "../component/note-form/note-form.component";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit { // ✅ Implement OnInit
  notes: Note[] = [];
  selectedNote: any = null;
  isEditMode:boolean=false;
  @Output() selectNote = new EventEmitter<Note>()

  openPopup(note: any) {
    this.selectedNote = note;
  }

  closePopup() {
    this.selectedNote = null;
  }

  constructor(private noteservice: NoteService) {}

  ngOnInit(): void 
  {
        this.noteservice.getNotesObservable().subscribe((note:Note[]) =>{

      this.notes=note;
      console.log(this.notes)
    })
  }
  deleteNote(id:number): void{
    this.noteservice.deleteNote(id);
  }
  
  editNote(note: Note): void {
    this.selectNote.emit(note); 
    this.noteservice.setEditable(true);
  }
  
}
