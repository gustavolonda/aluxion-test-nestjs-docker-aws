import { Injectable, Logger } from "@nestjs/common";
import { Repository, UpdateResult } from "typeorm";
import { ICrudService } from "./icrud-service.interface";

export abstract class AbstraCrudService<T,ID> implements ICrudService<T,ID>{
    
    constructor(public repo:  Repository<T>) {
        this.repo = repo;
    }
    
    async getById(id: ID): Promise<T> {
        const active = true;
        return await this.findOneByParameters({id:id , active:active});
    }
    async update(entity: T): Promise<T> {
        return await this.repo.save(entity);
    }
    async updateById(entityNew: T, id: ID): Promise<T> {
        return await this.getById(id).then(async e =>{
            var entityResult =  this.entityUpdate(entityNew, e);
            return await this.update(entityResult);
        });
}
    async delete(id: ID): Promise<boolean> {
       return await this.getById(id).then(async e =>{
                    var entity =  this.entityDelete(e);
                    return await this.update(entity).then(e => {return true;})
                                                        .catch(e => {return false;});
                }).catch(e => {return false;});
    }
    async getAll() {
        const active = true;
        return await this.findByParameters({active:active}).then(e => e).catch(
            err =>{
                Logger.error(err.message);
                return err;
            }
        );
    }

    async findOneByParameters(parameters) {
        return await this.repo.findOne({
            select: this.getSelectedParameters(),
            where: parameters,
            relations:this.getRelations()
        });
    }

    async findByParameters(parameters) {
        return await this.repo.find({
            select: this.getSelectedParameters(),
            where: parameters,
            relations:this.getRelations()
           
        }).then(e => e).catch(
            err =>{
                Logger.error(err.message);
                return err;
            }
        );
    }

    async save(entity: T): Promise<T> {
        return await this.repo.save(entity).then(e => e).catch(err => {
            Logger.error(err.message);
            return err;
        });
    }

    abstract getSelectedParameters():any;
    abstract entityDelete(entity: T): T;
    abstract entityUpdate(entityNew: T, entityOld: T): T;
    abstract getRelations():any;

 
}
