const check = require('../auxiliary/Validator').check
const catcher = require('../auxiliary/Decorators').catcher
const Utils = require('../auxiliary/Utils')

class CategoryController {
    constructor(sequelize) {
        this.sequelize = sequelize
        this.Categories = sequelize.getModel('Categories')
        this.Updates = sequelize.getModel('Updates')
    }

    /*
     * Get Categories
     */
    @catcher
    async get(query, next) {
        const categories = await this.Categories.findAll({ where: { ...query } })
        const updates = await this.Updates.findAll({ raw: true })
        return next(null, 'Get Categories', { categories, lastUpdated: updates[0] })
    }

    /*
     * Get Updated
     */
    @catcher
    async getLastUpdate(next) {
        const updates = await this.Updates.findAll()
        return next(null, 'Updates', updates[0])
    }

    /*
     * Update Updates
     */
    @catcher
    async createUpdated() {
        const updates = await this.Updates.findAll()
        if (!updates || updates.length === 0) {
            const update = this.Updates.create({ Updated: new Date() })
            update.save()
        } else {
            updates[0].update({ Updated: new Date() })
        }
        return
    }

    /*
     * Create Category
     */
    @catcher
    async create(category, next) {
        const newCategory = await this.Categories.create({
            ...category,
            Created: new Date(),
        })
        newCategory.save()
        await this.createUpdated()

        // Se tem categoria pai o pai deve ter HasSub 1
        if (newCategory.ParentCategory > 0) {
            const parent = await this.Categories.findOne({ where: { ID: newCategory.ParentCategory } })
            if (!parent.HasSub) {
                await parent.update({
                    HasSub: true,
                })
            }
        }

        return next(null, 'Categoria criada', newCategory)
    }

    /*
     * Update Category
     */
    @catcher
    async update(ID, model, next) {
        const category = await this.Categories.findOne({ where: { ID } })
        const oldParent = category.ParentCategory
        check(category, 'Category not found').required()
        check(model, 'Nothing to update').required()

        const updatedCategory = await category.update(model)
        await this.createUpdated()

        // Se tem categoria pai o pai deve ter HasSub 1
        if (updatedCategory.ParentCategory > 0) {
            const parent = await this.Categories.findOne({ where: { ID: updatedCategory.ParentCategory } })
            if (!parent.HasSub) {
                await parent.update({
                    HasSub: true,
                })
            }
        }

        // Se pai mudou, verifica se pai antigo ainda tem filhos, se nao tiver seta HasSub para falso
        if (model.ParentCategory != oldParent) {
            const filhos = await this.Categories.findAll({ where: { ParentCategory: oldParent } })
            if (filhos.length === 0) {
                const parent = await this.Categories.findOne({ where: { ID: oldParent } })
                await parent.update({
                    HasSub: false,
                })
            }
        }

        return next(null, 'Categoria atualizada', updatedCategory)
    }

    /*
     * Delete Category
     */
    @catcher
    async delete(ID, next) {
        check(ID, 'You need to pass an ID').required()
        await this.createUpdated()
        await this.Categories.destroy({ where: { ID } })
        return next(null, 'Você deletou a categoria de id: ' + ID)
    }
}

module.exports = CategoryController
