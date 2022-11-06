export interface ICrudService <T,ID> {
    getAll():Promise<T[]>;
    getById(id:ID):Promise<T>;
    findOneByParameters(parameters):Promise<T>;
    findByParameters(parameters):Promise<T[]>;
    save(entity:T) : Promise<T>;
    updateById(entity:T, id: ID) : Promise<T>;
    update(entity:T) : Promise<T>;
    delete(id: ID) : Promise<boolean>;
}