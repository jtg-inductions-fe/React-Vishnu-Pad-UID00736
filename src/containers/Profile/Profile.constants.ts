export const PROFILE_DISPLAY_FIELDS = [
    { label: 'City', key: 'city' as const },
    { label: 'State', key: 'state' as const },
    { label: 'Zipcode', key: 'zipcode' as const },
];

export const FORM_EDIT_FIELDS = [
    { label: 'Full Name', name: 'name', sm: 6 },
    { label: 'Email Address', name: 'email', sm: 6 },
    { label: 'City', name: 'city', sm: 4 },
    { label: 'State', name: 'state', sm: 4 },
    { label: 'Zipcode', name: 'zipcode', sm: 4 },
] as const;
