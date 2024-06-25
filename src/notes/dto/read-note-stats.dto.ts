import { Expose } from 'class-transformer';

export class ReadNoteStatus {
  constructor(values: { createdAt: Date; notes: number }) {
    Object.assign(this, values);
  }

  @Expose()
  createdAt: Date;

  @Expose()
  notes: number;
}
