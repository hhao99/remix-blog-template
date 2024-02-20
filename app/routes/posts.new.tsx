import { 
    Form, 
    useLoaderData, 
    useNavigate,
    redirect } from "@remix-run/react"
import db from '~/utils/db.server'
import { requireUserId } from "~/utils/session.server"
import Button from '~/components/button'
export async function loader({request}:{ Request}) {
    const userId = await requireUserId(request)
    if(!userId) redirect('/login')  
    const user = await db.user.findUnique({ where: { id: parseInt(userId) }})
    return { user }
}

export default function IndexPage( ) {
    const { user } = useLoaderData()
    const { navigate } = useNavigate()
    return (
        <div>
            <h1>New Post</h1>
            <hr />
            <Form method='post'>
                <input hidden name='userId' value={user.id} />
                <div>
                    <h3>Author: {user.first} {user.last}</h3>
                </div>
                <div>
                    <label>Post Title:
                        <input 
                        className='border-1 focus:text-xl'
                        type='text' name='title'
                        defaultValue=''
                        ></input>
                    </label>
                </div>
                <div>
                    <label>Content:
                        <textarea name='content' 
                        className='w-full flex-1 rounded-md border-2 border-blue-600 px-3 py-2 leading-6'
                        cols={60} rows={12}></textarea>
                    </label>
                </div>
                <div className='flex justify-end '>
                        <Button type='submit'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fill-rule="evenodd" d="M5.478 5.559A1.5 1.5 0 0 1 6.912 4.5H9A.75.75 0 0 0 9 3H6.912a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H15a.75.75 0 0 0 0 1.5h2.088a1.5 1.5 0 0 1 1.434 1.059l2.213 7.191H17.89a3 3 0 0 0-2.684 1.658l-.256.513a1.5 1.5 0 0 1-1.342.829h-3.218a1.5 1.5 0 0 1-1.342-.83l-.256-.512a3 3 0 0 0-2.684-1.658H3.265l2.213-7.191Z" clip-rule="evenodd" />
                                <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v6.44l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l1.72 1.72V3a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                            </svg>
                        </Button>
                        <Button type='button' onClick={()=> navigate(-1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>
                        </Button>          
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