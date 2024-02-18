import { Form, useLoaderData, redirect } from "@remix-run/react"
import db from '~/utils/db.server'


export async function loader({params}) {
    const id = parseInt(params.id)
    const post = await db.post.findUnique({ where: { id }}) 
    const user = await db.user.findUnique({ where: {id: post.userId }})
    return { user, post }
}

export default function IndexPage( ) {
    const { user, post} = useLoaderData<typeof loader>()

    return (
        <div>
            <h1>Edit Post</h1>
            <hr />
            <Form method='post'>
                <input hidden name='id' defaultValue={post.id} />
                <div>
                    <label>Author: {user.first} {user.last}</label>   
                </div>
                <div>
                    <label  htmlFor='title'>Post Title:
                        <input 
                        className='border-1 focus:text-xl'
                        type='text' name='title'
                        defaultValue={post.title}
                        ></input>
                    </label>
                </div>
                <div>
                    <label htmlFor='content'>Content:
                       <textarea name='content'
                       className='w-full flex-1 rounded-md border-2 border-blue-600 px-3 py-2 leading-6'
                        cols={60} rows={20} />


                    </label>
                </div>
                <div className='grid grid-cols-3'>
                    <div></div>
                    <div></div>
                    <div className='grid grid-cols-2 gap-4'>
                        <button>save</button>
                        <button>cancel</button>
                    </div>
                </div>

            </Form>
        </div>
    )
}

export async function action({request}) {
    const formData = await request.formData()
    const post = Object.fromEntries(formData)
    console.dir(post, {depth: null})
    await db.post.update({
        where: { id: parseInt(post.id) },
        data: {
            title: post.title,
            content: post.content
        }
    })
    return redirect('/posts/')
}