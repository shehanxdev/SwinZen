import React, { useEffect, useMemo, useState } from 'react';

import { Link } from '@sz/components';
import { DEFAULT_OTP_RESEND_TIMER_MINUTES, DEFAULT_OTP_RESEND_TIMER_SECONDS } from '@sz/constants';

import { OtpMinutes, OtpSeconds, ResendOtpWithTimerProps } from './ResendOtpWithTimer.types';

export function ResendOtpWithTimer({
  testID = 'ResendOtpWithTimerTestID',
  onResend,
  initialMinutes = DEFAULT_OTP_RESEND_TIMER_MINUTES,
  initialSeconds = DEFAULT_OTP_RESEND_TIMER_SECONDS,
}: ResendOtpWithTimerProps) {
  const [minutes, setMinutes] = useState<OtpMinutes>(initialMinutes);
  const [seconds, setSeconds] = useState<OtpSeconds>(initialSeconds);

  useEffect(() => {
    let otpInterval = setInterval(() => {
      //Reduce value of seconds by 1 during each second if current remaining seconds is greater than 0
      if (seconds > 0) {
        setSeconds((seconds - 1) as OtpMinutes);
      }

      //Case when the remaining timer does not have any seconds left
      if (seconds === 0) {
        //Case when the remaining timer does not have any seconds and mintues left
        if (minutes === 0) {
          clearInterval(otpInterval);
        } else {
          //Reduce value of minute by 1 and set remaing seconds to 59 during each 60 seconds when the remaining timer does not have any seconds left but has some mintues left
          setMinutes((minutes - 1) as OtpMinutes);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(otpInterval);
    };
  }, [seconds, minutes]);

  const linkText = useMemo(() => {
    if (minutes === 0 && seconds === 0) return 'Resend the code';
    return `Resend again in ${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [minutes, seconds]);

  const resetTimers = () => {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  return (
    <Link
      testID={testID}
      text={linkText}
      onPress={() => {
        onResend();
        resetTimers();
      }}
      disabled={!(minutes === 0 && seconds === 0)}
    />
  );
}
