import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemRepository } from './item.repository';

@Injectable() // DI
export class ItemsService {
  constructor (private readonly itemRepository: ItemRepository) {} // Di

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

  async create(createItemDto: CreateItemDto): Promise<Item> { // DB操作が非同期のためasyncをつける。Promiseを返すのでPromise<Item>とする。
    return await this.itemRepository.createItem(createItemDto); // 非同期なのでawaitをつける。
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
