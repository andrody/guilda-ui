const check = require('../auxiliary/Validator').check
const catcher = require('../auxiliary/Decorators').catcher
const Utils = require('../auxiliary/Utils')

class SubscriptionController {
    constructor(sequelize) {
        this.sequelize = sequelize
        this.Subscriptions = sequelize.getModel('Subscriptions')
    }

    /*
     * Get Subscriptions
     */
    @catcher
    async get(user, next) {
        const subscriptions = await this.Subscriptions.findAll({
            where: {
                IDUser: user.ID,
            },
            order: [
                ['Created', 'DESC'],
            ],
            raw: true,
        })

        return next(null, 'Get subscriptions', subscriptions)
    }

    /*
     * Create Subscription
     */
    @catcher
    async create(user, model, next) {
        const subscription = await this.Subscriptions.create({
            ...model,
            IDUser: user.ID,
            Created: new Date(),
        })
        subscription.save()

        return next(null, 'Suscripción creado', subscription)
    }

    /*
     * Update Subscription
     */
    @catcher
    async update(ID, model, next) {
        const subscription = await this.Subscriptions.findOne({ where: { ID } })
        await subscription.update({
            ...model,
        })

        return next(null, 'Suscripción actualizado', subscription)
    }

    /*
     * Delete Subscription
     */
    @catcher
    async delete(ID, next) {
        check(ID, 'You need to pass the subscription ID').required()
        await this.Subscriptions.destroy({ where: { ID } })
        return next(null, 'Suscripción ' + ID + ' borrado')
    }
}

module.exports = SubscriptionController
