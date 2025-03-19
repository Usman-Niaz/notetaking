import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { Note } from '../interfaces/note';
@Injectable({
  providedIn: 'root'
})
export class NoteService {
private notes:Note[]=[]
private notesSubject=new BehaviorSubject<Note[]>([])
  constructor() { }
  getNotesObservable():Observable<Note[]>{
    return this.notesSubject.asObservable();
  }
  createNote(note:Note):void{
    note.id=this.notes.length;
    this.notes.push(note);
    this.notesSubject.next(this.notes);
  }
}
