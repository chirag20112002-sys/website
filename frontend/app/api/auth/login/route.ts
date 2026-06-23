import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'

const ADMIN_EMAIL = 'admin@airxsolution.com'
const ADMIN_PASSWORD = 'admin123'
const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'airx-admin-secret-2025')

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await new SignJWT({ email, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(secret)

    return NextResponse.json({ token, user: { email, role: 'admin', name: 'Admin User' } })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
