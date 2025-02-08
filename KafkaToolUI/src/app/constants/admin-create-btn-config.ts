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
};
