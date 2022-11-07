import { UploadedFile } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { FileDto } from "./file-dto";

export class FileUploadDto {
    @ApiProperty({ required: false })
    @IsString()
    comment?: string

    @ApiProperty({ type: 'string', format: 'number', required: false })
    @IsNumber()
    outletId?: number
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    file: Express.Multer.File;

    @ApiProperty()
    fileDto: FileDto;

}
