import { Injectable } from '@nestjs/common';

@Injectable() // DI
export class ItemsService {
  findAll() {
    return 'This is findAll Service';
  }
}
