import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { DiagnosisEntity } from "../diagnosis/diagnosis.entity";

@Entity()
export class TreatmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false
  })
  name: string;

  @ManyToMany(() => DiagnosisEntity, (diagnosis) => diagnosis.treatments)
  @JoinTable({ name: 'treatment_diagnosis' })
  diagnoses: DiagnosisEntity[];
}
