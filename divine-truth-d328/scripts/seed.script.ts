import * as schema from '../src/db/schema';
import { db, pool } from '../src/db/db'
import { seed } from 'drizzle-seed'

export const seedDb = async () => {
    await seed(db, schema).refine((funcs) => ({
        usersTable: {
            columns: {
                age: funcs.int({ minValue: 0, maxValue: 120 })
            },
            count: 10,
            with: {
                todosTable: 10
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