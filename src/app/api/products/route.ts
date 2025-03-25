import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { productSchema } from '@/db/schema';

// GET: Fetch all products
export async function GET() {
  try {
    const products = await db.select().from(productSchema);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST: Add a new product
export async function POST(req: NextRequest) {
  try {
    const { title, description, price } = await req.json();

    if (!title || !description || !price) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await db.insert(productSchema).values({
      title,
      description,
      price,
    });

    return NextResponse.json({ message: 'Product added successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
  }
}
