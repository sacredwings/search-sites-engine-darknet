// @ts-nocheck
import { DB } from "../../../social-framework/src"
import { Store } from "../../../social-framework/src"

export class CSite {

    //новая тема для обсуждений
    static async Add ( fields ) {
        try {
            if (fields.image_id)
                fields.image_id = new DB().ObjectID(fields.image_id)

            fields.create_date = new Date()

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('site')

            let result = await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({code: 6001000, msg: 'CSite Add'})
        }
    }

    //загрузка по id
    static async GetById ( ids ) {
        try {
            ids = new DB().ObjectID(ids)

            let arAggregate = []
            arAggregate.push({
                $match: {}
            })

            arAggregate.push({
                $sort: {
                    _id: 1
                }
            })
            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection(`post`)
            let result = await collection.aggregate(arAggregate).toArray()
            return result
        } catch (err) {
            console.log(err)
            throw ({code: 6002000, msg: 'CSite GetById'})
        }
    }

    //загрузка
    static async Get ( fields ) {
        try {
            if (fields.q) {
                fields.q = fields.q.replace(/ +/g, ' ').trim();
                fields.q = fields.q.replace("[^\\da-zA-Zа-яёА-ЯЁ ]", ' ').trim();
            }

            let arAggregate = []
            arAggregate.push({
                $match: {}
            })

            if (fields.q) arAggregate[0].$match.$text = {}
            if (fields.q) arAggregate[0].$match.$text.$search = fields.q

            if (fields.domain) arAggregate[0].$match.domain = fields.domain

            //сортировка, если поиска нет
            if (fields.q)
                arAggregate.push({
                    $sort: {
                        $score: {$meta:"textScore"}
                    }
                })
            else
                arAggregate.push({
                    $sort: {
                        _id: -1
                    }
                })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('site')
            let result = await collection.aggregate(arAggregate).skip(fields.offset).limit(fields.count).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({code: 6003000, msg: 'CSite Get'})
        }
    }

    //количество
    static async GetCount ( fields ) {
        try {
            if (fields.q) {
                fields.q = fields.q.replace(/ +/g, ' ').trim();
                fields.q = fields.q.replace("[^\\da-zA-Zа-яёА-ЯЁ ]", ' ').trim();
            }


            let arAggregate = []
            arAggregate.push({
                $match: {}
            })

            if (fields.q) arAggregate[0].$match.$text = {}
            if (fields.q) arAggregate[0].$match.$text.$search = fields.q

            if (fields.domain) arAggregate[0].$match.domain = fields.domain

            arAggregate.push({
                $count: 'count'
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('site')
            let result = await collection.aggregate(arAggregate).toArray()

            if (!result.length) return 0
            return result[0].count

        } catch (err) {
            console.log(err)
            throw ({code: 6004000, msg: 'CSite GetCount'})
        }
    }

    static async Count ( fields ) {
        try {
            let arAggregate = []
            arAggregate.push({
                $match: {}
            })

            if (fields.domain) arAggregate[0].$match.domain = fields.domain

            arAggregate.push({
                $count: 'count'
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('site');
            let result = await collection.aggregate(arAggregate).toArray()

            if (!result.length) return 0
            return result[0].count

        } catch (err) {
            console.log(err)
            throw ({code: 8001000, msg: 'CSite Count'})
        }
    }
}
