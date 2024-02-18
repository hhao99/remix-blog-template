import { Link, Outlet, useLoaderData } from "@remix-run/react"
import db from '~/utils/db.server'

import Button from "~/components/button"
export async function loader() {
    const users = await db.user.findMany()
    const posts = await db.post.findMany()
    return { users, posts }
}

export default function IndexPage( ) {
    const { users, posts } = useLoaderData()
    return (
        <div className='flex flex-col m-6 mb-2'>
           <div className='w-full'>
            <h1 className='ml-6'>My Persona blog</h1>
           </div>
           <div className='flex flex-cols'>
           
            <div className='w-1/4 h-screen bg-gray-600 m-4 p-4'>
                <h3>Post List</h3>
                <div className='divider'></div>
                <div>
                    <ul>
                    {posts.map( post=> (
                        <li  key={post.id}>
                            <Link to={`/posts/${post.id}`}>{post.title}</Link>
                            <Button><Link  to={`/posts/${post.id}/edit`}>edit</Link></Button>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            <div className='divider divider-horizontal'>OR</div>
            <div className='w-3/4 mx-auto p-4'>                
                <Outlet />
                <div className='absolute bottom-8 right-8'>
                        <Button><Link to='/posts/new'>New Post</Link></Button>
                </div>
            
           </div>

            </div>
            
           <footer className='footer p-10 bg-neutral text-neutral-content'>
            <nav>
                <h6 className='foot-title'>About My Company</h6>
                <a className='link link-hover' href="https://www.bjjysrps.com"> Ruipu Software</a>
            </nav>
            <nav>
            <h6 className='foot-title'>My Profile</h6>
            <a className='link link-hover' href="https://linkedin.com/in/haojijiu">Linkedin</a>
            </nav>
            <nav>
            <h6 className='foot-title'>Github</h6>
            <a className='link link-hover' href="https://github.com/hhao99">My github page</a>
            </nav>
           </footer>
        </div>
    )
}