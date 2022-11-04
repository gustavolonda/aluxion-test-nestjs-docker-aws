import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ICrudService } from "./icrud-service.interface";

export abstract class AbstraCrudService<T,ID> implements ICrudService<T,ID>{
    
    constructor(public repo:  Repository<T>) {
        this.repo = repo;
    }
    async getById(id: ID): Promise<T> {
        console.log(id);
        return this.getByCondition({id});
    }
    async update(entity: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
    async delete(entity: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async getAll() {
        return await this.repo.find();
    }

    async getByCondition(condition) {
        return await this.repo.findOne({
            select: this.getSelectedParameters(),
            where: condition,
        });
    }
    
    async save(entity: T): Promise<T> {
        return await this.repo.create(entity);
    }

    abstract getSelectedParameters():any;
 
}
