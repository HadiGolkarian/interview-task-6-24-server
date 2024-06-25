import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteEntity } from 'src/database/entities/note.entity';
import { NotesRepository } from 'src/database/repositories/notes.repository';
import { Like } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async searchNotes(searchText: string): Promise<NoteEntity[]> {
    const notes = await this.notesRepository.find({
      where: [
        { title: Like(`%${searchText}%`) },
        { note: Like(`%${searchText}%`) },
      ],
      order: {
        createdAt: 'DESC',
      },
    });

    return notes;
  }

  async readAllNotes(): Promise<NoteEntity[]> {
    const notes = await this.notesRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return notes;
  }

  async readAllNoteStats(): Promise<
    {
      createdAt: Date;
      notes: number;
    }[]
  > {
    const groupedCounts = await this.notesRepository
      .createQueryBuilder('note')
      .select('DATE(note.createdAt)', 'date')
      .addSelect('COUNT(note.id)', 'count')
      .groupBy('DATE(note.createdAt)')
      .orderBy('date', 'ASC')
      .getRawMany();

    return groupedCounts.map((group) => ({
      createdAt: group.date,
      notes: Number(group.count),
    }));
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
        createdAt: new Date(),
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
