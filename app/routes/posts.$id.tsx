import { Form, Link, useLoaderData, redirect } from "@remix-run/react"
import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import db from '~/utils/db.server'
import Button from '~/components/button'
export async function loader({params}) {
    invariant(params.id, "expected params.id")
    const post = await db.post.findUnique({
        where: { id: parseInt(params.id) }
    })
    if(!post) {
        throw new Response('Post Not Found!', { status: 404})
    }
    return json({post})
}

export async function action({request}) {
    const formData = await request.formData()
    const id = parseInt(formData.get('id'))
    await db.post.delete({where: { id }})
    return redirect('/posts')
}

export default function IndexPage( ) {
    const { post } = useLoaderData<typeof loader>()
    return (
        <div>
            <div className='w-full grid grid-cols-8'>
            <h1 className='col-span-7 text-3xl text-center capitalize'>{post.title}</h1>
            <div className=''>
                
                
            </div>           
            </div>           
            <hr />
            <div>
                <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
            </div>
            <div className='divider'></div>
            <div className='flex-1 text-right'>
                <Form method='post'>
                    <input hidden name='id' defaultValue={post.id}></input>
                    <Button type='submit'>Delete</Button>
                </Form>
                
            </div>
            
            
        </div>
    )
}