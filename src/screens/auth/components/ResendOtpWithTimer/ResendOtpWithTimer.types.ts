type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

//Only the values between 0 and 11 can be used for the minutes in OTP timer. Decimal numbers like 1.5 cannot be used. Values greater than 10 or below than 0 also cannot be used.
export type OtpMinutes = IntRange<0, 11>;

//Only the values between 0 and 60 can be used for the seconds in OTP timer. Decimal numbers like 55.5 cannot be used. Values greater than 59 or below than 0 also cannot be used.
export type OtpSeconds = IntRange<0, 60>;

export interface ResendOtpWithTimerProps {
  testID?: string;
  initialMinutes?: OtpMinutes;
  initialSeconds?: OtpSeconds;
  onResend: () => Promise<void>;
}
