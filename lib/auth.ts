import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins"
import { resend } from "./resend";

 
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    socialProviders: {
        github: {
            clientId: env.AUTH_GITHUB_CLIENT_ID,
            clientSecret: env.AUTH_GITHUB_SECRET,
        },
        google: {
            clientId: env.AUTH_GOOGLE_CLIENT_ID,
            clientSecret: env.AUTH_GOOGLE_SECRET,
        }
    },
    plugins: [
        emailOTP({
           async sendVerificationOTP({email, otp}) {
            // implement sending the email to the user
            const { data, error } = await resend.emails.send({
                from: 'IQ LMS <onboarding@resend.dev>',
                to: email,
                subject: 'IQ LMS - Verify your email',
                html: `<p>Your verification code is <strong> ${otp} </strong></p>`
              });
           }
        })
    ]
})