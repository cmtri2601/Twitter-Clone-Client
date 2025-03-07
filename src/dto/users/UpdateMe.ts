import { Media } from '~/dto/common/Media';

export interface UpdateMeRequest {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: Media;
  coverPhoto?: string;
}
