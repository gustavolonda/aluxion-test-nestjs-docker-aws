import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Builder } from 'builder-pattern';
import { AbstraCrudService } from 'src/common/domain/service/abstra-crud-service';
import { enumToArray } from 'src/common/util/enum-util';
import { FileParameters } from 'src/file/infreestructure/entity/file-parameters';
import { FileEntity } from 'src/file/infreestructure/entity/file.entity';
import { Repository } from 'typeorm';
import { FileDto } from '../data/file-dto';
import { v4 as uuid } from 'uuid';
import { UserEntity } from 'src/user/infreestructure/entity/user.entity';
@Injectable()
export class FileService extends AbstraCrudService<FileEntity,number> {

    constructor ( @InjectRepository(FileEntity)
                private   readonly repository: Repository<FileEntity>,
                @InjectMapper() private readonly classMapper: Mapper ,
    ){
        super(repository);
    }


    getSelectedParameters() {
        return enumToArray(FileParameters);
    }
    entityDelete(entity: FileEntity): FileEntity {
        return Builder(entity).active(false)
                            .build();
    }
    entityUpdate(entityNew: FileEntity, entityOld: FileEntity): FileEntity {
        return Builder(entityOld).name(entityNew.name)
                                .type(entityNew.type)
                                .build();
    }
    getRelations() {
        return {user:true};
    }
    async fileSave(id:number, file: Express.Multer.File) : Promise< FileDto>{
        const nameImageAWS: string = uuid();
        var fileEntity = await this.getById(id);
        fileEntity.awsId = nameImageAWS;
        //Subir image amazon falta

        fileEntity = await this.update(fileEntity);

        return this.toFileDto(fileEntity);


    }

    async fileDatoSave(fileDto: FileDto) : Promise< FileDto>{
        const nameImageAWS: string = uuid();
        var fileEntity = this.toFileEntity(fileDto);
        fileEntity = await this.save(fileEntity);
        return this.toFileDto(fileEntity);


    }

    async fileDatoUpdate(id:number, fileDto: FileDto) : Promise< FileDto>{
        const nameImageAWS: string = uuid();
        var fileEntity = this.toFileEntity(fileDto);
        fileEntity = await this.updateById(fileEntity, id);
        return this.toFileDto(fileEntity);


    }
    async fileUpdate(id:number, fileDto:FileDto, file: Express.Multer.File) : Promise< FileDto>{
        const nameImageAWS: string = uuid();
        fileDto.name = file.originalname;
        fileDto.type = file.mimetype;
        var fileEntity = this.toFileEntity(fileDto);
        fileEntity = await this.updateById(fileEntity,id);
        return this.toFileDto(fileEntity);


    }


    toFileEntity(dto: FileDto): FileEntity {  
        return this.classMapper.map(dto, FileDto,FileEntity);

    } 

    toFileDto(entity : FileEntity): FileDto{
        return this.classMapper.map(entity,FileEntity,FileDto);

    }

    toFileDtoList(entityList : FileEntity[]): FileDto[]{
        return entityList.map( e => {return this. toFileDto(e)});

    }

}


