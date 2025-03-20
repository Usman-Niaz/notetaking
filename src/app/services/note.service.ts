import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { Note } from '../interfaces/note';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
private notes:Note[]=[]
private notesSubject=new BehaviorSubject<Note[]>([])
private isEdit=new BehaviorSubject<boolean>(false)
  constructor() { }
  getEditable(){
    return this.isEdit.asObservable();
  }
  setEditable(value:boolean)
  {
    this.isEdit.next(value)
  }
  getNotesObservable():Observable<Note[]>{
    return this.notesSubject.asObservable();
  }

  getIsEditObservable():Observable<boolean>{
    return this.isEdit.asObservable();
  }
  createNote(note:Note):void{
    note.id=new Date().getTime();
    this.notes.push(note);
    this.notesSubject.next(this.notes);
  }

  updateNote(updatedNote: Note) {
    const index = this.notes.findIndex((note) => note.id === updatedNote.id);
    if (index !== -1) {
      this.notes[index] = updatedNote;
      console.log('Note updated:', updatedNote);
    }
  }
  
  deleteNote(id:number):void{
    this.notes= this.notes.filter(note => note.id !== id)
    this.notesSubject.next(this.notes);
  }
}
