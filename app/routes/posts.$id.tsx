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
                    <Button type='submit'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                    </svg>


                    </Button>
                </Form>
                
            </div>
            
            
        </div>
    )
}