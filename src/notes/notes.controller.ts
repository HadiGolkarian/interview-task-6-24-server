import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { ReadNoteDto } from './dto/read-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getAllNotes() {
    const notes = await this.notesService.readAllNotes();

    return notes.map((note) => new ReadNoteDto(note));
  }

  @Get(':id')
  async getNote(@Param('id') noteId: number) {
    const note = await this.notesService.readNoteById(noteId);

    if (!note) {
      throw new NotFoundException(`Note with Id ${noteId} not found`);
    }

    return new ReadNoteDto(note);
  }

  @Post()
  async createNote(@Body() dto: CreateNoteDto) {
    const note = await this.notesService.createNote(dto);

    return new ReadNoteDto(note);
  }

  @Put(':id')
  async updateNote(@Param('id') noteId: number, @Body() dto: UpdateNoteDto) {
    const note = await this.notesService.updateNote(noteId, dto);

    return new ReadNoteDto(note);
  }

  @Delete(':id')
  async deleteNote(@Param('id') noteId: number) {
    return await this.notesService.deleteNote(noteId);
  }
}
