import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './item.model';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { v4 as uuid } from 'uuid';

@Injectable() // DI
export class ItemsService {
  private items: Item[] = [];

  findAll(): Item[] {
    return this.items;
  }

  findById(id: string): Item {
    const found = this.items.find((item) => item.id === id); // find関数の中にcallback関数を渡す。item.idが引数のidと一致するかどうかを判定しtrueになったらそのitemを返す。
    if(!found) {
      throw new NotFoundException();
    }
    return found;
  }

  create(createItemDto: CreateItemDto): Item {
    const item: Item = {
      id: uuid(),
      ...createItemDto, // ...はスプレッド構文。createItemDtoの中身を展開している。
      status: ItemStatus.ON_SALE,
    };
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
