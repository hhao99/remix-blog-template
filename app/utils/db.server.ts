import { PrismaClient } from '@prisma/client'
import { singleton } from './singleton.server'

let db: PrismaClient

if(process.env.NODE_ENV === 'production') {
    db = new PrismaClient()
}
else {
    db = singleton("prisma", ()=> new PrismaClient() )
}

export default db