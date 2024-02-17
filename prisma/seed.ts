import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
   const eric = await prisma.user.upsert({
    where: { email: 'hhao99@g.cn'},
    update: {},
    create: {
        email: 'hhao99@g.cn',
        first: 'Eric',
        last: 'Hao',
        posts: {
            create: {
                title: "first post",
                content:"# This is the first post \n welcome to **post**"
            }
        }
    }
   })
   const alice = await prisma.user.upsert({
    where: { email: 'alice@g.cn'},
    update: {},
    create: {
        email: 'alice@g.cn',
        first: "Alice",
        last: 'Gao',
        posts: {
            create: {
                title: 'alice posts',
                content:"# This is the first post \n welcome to **post**"
            }
        }
    }
   })
}

await seed()