// chat.service.ts
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MessageEntity } from "./message.entity";
import { UserEntity } from "../user/user.entity";
import { DiagnosisEntity } from "../diagnosis/diagnosis.entity";
import { toMessageDto } from "../shared/mapper";
import { MessageDto } from "./message.dto";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(DiagnosisEntity)
    private readonly diagnosisRepository: Repository<DiagnosisEntity>
  ) {
  }

  async createMessage(authorId: number, content: string, diagnosisId: number): Promise<MessageEntity> {
    const author = await this.userRepository.findOne({
      where: { id: authorId }
    });
    const diagnosis = await this.diagnosisRepository.findOne({
      where: { id: diagnosisId }
    });

    if (!author || !diagnosis) {
      throw new HttpException("Author or diagnosis not found", HttpStatus.NOT_FOUND);
    }

    const message = this.messageRepository.create({
      content: content,
      author: author,
      diagnosis: diagnosis,
      createdAt: new Date()
    });

    return this.messageRepository.save(message);
  }

  async getMessagesByDiagnosisId(diagnosisId: number): Promise<MessageDto[]> {
    const messages = await this.messageRepository.find({
      where: { diagnosis: { id: diagnosisId } },
      relations: ["author"]
    });
    return messages.map(message => toMessageDto(message));
  }
}
