import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../interfaces/note';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-note-form',
  imports: [ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css'
})
export class NoteFormComponent{

  noteForm!: FormGroup;
  showSuccessToast: boolean = false;

constructor(private noteservice:NoteService ,private formBuilder:FormBuilder){
  
}
  ngOnInit(): void { 
    this.noteForm= this.formBuilder.group({
      id:1,
      title:['',Validators.required],
      content:['',Validators.required]
    })
  }
  onSubmit(): void {
    if (this.noteForm.invalid) {
      
      console.log("Form is invalid!");
      return
    }
    const note:Note =this.noteForm.value;
    this.noteservice.createNote(note)
   // Show success toast
   this.showSuccessToast = true;
    
   // Hide toast after 3 seconds
   setTimeout(() => {
     this.showSuccessToast = false;
   }, 3000);
    this.noteForm.reset();
  }
}
