'use client'; // If using App Router and client-side functionality

import React, { useState, FormEvent } from 'react';
import Image from "next/image";
import CopyToClipboardButton from "./component/copy-to-clipboard";

interface FormData {
    originalUrl: string;
}

interface SubmissionResponse {
    shortUrl: string;
}

interface ErrorResponse {
    error: string;
}

export default function UrlShortenForm() {
    const [formData, setFormData] = useState<FormData>({
        originalUrl: '',
    });
    const [responseData, setResponseData] = useState<SubmissionResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [inputUrl, setInputUrl] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Example: Send data to an NextJs API endpoint
            const response = await fetch('/api/url-shortener', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errResp: ErrorResponse = await response.json();
                throw new Error(`${errResp.error}`);
            }

            const data: SubmissionResponse = await response.json();
            console.log('Short Url:', data.shortUrl);
            setResponseData(data);
            setInputUrl(formData.originalUrl);
            setSuccess(true);
            setFormData({ originalUrl: '' }); // Clear form
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <div className="inline-flex items-center gap-2">
                    <label htmlFor="url" className="inline-flex items-center gap-2">
                        <Image
                            className="dark:invert "
                            src="/globe.svg"
                            alt="Global URL"
                            width={20}
                            height={20}
                        /> URL:</label>
                    <input
                        type="text"
                        id="originalUrl"
                        name="originalUrl"
                        value={formData.originalUrl}
                        onChange={handleChange}
                        required
                        autoFocus
                        className='rounded-full  bg-white text-[#2183ca] field-sizing-content md:field-sizing-fixed md:w-120 md:h-6'
                    />
                    <button className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-[#2183ca] hover:bg-[#f4a427] dark:hover:bg-[#f4a427] hover:border-transparent font-medium text-sm sm:text-base h-6 sm:h-8 px-1 sm:px-2 w-full sm:w-auto md:w-[108px]" type="submit" disabled={isLoading}>
                        {isLoading ? 'Shortenning...' : 'Shorten >>>'}
                    </button>
                </div>
            </form>


            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && (
                <div>
                    <ol>
                        <div className="inline-flex items-start gap-2">
                            <p className='text-white font-bold align-top'>
                               Original URL:</p>
                            <p className='text-[#2183ca] w-120 max-w-120 font-thin align-top'>{inputUrl}</p>
                        </div>
                    </ol>
                    <ol>
                        <div className="inline-flex items-center gap-5">
                            <p className='text-[#2183ca] font-bold'>Short URL:</p>
                            <p className='text-[#f4a427]'><a href={responseData!.shortUrl} target="_blank">{responseData!.shortUrl}</a></p>
                            <CopyToClipboardButton textToCopy={responseData!.shortUrl} />
                        </div>
                    </ol>
                </div>
            )}
        </div>

    );
}