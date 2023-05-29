export interface ContactUsFormValues {
  name: string;
  username: string;
  mobileNumber: string;
  message: string;
}

export interface ContactUsResponse {}

export interface ContactUsPostValues {
  message: string;
  phoneNumber: string;
}
