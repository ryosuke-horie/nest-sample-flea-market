import { Controller, Get } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get() // デコレーター http://localhost:3000/items
    findAll() {
        // ItemsServiceのfindAll()を呼び出す
        return this.itemsService.findAll();
    }
}
