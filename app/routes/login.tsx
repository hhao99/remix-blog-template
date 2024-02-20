import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
} from '@remix-run/node'


import { json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import { createUserSession } from '~/utils/session.server'

import db from '~/utils/db.server'

export  async  function loader({request}: LoaderFunctionArgs) {
    return json({})
}
export async function action({request}:ActionFunctionArgs) {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

    const validateEmail = (email: string) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email)
    }
    if(!validateEmail(email)) {
        return json(
            {errors: { email: "email is invalidate", password: null}}, 
            { status: 400}
        )
    }
    if( typeof password !== 'string' || password.length === 0) {
        return json(
            { error: { email: null, password: 'password length must >=8'} },
            {status: 400}
        )
    }
    if( password.length < 8 ) {
        return json({
            errors: { email: null, password: "password is too short."}},
            {status: 400}
        )
    }


    const user = await db.user.findUnique({where: { email }})
    if( !user || password !== 'xwlt.1972.') {
        throw new Response("Login Failed", { status: 401})
    }
   
    
    return createUserSession({
        
        request,
        userId: user.id,
        redirectTo: '/posts'
    })
}

export default function LoginPage() {
    const actionData = useActionData()
    const emailRef = useRef()
    const passwordRef = useRef()

    useEffect(()=> {},[actionData])
    return (
        <div className='flex min-h-full flex-col justify-center'>
            <div className='mx-auto w-full max-w-md px-8'>
                <h1>Login Page</h1>
                <Form method='post' className='space-y-6'>
                    <div>
                        <label htmlFor='email' 
                        className='block text-sm font-medium text-gray-700'>
                            Email Address:
                        </label>
                        <div className='mt-1'>
                            <input ref={emailRef}
                            id='email' name='email' type='email'
                            autoComplete='email'
                            autoFocus={true}
                            className='w-full rounded border border-gray-500 px-1 py-1 text-lg'>
                            </input>
                        </div>
                        {actionData?.errors.email ? (
                            <div className='pt-1 text-red-700'>
                                {actionData.errors.email}
                            </div>
                        ): null}
                    </div>
                    <div>
                        <label htmlFor='password'
                            className='block text-sm font-medium text-gray-700'>Password</label>
                        <div className='mt-1'>
                            <input id='password' ref={passwordRef} name='password'
                                type='password' autoComplete='current-password'
                                className='w-full rounded border border-gray-500 px-2 py-1 text-lg' />
                        </div>
                        {actionData?.errors.password ? (
                            <div className='pt-1 text-red-700'>
                                {actionData.errors.password}
                            </div>
                        ): null}
                    </div>
                    <button type='submit'
                        className='w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 foucs:bg-blue-400'
                    >Login</button>
                </Form>
            </div>          
        </div>
    )
}