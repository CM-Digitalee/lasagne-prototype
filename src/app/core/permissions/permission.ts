import { Role } from '../../../app/shared';

export interface Permission {
  roles: Role[];
  condition?: boolean;
}
