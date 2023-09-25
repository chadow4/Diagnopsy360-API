import { ApiProperty } from '@nestjs/swagger';

export class LoginStatus {
  @ApiProperty({ description: 'Access token for authentication' })
  accessToken: any;

  @ApiProperty({ description: 'Expiration time of the access token' })
  expiresIn: any;
}
