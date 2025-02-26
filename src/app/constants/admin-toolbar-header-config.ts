export const CREATE_BTN_CONFIG: {
  [key: string]: {
    tooltip: string;
    routerLink: string;
    icon: string;
    label: string;
    disabled?: boolean;
    color: string;
  }[];
} = {
  '/admin/cluster': [
    {
      tooltip: 'Register new Kafka cluster connection',
      routerLink: '/admin/cluster/new',
      icon: 'settings',
      label: 'Register New',
      disabled: false,
      color: '',
    },
  ],
  '/admin/cluster/new': [
    {
      tooltip: 'Save service configuration',
      routerLink: '/admin/cluster/new',
      icon: 'settings',
      label: 'Register Connection',
      disabled: true, // Dynamically set in the component
      color: '#ff9100',
    },
    {
      tooltip: 'Verify connection to the cluster',
      routerLink: '/admin/cluster/new',
      icon: 'check',
      label: 'Verify',
      disabled: true, // Dynamically set in the component
      color: '#69f0ae',
    },
    {
      tooltip: 'Discard changes',
      routerLink: '/admin/cluster',
      icon: 'cancel',
      label: 'Cancel',
      disabled: false,
      color: '',
    },
  ],
  '/admin/cluster/view': [
    {
      tooltip: 'Save service configuration',
      routerLink: '/admin/cluster/new',
      icon: 'edit',
      label: 'Edit configuration',
      disabled: false, // Dynamically set in the component
      color: '#ff9100',
    },
    {
      tooltip: 'Verify connection to the cluster',
      routerLink: '/admin/cluster/view',
      icon: 'check',
      label: 'Verify',
      disabled: false, // Dynamically set in the component
      color: '#69f0ae',
    },
    {
      tooltip: 'Delete cluster registration',
      routerLink: '/admin/cluster',
      icon: 'close',
      label: 'Delete Connection',
      disabled: false,
      color: '#f44336',
    },
    {
      tooltip: 'Navigate to Schema Register page',
      routerLink: '/admin/cluster/new',
      icon: 'settings',
      label: 'Register New',
      disabled: false,
      color: '#69f0ae',
    },
  ],
};
