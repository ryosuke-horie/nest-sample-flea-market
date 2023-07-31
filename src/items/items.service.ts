import { Injectable } from '@nestjs/common';
import { Item } from './item.model';

@Injectable() // DI
export class ItemsService {
  private items: Item[] = [];

  findAll() {
    return 'This is findAll Service';
  }

  create(item: Item): Item {
    this.items.push(item);
    return item;
  }
}
