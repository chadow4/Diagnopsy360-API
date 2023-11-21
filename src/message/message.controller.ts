import { Controller, Get, Param } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageDto } from "./message.dto";
import { ApiTags, ApiParam, ApiResponse, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

@ApiTags("Messages")
@Controller("messages")
@ApiBearerAuth()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get("/:diagnosisId")
  @ApiOperation({ summary: 'Get messages by diagnosis ID', operationId: 'getMessagesByDiagnosisId' })
  @ApiParam({ name: 'diagnosisId', description: 'ID of the diagnosis to fetch messages for' })
  @ApiResponse({ status: 200, description: 'Returns messages for the specified diagnosis.', type: [MessageDto] })
  async getMessagesByDiagnosisId(
    @Param("diagnosisId") diagnosisId: number
  ): Promise<MessageDto[]> {
    try {
      return await this.messageService.getMessagesByDiagnosisId(diagnosisId);
    } catch (error) {
      throw error;
    }
  }
}
