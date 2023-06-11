// crear una clase base para los servicios get, getById, create, update, delete y que hereden de esta clase
class BaseService {
    constructor(model) {
        this.model = model;
    }
    async get() {
        try {
            console.log(this.model);
            const entities = await this.model.findAll();
            return {
                count: entities.length,
                entities
            };
        }
        catch (err) {
            throw err;
        }
    }
    async getById(id) {
        try {
            const entity = await this.model.findByPk(id);
            return {
                entity
            };
        }
        catch (err) {
            throw err;
        }
    }
    async create(data) {
        try {
            const entity = await this.model.create(data);
            return {
                created: true,
                data: entity
            };
        }
        catch (err) {
            throw err;
        }
    }
    async update(id, data) {
        try {
            const entity = await this.model.update(data, {
                where: {
                    id
                }
            });
            return {
                updated: true,
                data: entity
            };
        }
        catch (err) {
            throw err;
        }
    }
    async delete(id) {
        try {
            const entity = await this.model.findByPk(id);
            if (entity) {
                entity.deleted = true;
                await entity.save();
            }
            return {
                deleted: true,
                data: entity
            };
        }
        catch (err) {
            throw err;
        }
    }

    async findAllByField(field, value) {
        try {
            const entities = await this.model.findAll({ where: { [field]: value } });
            return {
                count: entities.length,
                entities
            };
        }
        catch (err) {
            throw err;
        }
    }

    async findOneByField(field, value) {
        try {
            const entity = await this.model.findOne({ where: { [field]: value } });
            return {
                entity
            };
        }
        catch (err) {
            throw err;
        }
    }

    async findAllByFields(fields) {
        try {
            const entities = await this.model.findAll({ where: fields });
            return {
                count: entities.length,
                entities
            };
        }
        catch (err) {
            throw err;
        }
    }

    async findOneByFields(fields) {
        try {
            const entity = await this.model.findOne({ where: fields });
            return {
                entity
            };
        }
        catch (err) {
            throw err;
        }
    }

    async findAllByFieldsAndExclude(fields, exclude) {
        try {
            const entities = await this.model.findAll({ where: fields, exclude });
            return {
                count: entities.length,
                entities
            };
        }
        catch (err) {
            throw err;
        }
    }
       
    async findOneByFieldsAndExclude(fields, exclude) {
        try {
            const entity = await this.model.findOne({ where: fields, exclude });
            return {
                entity
            };
        }
        catch (err) {
            throw err;
        }
    }

    async findAllByFieldsAndExcludeAndInclude(fields, exclude, include) {
        try {
            const entities = await this.model.findAll({ where: fields, exclude, include });
            return {
                count: entities.length,
                entities
            };
        }
        catch (err) {
            throw err;
        }
    }

    async drop() { //esta funcion hace un drop de la tabla osea la borra
        try {
            await this.model.drop();
            return {
                dropped: true
            };
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = BaseService;
