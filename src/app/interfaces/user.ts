// import { IgnoreExtraProperties } from 'firebase/firestore'
// @IgnoreExtraProperties
export class User{
    email: string;
    name: string;
    uid?: string;
    // confirmPassword?: string
    address?: {
        street?: string;
        city?: string;
        state?: string;
        // country?: string; // not that simple, countries have ISO code
    }
}
/*
export class UserDocument extends User{
}*/