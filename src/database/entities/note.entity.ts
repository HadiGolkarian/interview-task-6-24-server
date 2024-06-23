import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('notes')
export class NoteEntity extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  title: number;

  @Column()
  note: number;
}
