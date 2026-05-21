import { NextRequest } from "next/server";
import { isClient } from "./common";

export const parseCookie = <T extends Record<string, string>>(str?: string) => {
    if (!str) return {} as T;
    return str.split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            const key = decodeURIComponent(v[0]?.trim() || '');
            acc[key] = decodeURIComponent(v[1]?.trim() || '');
            return acc;
        }, {} as any) as Partial<T> || {};
}

interface CookieSetOptions {
    /**
     * { number } - relative max age of the cookie from when the client receives it (seconds)
     */
    maxAge?: number;
    /**
     * { Date } - absolute expiration date for the cookie
     * 
     * { number } - relative max age of the cookie from when the client receives it (days)
     */
    expires?: Date | number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax';
}

export const setCookie = (name: string, value: string, options: CookieSetOptions = {}) => {
    const { maxAge, expires, path, domain, secure, sameSite } = options;
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (maxAge) {
        cookie += `; Max-Age=${maxAge}`;
    }

    if (expires) {
        if (typeof expires === 'number') {
            const date = new Date();
            date.setDate(date.getDate() + expires);
            cookie += `; Expires=${date.toUTCString()}`;
        } else {
            cookie += `; Expires=${expires.toUTCString()}`;
        }
    }

    if (path) {
        cookie += `; Path=${path}`;
    }

    if (domain) {
        cookie += `; Domain=${domain}`;
    }

    if (secure) {
        cookie += `; Secure`;
    }

    if (sameSite) {
        cookie += `; SameSite=${sameSite}`;
    }

    document.cookie = cookie;
}

export const removeCookie = (name: string, options: CookieSetOptions = {}) => {
    const { path, domain, secure, sameSite } = options;
    let cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

    if (path) {
        cookie += `; Path=${path}`;
    }

    if (domain) {
        cookie += `; Domain=${domain}`;
    }

    if (secure) {
        cookie += `; Secure`;
    }

    if (sameSite) {
        cookie += `; SameSite=${sameSite}`;
    }

    document.cookie = cookie;
}


export const getClientCookie = (name: string) => {
    // 判断不同端，使用不同方式拿 cookie
    if (isClient()) {
        return getCookie(document.cookie, name);
    }
}


export const getCookie = (cookies: string, name: string) => {
    return parseCookie(cookies)[name];
}