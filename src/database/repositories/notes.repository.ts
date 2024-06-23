import { Injectable } from '@nestjs/common';
import { CustomRepository } from 'src/database/typeorm/typeorm-ex.decorator';
import { NoteEntity } from '../entities/note.entity';
import BaseRepository from './base.repository';

@Injectable()
@CustomRepository(NoteEntity)
export class NotesRepository extends BaseRepository<NoteEntity> {}
