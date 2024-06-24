import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteEntity } from 'src/database/entities/note.entity';
import { NotesRepository } from 'src/database/repositories/notes.repository';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async readAllNotes(): Promise<NoteEntity[]> {
    const notes = await this.notesRepository.find();
    return notes;
  }

  async readNoteById(id: number): Promise<NoteEntity | null> {
    const note = await this.notesRepository.findOneBy({
      id,
    });

    return note;
  }

  async createNote(dto: CreateNoteDto): Promise<NoteEntity> {
    const note = await this.notesRepository.save(
      {
        title: dto.title,
        note: dto.note,
      },
      { reload: true },
    );

    return note;
  }

  async updateNote(id: number, dto: UpdateNoteDto): Promise<NoteEntity> {
    const originalNote = await this.notesRepository.findOneBy({
      id,
    });

    if (!originalNote) {
      throw new NotFoundException(`Note with Id ${id} not found`);
    }

    originalNote.title = dto.title;
    originalNote.note = dto.note;

    const updatedNote = await this.notesRepository.save(originalNote, {
      reload: true,
    });

    return updatedNote;
  }

  async deleteNote(id: number): Promise<number> {
    const { affected } = await this.notesRepository.delete({ id });

    if (affected === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return affected;
  }
}
