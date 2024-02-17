import { Link, useLoaderData } from "@remix-run/react"
import Markdown from 'react-markdown'
import db from '~/utils/db.server'
export async function loader({params}) {
    const post = await db.post.findUnique({
        where: { id: parseInt(params.id) }
    })
    return { 
        post
    }
}

export default function IndexPage( ) {
    const { post } = useLoaderData()
    return (
        <div>
            <div className='w-full grid grid-cols-3'>
            <h1 className='col-span-2 text-3xl text-center border-2 border-red-400'>{post.title}</h1>
            <div className='text-lg grid grid-col-2 gap-4'>
                <Link to={`/posts/${post.id}/edit`}>edit</Link>
                <Link to={`/posts/${post.id}/delete`}>delete</Link>
            </div>
            
            </div>
            
            <hr />
            <div>
                <Markdown>{post.content}</Markdown>
            </div>
            <hr />
            
        </div>
    )
}