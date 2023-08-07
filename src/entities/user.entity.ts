import { UserStatus } from "src/auth/user-status.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude({ toPlainOnly: true }) // パスワードをレスポンスから外す
    password: string;
    
    @Column()
    status: UserStatus;

    // Itemエンティティと1対多の関係を定義
    @OneToMany(() => Item, (item) => item.user)
    items: Item[];
}