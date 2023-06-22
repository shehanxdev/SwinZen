import { VideoType } from '../main/common.enum';
import { Checkpoint, SubCheckpoint } from './analysis.enum';

export const ProTipsInfo = {
  [VideoType.DOWNTHELINE]: {
    [Checkpoint.SETUP]: {
      [SubCheckpoint.BACK_KNEE_ANGLE]:
        'Back knee is bent too much. Try straightening your legs a bit more but not too much.',
      [SubCheckpoint.WRIST_ANGLE]:
        'Pointing at the ball. You need more wrist angle at address to gain power and consistency.',
      [SubCheckpoint.POSTURE]:
        'Posture is wrong. Bend at the waist with a little knee bend for best results. Let your arms hang down to address the ball.',
    },
    [Checkpoint.BACKSWING]: {
      [SubCheckpoint.SWING_PLANE_STEEP]:
        'Club shaft is too steep at ½ backswing. Butt of club should be pointing at or inside the target line.',
      [SubCheckpoint.SWING_PLANE_SHALLOW]:
        'Club shaft is too shallow at 12 backswing. Butt of club should be pointing at or inside the target line.',
      [SubCheckpoint.STABLE_BACK_KNEE]:
        'Bending your back knee too much during backswing. Keep stable for more consistent ball striking.',
      [SubCheckpoint.STABLE_SPINE]:
        'Spine angle is changing too much during backswing. Keep stable for more consistent ball striking.',
      [SubCheckpoint.SHOULDER_TILT]:
        'Shoulder turn is too steep. Rotate your back shoulder lower in backswing to prevent outside-in club path and too high attack angle.',
    },
    [Checkpoint.DOWNSWING]: {
      [SubCheckpoint.SWING_PLANE_STEEP]:
        'Club shaft is too steep at ½ downswing. Butt of club should be pointing at or inside the target line.',
      [SubCheckpoint.SWING_PLANE_SHALLOW]:
        'Club shaft is too shallow at 12 downswing. Butt of club should be pointing at or inside the target line.',
      [SubCheckpoint.CLUB_PATH]:
        'Club path is outside-in. This creates a fade or possibly a slice. Inside-out club path with square face will deliver straight to draw ball flight.',
      [SubCheckpoint.STABLE_SPINE]:
        'Spine angle is changing too much during downswing. Keep stable for more consistent ball striking.',
    },
  },
  [VideoType.FACEON]: {
    [Checkpoint.SETUP]: {
      [SubCheckpoint.HIP_CENTERED_BACK]: 'Hips are set too far back in setup. Center hips between feet in setup.',
      [SubCheckpoint.HIP_CENTERED_FORWARD]: 'Hips are set too far forward in setup. Center hips between feet in setup.',
      [SubCheckpoint.SPINE_TILT_VERTICAL]: 'Spine tilt is too vertical in setup. Lean away from target a bit more.',
      [SubCheckpoint.SPINE_TILT_EXTREME]:
        'Spine tilt is too extreme in setup. Straighten up a bit more in setup but not too much.',
      [SubCheckpoint.SHOULDER_TILT]:
        'Shoulder tilt is too flat. Bring your lead shoulder up a bit more at address position.',
    },
    [Checkpoint.BACKSWING]: {
      [SubCheckpoint.TAKEAWAY]:
        "Wrist is hinging too early in backswing. Start turn by rotating shoulders to initiate backswing and don't bend back elbow until the club is horizontal with ground.",
      [SubCheckpoint.LEAD_ARM_BEND]:
        "Lead arm elbow is bending too much in backswing. Lead arm doesn't have to stay perfectly straight but too much bend will cause inconsistency and loss of power.",
      [SubCheckpoint.HIP_AWAY]: 'Hips are swaying in backswing. Hips should rotate without too much sway.',
      [SubCheckpoint.HEAD_VERTICAL]: "Head position is rising in backswing. Don't stand up in backswing.",
      [SubCheckpoint.HEAD_LATERAL]:
        "Head position is moving toward target in backswing. Don't lean toward target in backswing.",
      [SubCheckpoint.FULL_BACKSWING]:
        "Club Shaft is rotating too far down in backswing. Don't drop the club shaft past horizontal with ground in backswing.",
    },
    [Checkpoint.DOWNSWING]: {
      [SubCheckpoint.CLUB_LAG_EARLY]: `Club lag is being released too early. Hold lag angle longer. You're "casting" the club which causes loss of power and inconsistency.`,
      [SubCheckpoint.CLUB_LAG_LATE]:
        'Club lag is being released too late. Release lag angle sooner. Only a pro can typically strike the ball with consistency with a late lag angle release.',
      [SubCheckpoint.HEAD_VERTICAL]: "Head position is rising in downswing. Don't stand up in downswing.",
      [SubCheckpoint.HEAD_LATERAL]:
        "Head position is moving toward target in downswing. Don't lean toward target in downswing.",
      [SubCheckpoint.HEIGHT_TRANSFER]:
        "As you move through downswing don't hang back on the back leg, transfer your weight to front foot.",
    },
  },
};
