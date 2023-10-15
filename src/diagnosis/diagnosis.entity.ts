import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { TreatmentEntity } from "../treatment/treatment.entity";

@Entity()
export class DiagnosisEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: true})
  diagnosisDate: Date;

  @Column({ type: 'json' })
  symptoms: string[];

  @Column({ type: 'text', nullable: true })
  diagnosisResponse: string;

  @Column({ type: 'boolean', default: false })
  diagnosisValidated: boolean;

  @ManyToOne(() => UserEntity, (patient) => patient.myDiagnoses)
  patient: UserEntity;

  @ManyToOne(() => UserEntity, (doctor) => doctor.myPatientsDiagnoses)
  doctor: UserEntity;

  @ManyToMany(() => TreatmentEntity, (treatment) => treatment.diagnoses)
  treatments: TreatmentEntity[];
}
