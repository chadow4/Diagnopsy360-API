import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { Role } from "../auth/interface/role.enum";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false
  })
  firstname: string;

  @Column({
    type: "varchar",
    nullable: false
  })
  lastname: string;

  @Column({
    type: "varchar",
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    type: "varchar",
    nullable: false
  })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({
    type: "varchar",
    nullable: true
  })
  role: Role;
}
