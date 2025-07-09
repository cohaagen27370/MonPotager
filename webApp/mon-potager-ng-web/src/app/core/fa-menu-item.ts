import { IconName } from '@fortawesome/angular-fontawesome';
import { MenuItem } from 'primeng/api';

export type FaMenuItem =
  | MenuItem
  | {
      faIcon: IconName;
    };
