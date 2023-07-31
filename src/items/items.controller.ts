import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.model';
import { ItemStatus } from './item-status.enum';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get() // デコレーター http://localhost:3000/items
  findAll(): Item[] {
    return this.itemsService.findAll();
  }

  @Get(':id') // デコレーター http://localhost:3000/items/test1
  findById(@Param('id') id: string): Item {
    return this.itemsService.findById(id);
  }

  @Post()
  create(
    @Body('id') id: string, // @Body()でリクエストを受け取り、idという変数にidを格納する
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string,
    ): Item {
      const item: Item = {
        id, // id: id,と同じ意味（ES6の書き方）
        name,
        price,
        description,
        status: ItemStatus.ON_SALE,
      }
    return this.itemsService.create(item);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string): Item {
    return this.itemsService.updateStatus(id);
  }
}
