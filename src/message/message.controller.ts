// chat.controller.ts
import { Controller, Get, Param } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageDto } from "./message.dto";

@Controller("messages")
export class MessageController {
  constructor(private readonly messageService: MessageService) {
  }

  @Get("/:diagnosisId")
  async getMessagesByDiagnosisId(
    @Param("diagnosisId") diagnosisId: number
  ): Promise<MessageDto[]> {
    try {
      console.log("diagnosisId", diagnosisId);
      return await this.messageService.getMessagesByDiagnosisId(diagnosisId);
    } catch (error) {
      throw error;
    }
  }
}
