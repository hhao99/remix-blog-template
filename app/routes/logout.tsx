import type {
    ActionFunctionArgs,
    LoaderFunctionArgs,
} from '@remix-run/node'

import { redirect } from '@remix-run/node'
import { logout } from '~/utils/session.server'

export  async  function loader({request}: LoaderFunctionArgs) {
    return redirect('/')
}
export async function action({request}:ActionFunctionArgs) {
    logout(request)
}
