import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Note } from '../interfaces/note';
import { NoteService } from '../services/note.service';
import { NoteFormComponent } from "../component/note-form/note-form.component";
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-card',
    imports: [ NgxPaginationModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit { // ✅ Implement OnInit
  notes: Note[] = [];
  selectedNote: any = null;
  isEditMode:boolean=false;
  currentPage: number = 1; // Pagination current page
  itemsPerPage: number = 6; // Number of notes per page
  @Output() selectNote = new EventEmitter<Note>()
  @Output() noteDeleted = new EventEmitter<void>();

  OnInit(): void {
    this.noteservice.getNotesObservable().subscribe((note: Note[]) => {
      this.notes = note;
      console.log(this.notes);
    });
  }
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
    this.noteDeleted.emit(); // ✅ Emit delete event
  }
  
  editNote(note: Note): void {
    this.selectNote.emit(note); 
    this.noteservice.setEditable(true);
  }
  
}
