import { Link, Outlet, useLoaderData } from "@remix-run/react"
import db from '~/utils/db.server'
export async function loader() {
    const users = await db.user.findMany()
    const posts = await db.post.findMany()
    return { users, posts }
}

export default function IndexPage( ) {
    const { users, posts } = useLoaderData()
    return (
        <div className='flex flex-col m-6 mb-2'>
           <div className='w-full text-center'>
            <h1>Post Page</h1>
           </div>
           <div className='flex flex-cols'>
           
            <div className='w-1/5 h-screen bg-blue-200'>
                <h3>Post List</h3>
                <hr />
                <div>
                    <ul>
                    {posts.map( post=> (
                        <li  key={post.id}>
                            <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        </li>
                    ))}
                    </ul>
                </div>
                <div className='mt-6'>
                    <button><Link to='/posts/new'>New Post</Link></button>
                </div>
            </div>
            <div className='w-4/5 h-screen'>
                
                <Outlet />
            </div>
           </div>
           <footer className='absolute bottom-4 w-full text-center'>
            <h3>&copy; You!</h3>
           </footer>
        </div>
    )
}