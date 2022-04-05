import { ApiProperty } from "@nestjs/swagger";

export class FileStorageRequest {
  @ApiProperty()
  parent_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  data: string;
}

export class FileStorageRequestUpdate {
  @ApiProperty()
  id: number;

  @ApiProperty()
  parent_id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  data: string;
}
