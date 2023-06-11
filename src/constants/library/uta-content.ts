export const UTAInfo = [
  {
    headerTitle: 'How To Use The App',
    content: {
      description: `Now that you know why our app stands out from the crowd and why our user experience is designed the way it is, it's time to learn how to set up, record, and analyze your videos.
        \nBut first, keep this in mind as you are learning how to use the SwingZen app system:
        \nIt doesn’t matter if it is a $20,000 launch monitor or an in-app swing analyzer system like ours, understanding how to properly use the system will help provide the best results. The SwingZen app is designed to help you through the process with our new In-App-Capture technology, but again knowledge is power!
        \nBefore you record your first swing video, follow these tips to make sure the environment you are recording will assist in getting the best feedback.`,
    },
  },
  {
    headerTitle: 'Shooting Environments',
    content: {
      description: `Our AI programming requires the system to be able to identify and differentiate a golfer, club, and ball from the surrounding environment.
        \nUsually, the driving range or course provides the least amount of background distractions and usually has better lighting conditions than indoors.
        \nYou can have good results outdoors and not be at a course or driving range. The only thing that is necessary is to minimize the amount of clutter in the background and shoot in good lighting conditions.\n\n`,
      points: [
        {
          title: 'Ideal Outdoor Shooting',
          body: `\nAn example of an ideal shooting condition outdoors would be in a wide-open green space with nothing behind the golfer, ideally with no other people or balls in the shot. That being said, in life few things are ideal, so the system is trained to ignore the distant background.\n\n`,
        },
        {
          title: 'Ideal Indoor Shooting',
          body: `\nYou can similarly shoot indoors, but a major problem with indoor environments can be the lack of space to shoot the proper distance from the ball. Not having the proper distance from the ball cuts off the range of motion of a full swing, which means our system cannot pick up those frames when the ball and club leave the perimeters of the camera shot.`,
        },
      ],
    },
  },
  {
    headerTitle: 'Shooting Hacks',
    content: {
      description: `Vibrant colors also can help with indoor (and even outdoor) shooting.
      \nWe have provided a “hack” that can help improve the results by training the system to recognize bright fluorescent colors on the clubhead and ball.
      \nIf you use vibrant tape on the clubhead and a vibrant colored ball you can get better results in marginal conditions, such as bad lighting. In most situations this isn’t necessary.`,
    },
  },
  {
    headerTitle: 'Uploading A Video',
    content: {
      description: `Choose either “Down the Line” or “Face on”. Keep in mind that if you choose a video that isn’t shot in the correct perspective the system will not deliver any results. Example: If you select Down the Line, but the video you upload is Face On, there will be no data feedback on that upload.
      \nNext, if you’re left-handed, use the selector to indicate that you are left-handed. If you are right-handed the toggle defaults already.
      \nSelect what type of club you are using.
      \n4a. Auto In App Capture Method - The easiest way to upload a video because it is designed to prevent many shooting errors. Click on the big arrow to start the process.
      \n4b. Manual method - If you choose to upload a video from your phone library you must make sure it is trimmed prior to uploading. It must be trimmed right before backswing and just after. Most phone camera systems have a method of editing and trimming a video. Also the fps camera setting must be on 240fps for FO and 120 or 240 fps for DTL.`,
    },
  },
  {
    headerTitle: 'Video Processing Time',
    content: {
      description: `Note that if you don’t have either a wifi connection or a good cell phone reception, the video upload will be delayed. The system will keep the video in memory until you get a good data connection. It will automatically upload the video to the analyzer at that point.
      \nThe analyzer usually takes about 1- 2 minutes to deliver the analytic results back to your app. This can vary based on your upload speed and the load on servers.`,
    },
  },
  {
    headerTitle: 'Successful Reviews',
    content: {
      description: `Did your video come back as successfully reviewed?
      \nFrom the Home Page of the app, you can select the dark green button toward the bottom of the screen that says “Video Uploads.”
      \nEach successful review will show a green overlay, indicating that our system has properly analyzed the video and has feedback for you to review.
      \nSimply tap on the center of the video, and it will take you to the video’s swing feedback report.`,
    },
  },
  {
    headerTitle: 'Failed Reviews',
    withIndex: true,
    content: {
      description: `What does the orange triangle with an exclamation mark and/or orange overlay on a video mean?
      \nThis color code indicates that a video failed to review properly.
      \nHere is a list of all the reasons why a video could have failed to review.\n`,
      points: [
        {
          title: 'Multiple Persons Detected in the Frame:',
          body: 'Were other golfers or bystanders in the background? Rerecord without anyone in the fore or background but the golfer that needs their swing analyzed.',
        },
        {
          title: 'Multiple Balls and/or Club Heads Detected:',
          body: 'Were there other balls in the shot or clubs laying around in the shot? Our system is sensitive and will try to pick up other balls or clubs for analysis. Rerecord without other balls or clubs laying around in the shot.',
        },
        {
          title: 'No Ball and/or Club Head Detected:',
          body: 'It is also possible that no club or ball was detected. This could be due to lighting conditions that our system isn’t able to pick up either the ball or club. Refer to our Lighting Hack for the best results!',
        },
        {
          title: 'Video Shot is Too Long (manual mode):',
          body: 'Is the video that you submitted too long? If you’re recording yourself and you’ve submitted a video that includes you walking to and from the camera and ball, our system could have kicked it back for being too long. Please refer to our Trim Tip for the best results.',
        },
        {
          title: 'Video Shot in Wrong Speed(manual mode):',
          body: 'Did you forget to change your phone settings? Remember, the success of our app relies on all videos being recorded on your phone in ultra slo-mo. Refer to the Setting Up Your Phone Settings for instructions on how to change your settings.',
        },
        {
          title: 'Shot too Close or Too Far (manual mode):',
          body: 'You also could have gotten a failed review because your camera was too close or too far away from the ball when recording your swing. Refer to Shooting Setup for the best results.',
        },
      ],
    },
  },
  {
    headerTitle: 'Swing Analysis Results',
    withIndex: true,
    content: {
      description: `The key components of your swing analysis are:\n`,
      points: [
        {
          title: 'Visual reference on video playback',
          body: 'These are static and dynamic tracking lines that provide helpful reference frame-by-frame. From clubhead tracking to spine angle static/dynamic lines, these show how you are moving throughout the swing. See Down the Line and Face On visual reference for more information.',
        },
        {
          title: 'Swing Data',
          body: 'SwingZen is the only system that delivers accurate measurements of club speed/ball speed in the world with only the use of your phone. There’s been extensive testing comparing our data to doppler systems with minimal variation.',
        },
        {
          title: 'AI Pro Analysis (available with paid subscription)',
          body: 'Our AI analysis system has been designed by experienced PGA qualified professionals to break down the swing into multiple segments. Each checkpoint determines a specific frame in the swing that is relevant to that checkpoint and compares to the standard set by our instruction pros. If your position is good then great! If not, you will then have the information through Pro tips, Pro vs you, PGA instruction videos, and drills to correct that specific swing fault.',
        },
        {
          title: 'AI-Enhanced Pro Lessons',
          body: 'Our concept at SwingZen is not to replace the Pro instructor. Quite the opposite. We want to partner with PGA/LPGA pro instructors to provide a complete offering of tools to help you improve your game. Our goal is to provide a system that will allow the Pro to be able to teach through the app. They will then have all of the data and feedback that you have at your fingertips and much more.',
        },
      ],
    },
  },
  {
    headerTitle: 'Swing Data',
    content: {
      description: `Face On perspective is where you will receive swing data such as swing speed, ball speed, smash factor and launch angle.
      \nSmash factor is a formula that combines ball speed and swing speed. This calculation shows the effectiveness of your ball impact. The higher ball speed compared to swing speed, the higher the smash factor.1.5 is the goal.`,
    },
  },
  {
    headerTitle: 'Swing Priority List',
    content: {
      description: `SwingZen’s concept of AI Pro instruction is to provide a similar process of instruction that any PGA/LPGA Pro would utilize.
      \nThe first step in building a quality swing is to start with your setup. Setup is your swing foundation. Once you get that right you can build off of it. Your AI Pro swing results are listed in priority starting with setup and progressing through the swing. Before you focus on the next thing, master the first priority item and then move on to the next.`,
    },
  },
  {
    headerTitle: 'Pass/Fail',
    content: {
      description: `SwingZen scores pass/fail and help you track your progress.
      \nIf you fail a certain checkpoint, you can progress to view the instructions on how to improve that portion of the swing. If your position is good, then great! If not, you will then have the information through AI Pro Tips, Pro vs you, PGA instruction videos, and drills to correct that specific swing fault.`,
    },
  },
  {
    headerTitle: 'AI-Pro Tips',
    content: {
      description: '',
      points: [
        {
          title: 'AI Pro Analysis (available with paid subscription)',
          body: `\nOur AI analysis system has been designed by experienced PGA qualified professionals to break down the swing into multiple segments. Each checkpoint determines a specific frame in the swing that is relevant to that checkpoint and compares it to the standard set by our Instruction Pros. If your position is good, then great! If not, you will then have the information through AI Pro Tips, Pro vs You, PGA instruction videos, and drills to correct that specific swing fault.\n\n`,
        },
        {
          title: 'AI-Pro Tip Video Instructions',
          body: `\nThere’s an extensive library of video tutorials that go into all aspects of the game from the mental game, putting, and short game.
          \nCheck it out to improve your scores on the course.\n\n`,
        },
        {
          title: 'AI-Pro Tip Comparison - You versus Pro',
          body: `\nIt is great to be able to see what a correct position would look like.
          \nSwingZen delivers a comparison screenshot of what a pro’s position looks like at that particular point in the swing.`,
        },
      ],
    },
  },
  {
    headerTitle: 'Swing Analysis Report',
    content: {
      description: `Keep up with your progress by reviewing a snapshot of your swing results this month as compared to last month.
      \nToggle through month-by-month to see how your scores improve over time, and identify areas of your swing that could be improved.`,
    },
  },
];
