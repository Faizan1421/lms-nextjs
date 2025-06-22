import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
} from '@arcjet/next';
import { env } from './env';

export {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
};

export default arcjet({
  key: env.ARCJET_KEY,
  characteristics: ['fingerprint'],

  //Define base rules, can also be empty if you don't want to have any base rules
  // Rules are the conditions that must be met for the request to be allowed
  // Rules are applied in order, and the first rule that matches is used
  // Rules are applied to all requests, not just signups
  rules: [
    shield({
      mode: 'LIVE',
    }),
  ],
});
