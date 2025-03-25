import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { userSchema } from '@/db/schema';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    // Validation (Basic)
    if (!username || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await db.query.userSchema.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.insert(userSchema).values({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
