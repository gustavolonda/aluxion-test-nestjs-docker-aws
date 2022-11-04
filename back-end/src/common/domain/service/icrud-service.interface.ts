export interface ICrudService <T,ID> {
    getAll():Promise<T[]>;
    getById(id:ID):Promise<T>;
    getByCondition(options):Promise<T>;
    save(entity:T) : Promise<T>;
    update(entity:T) : Promise<T>;
    delete(entity:T) : Promise<boolean>;
}