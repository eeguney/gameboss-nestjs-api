import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import GOOGLE_SETTINGS from './GoogleSettings';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private authService: AuthService) {
        super(GOOGLE_SETTINGS);
    }
    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
    ) {
        const user = await this.authService.validateUser({
            email: profile.emails[0].value,
            displayName: profile.displayName,
        });
        return user || null;
    }
}
