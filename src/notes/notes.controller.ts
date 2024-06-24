import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getAllNotes(@Req() req: Request) {}

  @Get(':id')
  async getNote(@Req() req: Request, @Param('id') noteId: number) {}

  @Post()
  async createNote(@Req() req: Request, @Body() dto: CreateNoteDto) {}

  @Put()
  async updateNote(@Req() req: Request, @Body() dto: UpdateNoteDto) {}

  @Delete(':id')
  async deleteNote(@Req() req: Request, @Param('id') noteId: number) {}
}
