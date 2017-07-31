import { ROLE_MEMBER, ROLE_ADMIN } from './constants';

// Set user info from request
export function setLocalUserInfo(request) {
    return {
        id: request.id,
        name: `${request.local.firstName} ${request.local.lastName}`,
        email: request.local.email,
        role: request.role
    };
}

// Set facebook user info from request
export function setFacebookInfo(request) {
    return {
        id      : request.id,
        token   : request.facebook.token,
        name    : request.facebook.name,
        email   : request.facebook.email,
        role    : request.role
    };
}

// Set twitter user info from request
export function setTwitterInfo(request) {
    return {
        id          : request.id,
        token       : request.twitter.token,
        username    : request.twitter.username,
        name        : request.twitter.displayName,
        role        : request.role
    };
}

// Set google user info from request
export function setGoogleInfo(request) {
    return {
        id      : request.id,
        token   : request.google.token,
        name    : request.google.name,
        email   : request.google.email,
        role    : request.role
    };
}

export function getRole(checkRole) {
    let role;

    switch (checkRole) {
        case ROLE_MEMBER: role = 1; break;
        case ROLE_ADMIN: role = 2; break;
        default: role = 1;
    }

    return role;
}