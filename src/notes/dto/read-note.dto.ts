import { Expose } from 'class-transformer';
import { NoteEntity } from 'src/database/entities/note.entity';

export class ReadNoteDto {
  constructor(values: NoteEntity) {
    Object.assign(this, values);
  }

  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  note: string;
}
