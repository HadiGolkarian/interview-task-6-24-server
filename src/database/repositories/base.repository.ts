import { BaseEntity, Repository } from 'typeorm';

class BaseRepository<T> extends Repository<T> {}

export default BaseRepository;
