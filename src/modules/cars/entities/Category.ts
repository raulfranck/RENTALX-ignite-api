import { v4 as uuidV4 } from 'uuid';
import { Entity } from 'typeorm';

@Entity("categories")
class Category {
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Category }