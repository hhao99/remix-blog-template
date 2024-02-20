import { createCookieSessionStorage, redirect} from '@remix-run/node'
import invariant from 'tiny-invariant'
import db from './db.server'
invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set')

export const sessionStorage = createCookieSessionStorage({
    cookies: {
        name: "__session",
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: [process.env.SESSION_SECRET],
        secure: process.env.NODE_ENV === 'production'
    }
})

const USER_SESSION_KEY='userId'

export async function getSession(request:Request) {
    const cookie = request.headers.get("Cookie")
    return sessionStorage.getSession(cookie)
}

export async function getUserId(request: Request): Promise<string|undefined> {
    const session = await getSession(request)
    const userId = session.get(USER_SESSION_KEY)
    return userId;
}
export async function getUser(request: Request) {
    const userId = await getUserId(request)
    if( userId === undefined ) return null;
    const user = await db.user.findUnique({where: { id: userId }});
    if(user) return user;
    throw await logout(request);
}

export async function requireUserId(request: Request) {
    const userId = await getUserId(request)
    if(!userId) {
        throw redirect('/login')
    }
    return userId
}

export async function requireUser(request: Request) {
    const userId = await requireUserId(request)
    const user = await db.user.findUnique({where: {id: userId}})
    if(!user) {
        throw await logout(request)
    }
    return user
}

export async function createUserSession( {request, userId, redirectTo} : { Request, int, string}) {
    const session = await getSession(request)
    session.set(USER_SESSION_KEY, userId)
    return redirect(redirectTo, {
        headers: { 
            "Set-Cookie": await sessionStorage.commitSession(session)
        }
    })
}

export async function logout(request: Request) {
    const session = await getSession(request)
    return redirect('/', {
        headers: {
            "Set-Cookie": await sessionStorage.destroySession(session)
        }
    })
}