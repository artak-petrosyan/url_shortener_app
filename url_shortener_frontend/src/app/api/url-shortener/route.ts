"use server";
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

const urlShortenerSchema = z.object({
  originalUrl: z.url({ message: "URL is required and must be a valid URL" }),
})

export async function POST(
  req: NextRequest
) {
  try {
    const reqData = await req.json();
    console.log('!!!' + JSON.stringify(reqData));
    const formData = urlShortenerSchema.safeParse(reqData);
    console.log('---- After Zod ' + formData.success + '   ' + JSON.stringify(formData.error?.message));
    if (!formData.success) {
      const { issues } = formData.error;
      let errMessage = '';
      issues.forEach(issue =>  {
        errMessage += issue.message + ' '; 
      });
      console.log('----  formattedErrors '  + errMessage);
      return NextResponse.json({ error: errMessage }, {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const backendHost =  process.env.BACKEND_HOST;
    const response = await fetch(`${backendHost}/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqData),
    });

    const result = await response.json();
    return NextResponse.json(result
      , {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Invalid Request' }, { status: 400 });
  }
}
