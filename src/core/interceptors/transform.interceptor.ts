import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { isArray, isObject } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private exposeAll: boolean) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next
      .handle()
      .pipe(map((res) => (isObject(res) ? this.transformResponse(res) : res)));
  }

  transformResponse(response) {
    if (isArray(response)) {
      return response.map((item) => this.transformToPlain(item));
    }
    return this.transformToPlain(response);
  }

  transformToPlain(plainOrClass) {
    this.exposeAll = false;

    return instanceToPlain(plainOrClass, {
      excludeExtraneousValues: !this.exposeAll,
      strategy: this.exposeAll ? 'exposeAll' : 'excludeAll',
    });
  }
}
