import React from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  NativeModules,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { Link, Text } from '@sz/components';
import { tw } from '@sz/config';
import { TextVariant } from '@sz/constants';
import { NavigationService } from '@sz/services';

import { IMAGES } from '../../../assets/images';

export function PrivacyPolicyScreen() {
  const { StatusBarManager } = NativeModules;
  const customMargin = StatusBarManager.HEIGHT + 105; // providing top margin for absolute content

  return (
    <View testID="PrivacyPolicyScreenTestID" style={tw`flex-1`}>
      <ImageBackground style={tw`flex-1`} source={IMAGES.gradientBg}>
        <SafeAreaView>
          {/*TODO:: Remove this images and replace with SVG later*/}
          <View style={tw`flex-row items-center justify-between my-5`}>
            <TouchableOpacity onPress={() => NavigationService.goBack()}>
              <Image source={IMAGES.leftArrow} style={tw`m-2`} />
            </TouchableOpacity>
            <View style={tw`mr-7`}>
              <Text variant={TextVariant.SubTitle2SemiBold}>Privacy policy</Text>
            </View>
            <View />
          </View>
          <View style={tw`relative bg-white opacity-15 mx-3 mb-10 rounded-xl border border-neutral-700 h-5/6`} />
          <View style={tw`absolute mt-[${customMargin}px] mx-3 h-4.6/6`}>
            <ScrollView style={tw`mx-5 z-1`}>
              <Text variant={TextVariant.Body2Regular}>
                {`Introduction
            \n(“Sports Zoom LLC” or “We” or “Us”) respect your privacy and are committed to protecting it through our compliance with this policy. \nThis policy describes the types of information we may collect from you or that you may provide when you visit the website ( `}
                <Link text="SwingZen Website" onPress={() => Linking.openURL('https://swingzen.com')} />
                {` ) and our practices for collecting, using, maintaining, protecting, and disclosing that information.
            \nThis policy applies to information we collect: \nOn this Website. In email, text, and other electronic messages between you and this Website. Through mobile and desktop applications you download from this Website, which provide dedicated non-browser-based interaction between you and this Website. \nWhen you interact with our advertising and applications on third-party websites and services, if those applications or advertising include links to this policy.
            \nIt does not apply to information collected by: \nus offline or through any other means, including on any other website operated by Sports Zoom LLC or any third party including our affiliates and subsidiaries; or \nany third party including our affiliates and subsidiaries, including through any application or content including advertising that may link to or be accessible from or on the Website.
            \nPlease read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, your choice is not to use our Website. By accessing or using this Website, you agree to this privacy policy. This policy may change from time to time. Your continued use of this Website after we make changes is deemed to be acceptance of those changes, so please check the policy periodically for updates.
            \n \nChildren Under the Age of 13
            \nOur Website is not intended for children under 13 years of age. No one under age 13 may provide any [personal] information to or on the Website. We do not knowingly collect personal information from children under 13. If you are under 13, do not use or provide any information on this Website or on or through any of its features/register on the Website, make any purchases through the Website, use any of the interactive or public comment features of this Website or provide any information about yourself to us, including your name, address, telephone number, email address, or any screen name or user name you may use. If we learn we have collected or received personal information from a child under 13 without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 13, please contact us at.
            \n \nInformation We Collect About You and How We Collect It.
            \nWe collect several types of information from and about users of our Website, including information: by which you may be personally identified, such as name, postal address, e-mail address, telephone number, social security number, ANY OTHER INFORMATION THE WEBSITE COLLECTS THAT IS DEFINED AS PERSONAL OR PERSONALLY IDENTIFIABLE INFORMATION UNDER AN APPLICABLE LAW, or any other identifier by which you may be contacted online or offline “personal information”; that is about you but individually does not identify you; and/or about your internet connection, the equipment you use to access our Website and usage details. 
            \nWe collect this information: from you when you provide it to us. Automatically as you navigate through the site. Information collected automatically may include usage details, IP addresses, and information collected through cookies, web beacons, and other tracking technologies. From third parties, for example, our business partners. 
            \nInformation You Provide to Us. The information we collect on or through our Website may include: Information that you provide by filling in forms on our Website. This includes information provided at the time of registering to use our Website, subscribing to our service, posting material, or requesting further services. We may also ask you for information when you enter a contest or promotion sponsored by us, and when you report a problem with our Website. \nRecords and copies of your correspondence including email addresses, if you contact us. \nYour responses to surveys that we might ask you to complete for research purposes. Details of transactions you carry out through our Website and of the fulfillment of your orders. You may be required to provide financial information before placing an order through our Website. Your search queries on the Website.
            \nYou also may provide information to be published or displayed hereinafter, “posted“ on public areas of the Website, or transmitted to other users of the Website or third parties collectively, “User Contributions“. Your User Contributions are posted on and transmitted to others at your own risk. Although we limit access to certain pages/you may set certain privacy settings for such information by logging into your account profile], please be aware that no security measures are perfect or impenetrable. Additionally, we cannot control the actions of other users of the Website with whom you may choose to share your User Contributions. Therefore, we cannot and do not guarantee that your User Contributions will not be viewed by unauthorized persons. 
            \nInformation We Collect Through Automatic Data Collection Technologies. As you navigate through and interact with our Website, we may use automatic data collection technologies to collect certain information about your equipment, browsing actions, and patterns, including:
            \nDetails of your visits to our Website, including traffic data, location data, logs, and other communication data and the resources that you access and use on the Website.
            \nInformation about your computer and internet connection, including your IP address, operating system, and browser type.
            \nWe also may use these technologies to collect information about your online activities over time and across third-party websites or other online services behavioral tracking. Contact us at  for information on how you can opt out of behavioral tracking on this website and how we respond to web browser signals and other mechanisms that enable consumers to exercise choice about behavioral tracking.
            \nThe information we collect automatically [is statistical data and does not/may] include personal information, but/or we may maintain it or associate it with personal information we collect in other ways or receive from third parties. It helps us to improve our Website and to deliver a better and more personalized service, including by enabling us to: 
            \nEstimate our audience size and usage patterns. \nStore information about your preferences, allowing us to customize our Website according to your individual interests. \nSpeed up your searches. \nRecognize you when you return to our Website.
            \nThe technologies we use for this automatic data collection may include:
            \nCookies (or browser cookies). A cookie is a small file placed on the hard drive of your computer. You may refuse to accept browser cookies by activating the appropriate setting on your browser. However, if you select this setting you may be unable to access certain parts of our Website. Unless you have adjusted your browser setting so that it will refuse cookies, our system will issue cookies when you direct your browser to our Website.
            \nFlash Cookies. Certain features of our Website may use local stored objects (or Flash cookies) to collect and store information about your preferences and navigation to, from, and on our Website. Flash cookies are not managed by the same browser settings as are used for browser cookies. For information about managing your privacy and security settings for Flash cookies, contact us at .
            \nWeb Beacons. Pages of our the Website and our e-mails may contain small electronic files known as web beacons also referred to as clear gifs, pixel tags, and single-pixel gifs that permit Sports Zoom LLC, for example, to count users who have visited those pages or opened an email and for other related website statistics for example, recording the popularity of certain website content and verifying system and server integrity.
            \nWe do not collect personal information automatically, but we may tie this information to personal information about you that we collect from other sources or you provide to us.
            \n \nThird-Party Use of Cookies and Other Tracking Technologies
            \nSome content or applications, including advertisements, on the Website are served by third-parties, including advertisers, ad networks and servers, content providers, and application providers. These third parties may use cookies alone or in conjunction with web beacons or other tracking technologies to collect information about you when you use our website. The information they collect may be associated with your personal information or they may collect information, including personal information, about your online activities over time and across different websites and other online services. They may use this information to provide you with interest-based behavioral advertising or other targeted content.
            \nWe do not control these third parties’ tracking technologies or how they may be used. If you have any questions about an advertisement or other targeted content, you should contact the responsible provider directly. For information about how you can opt out of receiving targeted advertising from many providers, contact us at.
            \n \nHow We Use Your Information 
            \nWe use information that we collect about you or that you provide to us, including any personal information: 
            \nTo present our Website and its contents to you. \nTo provide you with information, products, or services that you request from us. \nTo fulfill any other purpose for which you provide it. \nTo provide you with notices about your account/subscription, including expiration and renewal notices. \nTo carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection. \nTo notify you about changes to our Website or any products or services we offer or provide though it. \nTo allow you to participate in interactive features on our Website. \nIn any other way we may describe when you provide the information. \nFor any other purpose with your consent.
            \nWe may also use your information to contact you about our own and third-parties’ goods and services that may be of interest to you. If you do not want us to use your information in this way, please [check the relevant box located on the form on which we collect your data (the order form/registration form)/adjust your user preferences in your account profile. For more information, contact us at .
            \nWe may use the information we have collected from you to enable us to display advertisements to our advertisers’ target audiences. Even though we do not disclose your personal information for these purposes without your consent, if you click on or otherwise interact with an advertisement, the advertiser may assume that you meet its target criteria.
            \n \nDisclosure of Your Information
            \nWe may disclose aggregated information about our users[, and information that does not identify any individual, without restriction. \nWe may disclose personal information that we collect or you provide as described in this privacy policy:
            \nTo our subsidiaries and affiliates. \nTo contractors, service providers, and other third parties we use to support our business and who are bound by contractual obligations to keep personal information confidential and use it only for the purposes for which we disclose it to them. \nTo a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of  ‘s assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which personal information held by  about our Website users is among the assets transferred. \nTo third parties to market their products or services to you if you have [consented to/not opted out of] these disclosures. We contractually require these third parties to keep personal information confidential and use it only for the purposes for which we disclose it to them. For more information, contact us at . \nTo fulfill the purpose for which you provide it. For example, if you give us an email address to use the “email a friend” feature of our Website, we will transmit the contents of that email and your email address to the recipients.
            \nFor any other purpose disclosed by us when you provide the information. With your consent. We may also disclose your personal information: 
            \nTo comply with any court order, law, or legal process, including to respond to any government or regulatory request. \nTo enforce or apply our terms of use and other agreements, including for billing and collection purposes, click the terms of use link. 
            \nIf we believe disclosure is necessary or appropriate to protect the rights, property, or safety of Sports Zoom LLC, our customers, or others. This includes exchanging information with other companies and organizations for the purposes of fraud protection and credit risk reduction. 
            \n \nChoices About How We Use and Disclose Your Information 
            \nWe strive to provide you with choices regarding the personal information you provide to us. We have created mechanisms to provide you with the following control over your information: 
            \nTracking Technologies and Advertising. You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. To learn how you can manage your Flash cookie settings, visit the Flash player settings page on Adobe’s website. If you disable or refuse cookies, please note that some parts of this site may then be inaccessible or not function properly. 
            \nDisclosure of Your Information for Third-Party Advertising. If you do not want us to share your personal information with unaffiliated or non-agent third parties for promotional purposes, you can opt-out by contacting us at . 
            \nPromotional Offers from the Company. If you do not wish to have your [email address/contact information] used by the Company to promote our own or third parties’ products or services, you can opt-out by checking the relevant box located on the form on which we collect your data (the order form/registration form) or by sending us an email stating your request to . If we have sent you a promotional email, you may send us a return email asking to be omitted from future email distributions. This opt out does not apply to information provided to Sports Zoom LLC as a result of a product purchase, warranty registration, product service experience or other transactions. 
            \nTargeted Advertising. If you do not want us to use information that we collect or that you provide to us to deliver advertisements according to our advertisers’ target-audience preferences, you can opt-out by checking the relevant box located on the form on which we collect your data the order form/registration form. You can also always adjust your user advertising preferences in your account profile by checking or unchecking the relevant boxes or by sending us an email stating your request to . For this opt-out to function, you must have your browser set to accept browser cookies. 
            \nWe do not control third parties’ collection or use of your information to serve interest-based advertising. However, these third parties may provide you with ways to choose not to have your information collected or used in this way. You can opt out of receiving targeted ads from members of the Network Advertising Initiative (“NAI“) on the NAI’s website.
            \n \nAccessing and Correcting Your Information 
            \nYou can review and change your personal information by logging into the Website and visiting your account profile page. 
            \nYou may also send us an email to request access to, correct or delete any personal information that you have provided to us. We cannot delete your personal information except by also deleting your user account. We may not accommodate a request to change information if we believe the change would violate any law or legal requirement or cause the information to be incorrect. 
            \nIf you delete your User Contributions from the Website, copies of your User Contributions may remain viewable in cached and archived pages, or might have been copied or stored by other Website users. Proper access and use of information provided on the Website, including User Contributions, is governed by our terms of use. 
            \n \nYour California Privacy Rights 
            \nCalifornia Civil Code Section § 1798.83 permits users of our Website that are California residents to request certain information regarding our disclosure of personal information to third parties for their direct marketing purposes. To make such a request, please send an email to  or write to us at: 9805 NE Hilltop Dr. Bainbridge Island, WA 98110. 
            \n \nData Security 
            \nWe have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls. Any payment transactions will be encrypted using SSL technology. 
            \nThe safety and security of your information also depends on you. Where we have given you or where you have chosen a password for access to certain parts of our Website, you are responsible for keeping this password confidential. We ask you not to share your password with anyone. We urge you to be careful about giving out information in public areas of the Website like message boards. The information you share in public areas may be viewed by any user of the Website. 
            \nUnfortunately, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our Website. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any privacy settings or security measures contained on the Website. 
            \n \nChanges to Our Privacy Policy 
            \nIt is our policy to post any changes we make to our privacy policy on this page with a notice that the privacy policy has been updated on the Website home page. If we make material changes to how we treat our users’ personal information, we will notify you by email to the primary email address specified in your account and/or through a notice on the Website home page. The date the privacy policy was last revised is identified at the top of the page. You are responsible for ensuring we have an up-to-date active and deliverable email address for you, and for periodically visiting our Website and this privacy policy to check for any changes. 
            \n \nContact Information 
            \nTo ask questions or comment about this privacy policy and our privacy practices, contact us at: `}
                <Link text="info@swingzen.com" underline onPress={() => Linking.openURL(`mailto:info@swingzen.com`)} />
                {` or Sports Zoom LLC 423 S Margin St Franklin TN 37064.
            \n`}
              </Text>
            </ScrollView>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

export default PrivacyPolicyScreen;
