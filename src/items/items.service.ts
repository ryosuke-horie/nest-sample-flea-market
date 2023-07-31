import { Injectable } from '@nestjs/common';
import { Item } from './item.model';

@Injectable() // DI
export class ItemsService {
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item {
    return this.items.find((item) => item.id === id); // find関数の中にcallback関数を渡す。item.idが引数のidと一致するかどうかを判定しtrueになったらそのitemを返す。
  }

  create(item: Item): Item {
    this.items.push(item);
    return item;
  }
}
