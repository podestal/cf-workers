import * as schema from '../src/db/schema';
import { db, pool } from '../src/db/db'
import { reset, seed } from 'drizzle-seed'

export const seedDb = async () => {
    await reset(db, schema)
    await seed(db, schema).refine((funcs) => ({
        usersTable: {
            columns: {
                age: funcs.int({ minValue: 0, maxValue: 120 })
            },
            count: 10,
            with: {
                todosTable: 10
            }
        },
        todosTable: {
            columns: {
                title: funcs.valuesFromArray({ 
                    values: [
                        'Buy groceries',
                        'Buy a new phone',
                        'Read a book',
                        'Watch a movie',
                        'Go for a walk',
                        'Do some exercise',
                        'Learn a new skill',
                        'Practice a new language',
                        'Learn a new skill',
                    ] 
                }),
                description: funcs.valuesFromArray({ 
                    values: [
                        'Buy groceries for the week',
                        'Buy a new phone for the latest model',
                        'Read a book on a new topic',
                        'Watch a movie on a new genre',
                        'Go for a walk in the park',
                        'Do some exercise to stay fit',
                        'Learn a new skill to improve my career',
                        'Practice a new language to communicate with people',
                    ] 
                })
            }
        }
    }))
}

seedDb().then(() => {
    console.log('Seed completed')
    return pool.end()
}).catch((error) => {
    console.error('Seed failed', error)
    return pool.end()
})