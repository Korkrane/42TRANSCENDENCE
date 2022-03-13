import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-42';

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy, '42') {
    constructor(private readonly configService: ConfigService) {
        super({
            //clientID: configService.get<string>('FORTYTWO_CLIENT_ID'),
            //clientSecret: configService.get<string>('FORTYTWO_CLIENT_SECRET'),
            clientID: process.env.FORTYTWO_CLIENT_ID,
            clientSecret: process.env.FORTYTWO_CLIENT_SECRET,
            //callbackURL: '/login/42/return',
            callbackURL: '/api/42auth/redirect',
            passReqToCallback: true,
        });
    }

    async validate(
        request: { session: { accessToken: string } },
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        cb: VerifyCallback,
    ): Promise<any> {
        request.session.accessToken = accessToken;
        console.log('accessToken', accessToken, 'refreshToken', refreshToken);

        console.log('login:' + profile.username + ' email:' + profile.email);

        const { username } = profile;
        const user = {
            username: username,
            email: profile['emails'][0]['value'],
            password: username,
            login42: username
        }

        console.log('login:' + user.username + ' email:' + user.email);

        // In this example, the user's 42 profile is supplied as the user
        // record.  In a production-quality application, the 42 profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return cb(null, profile);
    }
}