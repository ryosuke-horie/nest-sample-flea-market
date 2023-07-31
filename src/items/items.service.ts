import { Injectable } from '@nestjs/common';
import { Item } from './item.model';
import { ItemStatus } from './item-status.enum';

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

  updateStatus(id: string): Item {
    const item = this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    return item;
  }

  delete(id: string): void {
    // filterメソッドは特定の値以外を残すという考え方。
    this.items = this.items.filter((item) => item.id !== id); // ここではitem.idが引数のidと一致しないものだけを残すという意味。
  }
}
