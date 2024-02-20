import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction,
} from '@remix-run/node'

import { json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useSearchParams } from '@remix-run/react'
import { useEffect, useRef } from 'react'

export  async  function loader({request}: LoaderFunctionArgs) {
    return json({})
}
export async function action({request}:ActionFunctionArgs) {
    const formData = await request.formData()
    const user = Object.fromEntries(formData)
    
}

export default function RegisterPage() {
    return (
        <div>
            <h1>Register Page</h1>
        </div>
    )
}