import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userSchema } from '@/db/schema';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const user = await db.query.userSchema.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Future: JWT Session or NextAuth here!
    return NextResponse.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
