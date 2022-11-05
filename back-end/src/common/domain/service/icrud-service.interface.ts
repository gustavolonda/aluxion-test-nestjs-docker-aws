export interface ICrudService <T,ID> {
    getAll():Promise<T[]>;
    getById(id:ID):Promise<T>;
    getByParameters(parameters):Promise<T>;
    save(entity:T) : Promise<T>;
    update(entity:T) : Promise<T>;
    delete(id: ID) : Promise<boolean>;
}