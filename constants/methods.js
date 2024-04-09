export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

export const SSG = { cache: 'force-cache' };
export const SSR = { cache: 'no-store' };
export const ISR = { next: { revalidate: 60 } };
