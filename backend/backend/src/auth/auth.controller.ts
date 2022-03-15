import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Response } from 'express';

import JwtAuthenticationGuard from 'src/auth/guard/jwt-authentication.guard';
import RequestWithUser from 'src/auth/interface/requestWithUser.interface';
import { LocalAuthenticationGuard } from 'src/auth/guard/localauth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import RegisterDto from 'src/auth/dto/register.dto';
import LogInDto from 'src/auth/dto/logIn.dto';

@ApiTags('Auth')
@ApiExtraModels(LogInDto) //force the dto to appear on Swagger
@Controller('api/auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthService,
        private readonly userService: UserService
    ) { }

    @ApiOperation({ summary: 'register new user' })
    @ApiOkResponse({ description: 'Your registration suceed' })
    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        console.log('went by register in auth controller');
        return this.authenticationService.register(registrationData);
    }

    @ApiOperation({ summary: 'log in user' })
    @ApiOkResponse({ description: 'You logged in' })
    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    //async logIn(@Body() loginDto: LogInDto, @Req() request: RequestWithUser, @Res() response: Response) { //loginDto not used but mandatory to let know that params needs to be sent
    async logIn(@Body() loginDto: LogInDto, @Req() request: RequestWithUser) { //loginDto not used but mandatory to let know that params needs to be sent
        /*
        console.log('went by login in auth controller');
        const { user } = request;
        const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        this.userService.updateStatus(user.login, "Online");
        return response.send(user);
        */
        const { user } = request;
        const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(user.id);
        /*
         const {
          cookie: refreshTokenCookie,
          token: refreshToken
        } = this.authenticationService.getCookieWithJwtRefreshToken(user.id);

        await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
         */
        request.res.setHeader('Set-Cookie', accessTokenCookie);
        console.log('end of login');
        if (user.isTwoFactorAuthenticationEnabled) {
            return;
        }

        return user;
    }

    @ApiOperation({ summary: 'log out user' })
    @ApiOkResponse({ description: 'You logged out' })
    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    async logOut(@Res() response: Response) {
        console.log('went by logout in auth controller');
        response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        console.log('END OF LOGOUT');
        return response.sendStatus(200);
    }

    @UseGuards(JwtAuthenticationGuard)
    @ApiOperation({ summary: 'Check user session via cookie' })
    @ApiOkResponse({ description: 'Valid session returning user data' })
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        console.log('went by authenticate in auth controller');
        const user = request.user;
        user.password = undefined;
        this.userService.updateStatus(user.login, "Online");
        return user;
    }
}