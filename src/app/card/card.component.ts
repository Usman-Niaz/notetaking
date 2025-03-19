import { Component, OnInit } from '@angular/core';
import { Note } from '../interfaces/note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit { // ✅ Implement OnInit
  notes: Note[] = [];
  selectedNote: any = null;

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
  
}
