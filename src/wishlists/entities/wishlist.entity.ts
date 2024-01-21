import { IsNotEmpty, IsUrl, Length } from "class-validator";
import { BaseEntity } from "src/common/entities/base.entity";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Wishlist extends BaseEntity {
  @Column({ length: 250 })
  @IsNotEmpty()
  @Length(1, 250)
  name: string

  @Column()
  @IsNotEmpty()
  @IsUrl()
  image: string

  @ManyToOne(() => User, user => user.wishlists)
  owner: User

  @ManyToMany(() => Wish, wish => wish.wishlists)
  @JoinTable()
  items: Wish[]
}
