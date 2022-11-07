import { Body, Controller, Get, Logger, Param, Patch, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileDto } from 'src/file/domian/data/file-dto';
import { FileUploadDto } from 'src/file/domian/data/file-upload-dto';
import { FileService } from 'src/file/domian/service/file.service';
import { FileEntity } from 'src/file/infreestructure/entity/file.entity';

@ApiTags('File')
@Controller('file')
export class FileController {
    constructor(private fileService: FileService){
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Return a list of file'})
    getAll(@Res() response){
        this.fileService.getAll().then(
            list => {
                response.json(this.fileService.toFileDtoList(list));
        }).catch(error =>{
            Logger.error(error.message);
            response.json(error);
        })
    }

    @Get(":id")
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Should be an id of a file that exists in the database',
        type: Number
      })
      @ApiResponse({
        status: 200,
        description: 'A file has been successfully fetched',
        type: FileDto
      })
      @ApiResponse({
        status: 404,
        description: 'A File with given id does not exist.'
      })
    getById(@Param() { id }, @Res() response){
        this.fileService.getById(Number(id)).then(
            f => {
                response.json(this.fileService.toFileDto(f));
        })
    }
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @ApiBody({schema: {
        type: 'object',
        properties: {
          comment: { type: 'string' },
          outletId: { type: 'integer' },
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      }})
      @ApiParam({
        name: 'id',
        required: true,
        description: 'Should be an id of a file that exists in the database',
        type: Number
      })
    @Patch(":id")
    saveFile( @Param() { id } , @UploadedFile() file: Express.Multer.File, @Body() fileDto: FileDto, @Res() response){
        this.fileService.fileSave(Number(id),file).then(r => {
            response.json(r);
        })

    }

    @Post()
    @ApiBody({ type: FileDto })
    fileDatasave( @Body() fileDto: FileDto, @Res() response){
        this.fileService.fileDatoSave(fileDto).then(r => {
            response.json(r);
        })

    }


    @ApiBody({ type: FileDto })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Should be an id of a file that exists in the database',
        type: Number
      })
    @Put(":id")
    update(@Param() { id },@Body() fileDto: FileDto, @Res() response){
        this.fileService.fileDatoUpdate(id,fileDto).then(r => {
            response.json(r);
        })

    }
}
