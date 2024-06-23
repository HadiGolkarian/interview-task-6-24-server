import { BaseEntity, Repository } from 'typeorm';

class BaseRepository<T extends BaseEntity> extends Repository<T> {}

export default BaseRepository;
