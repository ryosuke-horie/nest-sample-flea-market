import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
    findAll() {
        return 'This is findAll Service';
    }
}
