import { Form, useLoaderData, redirect } from "@remix-run/react"
import db from '~/utils/db.server'
export async function loader({params}) {
    const users = await db.user.findMany()  
    return { users }
}

export default function IndexPage( ) {
    const { users} = useLoaderData()
    return (
        <div>
            <h1>New Post</h1>
            <hr />
            <Form method='post'>
                <div>
                    <label>Author</label>
                    <select name='userId'>
                        {users && users.map( user => (
                            <option value={user.id}>
                                {user.first} {user.last}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Post Title:
                        <input 
                        className='border-1 focus:text-xl'
                        type='text' name='title'
                        defaultValue='new post'
                        ></input>
                    </label>
                </div>
                <div>
                    <label>Content:
                        <textarea name='content' cols={60} rows={8}>test content</textarea>
                    </label>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='grid-span-2'></div>
                    <div className='grid gap-1'>
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
    const _post = await db.post.create({
        data: {
            ...post,
            userId: parseInt(post.userId)
        }
    })
    return redirect(`/posts/${_post.id}/edit`)
}