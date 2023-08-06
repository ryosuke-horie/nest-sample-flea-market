import { UserStatus } from "src/auth/user-status.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;
    
    @Column()
    status: UserStatus;

    // Itemエンティティと1対多の関係を定義
    @OneToMany(() => Item, (item) => item.user)
    items: Item[];
}