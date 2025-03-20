import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Note } from '../../interfaces/note';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-form',
  imports: [ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css',
})
export class NoteFormComponent implements OnInit, OnChanges {
  @Input() noteForForm: Note | null = null; // Receives selected note from parent

  noteForm!: FormGroup;
  showSuccessToast: boolean = false;
  isButtonDisabled: boolean = false;
  isEdit: boolean = false;

  constructor(
    private noteService: NoteService,
    private formBuilder: FormBuilder
  ) {
    // Initialize form in constructor to prevent undefined errors
    this.noteForm = this.formBuilder.group({
      id: [new Date().getTime()], // Unique ID for new note
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.noteService.getEditable().subscribe({
      next: (response) => {
        this.isEdit = response;
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.noteForm) return; // Prevents undefined errors

    if (changes['noteForForm'] && changes['noteForForm'].currentValue) {
      const note = changes['noteForForm'].currentValue as Note;

      if (note && note.id) {
        this.isEdit = true;
        this.noteForm.patchValue({
          id: note.id,
          title: note.title,
          content: note.content,
        });

        this.noteForm.controls['id'].disable(); // Disable ID field when editing
      } else {
        this.isEdit = false;
        this.noteForm.reset();
        this.noteForm.controls['id'].setValue(new Date().getTime()); // Generate new ID
        this.noteForm.controls['id'].enable();
      }
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.noteForm.invalid) {
      console.log('Form is invalid!');
      return;
    }

    const note: Note = this.noteForm.getRawValue(); // Get values including disabled fields

    if (this.isEdit) {
      this.noteService.updateNote(note); // Update existing note
    } else {
      this.noteService.createNote(note); // Create new note
    }

    this.showSuccessToast = true;
    this.isButtonDisabled = true;

    setTimeout(() => {
      this.showSuccessToast = false;
      this.isButtonDisabled = false;
    }, 1000);

    this.noteForm.reset();
    this.noteForm.controls['id'].setValue(new Date().getTime()); // Reset ID for new note
  }
}
