import { DataChartProps } from './dataChart.interface';

//TODO:: This is a dummy user data this have to change accordinly depending on requirements
export interface UserProfileData {
  email: string;
  name: string;
  profileImage: string;
  isSubscribed: boolean;
  videoUploadData: { videoUploads: number; swingzenUniveristiy: number };
  chartData: DataChartProps;
}
