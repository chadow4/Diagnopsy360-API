import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { DiagnosisEntity } from "./diagnosis.entity";
import { ResponseDiagnosisDto, SendSymtomsDiagnosisDto } from "./diagnosis.dto";
import { toDiagnosisDto } from "../shared/mapper";
import { Role } from "../auth/interface/role.enum";
import { TreatmentEntity } from "../treatment/treatment.entity";

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(DiagnosisEntity)
    private readonly diagnosisRepository: Repository<DiagnosisEntity>,
    @InjectRepository(TreatmentEntity)
    private readonly treatmentRepository: Repository<TreatmentEntity>
  ) {
  }

  async sendSymptomsDiagnosis(sendSymptomsDiagnosisDto: SendSymtomsDiagnosisDto, userId: number) {
    if (!sendSymptomsDiagnosisDto.symptoms) {
      throw new HttpException("Symptoms are required", HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: []
    });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const diagnosis = this.diagnosisRepository.create({
      patient: user,
      symptoms: sendSymptomsDiagnosisDto.symptoms
    });
    try {
      await this.diagnosisRepository.save(diagnosis);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }

  }

  async selectDoctorDiagnosis(diagnosisId, doctorId) {
    const doctor = await this.usersRepository.findOne({
      where: { id: doctorId },
      relations: []
    });

    if (!doctor) {
      throw new HttpException("Doctor not found", HttpStatus.NOT_FOUND);
    }

    const diagnosis = await this.diagnosisRepository.findOne({
      where: { id: diagnosisId },
      relations: ["doctor"]
    });

    if (!diagnosis) {
      throw new HttpException("Diagnosis not found", HttpStatus.NOT_FOUND);
    }

    if (diagnosis.doctor) {
      throw new HttpException("Diagnosis already selected", HttpStatus.BAD_REQUEST);
    }
    diagnosis.doctor = doctor;

    try {
      await this.diagnosisRepository.save(diagnosis);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createResponseDiagnosis(responseDiagnosisDto: ResponseDiagnosisDto, doctorId, diagnosisId) {

    if (!responseDiagnosisDto.diagnosisResponse || !responseDiagnosisDto.treatmentIds) {
      throw new HttpException("Diagnosis responses and treatment required", HttpStatus.BAD_REQUEST);
    }
    const diagnosis = await this.diagnosisRepository.findOne({
      where: { id: diagnosisId },
      relations: ["doctor"]
    });

    if (!diagnosis) {
      throw new HttpException("Diagnosis not found", HttpStatus.NOT_FOUND);
    }

    if (diagnosis.doctor.id != doctorId) {
      throw new HttpException("You are not the doctor of this diagnosis", HttpStatus.BAD_REQUEST);
    }

    diagnosis.diagnosisResponse = responseDiagnosisDto.diagnosisResponse;
    diagnosis.diagnosisValidated = true;
    diagnosis.diagnosisDate = new Date();
    diagnosis.treatments = await this.treatmentRepository.find({
      where: {
        id: In(responseDiagnosisDto.treatmentIds)
      }
    });

    try {
      await this.diagnosisRepository.save(diagnosis);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getDiagnosisNotValidated() {
    const diagnosis = await this.diagnosisRepository.find({
      where: { diagnosisValidated: false, doctor: null },
      relations: ["patient"]
    });
    return diagnosis.map(diagnosis => toDiagnosisDto(diagnosis));
  }

  async getDiagnosisById(diagnosisId, sessionId, role) {
    const diagnosis = await this.diagnosisRepository.findOne({
      where: { id: diagnosisId },
      relations: ["patient", "doctor","treatments"]
    });
    if (sessionId != diagnosis.patient.id && role != Role.Doctor) {
      throw new HttpException("You don't have access to this diagnosis", HttpStatus.BAD_REQUEST);
    }

    return toDiagnosisDto(diagnosis);
  }

  async getAllDiagnosis() {
    const diagnosis = await this.diagnosisRepository.find();
    return diagnosis.map(diagnosis => toDiagnosisDto(diagnosis));
  }

  async selectMyPatientDiagnosis(doctorId: number) {
    const doctor = await this.usersRepository.findOne({
      where: { id: doctorId },
      relations: []
    });

    if (!doctor) {
      throw new HttpException("Doctor not found", HttpStatus.NOT_FOUND);
    }

    const doctorDiagnoses = await this.diagnosisRepository.find({
      where: { doctor: { id: doctorId } },
      relations: ["patient"] // Si vous voulez charger d'autres relations, ajoutez-les ici
    });

    if (!doctorDiagnoses || doctorDiagnoses.length === 0) {
      throw new HttpException("No diagnosis found for this doctor", HttpStatus.NOT_FOUND);
    }
    console.log(doctorDiagnoses.map(doctorDiagnoses => toDiagnosisDto(doctorDiagnoses)));
    return doctorDiagnoses.map(doctorDiagnoses => toDiagnosisDto(doctorDiagnoses));
  }

  async isPatientDiagnosticed(patientId: number) {
    const patientDiagnosis = await this.diagnosisRepository.find({
      where: { patient: { id: patientId } },
      relations: ["patient"] // Si vous voulez charger d'autres relations, ajoutez-les ici
    });
    return patientDiagnosis && patientDiagnosis.length > 0;

  }

}

