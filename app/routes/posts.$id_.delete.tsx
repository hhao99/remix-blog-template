import { Form, Link, useLoaderData, redirect } from "@remix-run/react"
import db  from '~/utils/db.server'
export async function loader({params}) {
    const id = parseInt(params.id)
    const post = await db.post.findUnique({where: { id }})
    return { post }
}

export default function IndexPage( ) {
    const { post } = useLoaderData<typeof loader>()
    return (
        <div>
            <h1>Delete Post</h1>
            <Form method='post'>
                <input hidden name='id' defaultValue={post.id} />
                <div className='card justify-center items-center'>
                    <h1 className='text-3xl text-red-600'>
                        Are you want to delete post: {post.title}
                    </h1>
                    <div className='grid grid-2 gap-4'>
                        <button type='submit'>Yes</button>
                        <button>Cancel</button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export async function action({params, request}) {
    const id = parseInt(params.id)
    console.log("deleting the post...")
    await db.post.delete({ where: { id}})
    return redirect('/posts')
}