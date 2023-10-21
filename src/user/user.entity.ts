import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, BeforeUpdate } from "typeorm";
import { Role } from "../auth/interface/role.enum";
import { DiagnosisEntity } from "../diagnosis/diagnosis.entity";
import * as bcrypt from "bcrypt";

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
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({
    type: "varchar",
    nullable: true
  })
  role: Role;

  @OneToMany(() => DiagnosisEntity, (myDiagnoses) => myDiagnoses.patient)
  myDiagnoses: DiagnosisEntity[];

  @OneToMany(() => DiagnosisEntity, (myPatientsDiagnoses) => myPatientsDiagnoses.doctor)
  myPatientsDiagnoses: DiagnosisEntity[];




}
