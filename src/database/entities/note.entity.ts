import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('notes')
export class NoteEntity  {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  note: string;
}
