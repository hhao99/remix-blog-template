import { Link, Outlet, useLoaderData } from "@remix-run/react"
import db from '~/utils/db.server'

import Button , { Button_small }from "~/components/button"
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
                        <li  key={post.id} className='flex justify-between'>
                            <Link to={`/posts/${post.id}`}>{post.title}</Link>
                            <Button_small className='btn-sm'>
                                <Link  to={`/posts/${post.id}/edit`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                    <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                                </svg>
                                </Link>
                            </Button_small>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            <div className='divider divider-horizontal'>OR</div>
            <div className='w-3/4 mx-auto p-4'>                
                <Outlet />
                <div className='absolute bottom-8 right-8'>
                        <Button>
                            <Link to='/posts/new'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                                </svg>
                            </Link>
                        </Button>
                        

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