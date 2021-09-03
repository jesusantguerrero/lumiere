export const defaultUserButtonOptions = {
    account: {
        label: "Manage Accounts",
        sections: [
            ["Settings", '/settings' ],
            ["Profile",  '/settings/profile'],
            ["Billing", '/settings/billing'],
            '',
            ['API Tokens', '/settings/tokens'],
            ['About', '/about'],
            '',
            ['Logout', {
              emit: 'logout'
            }]
        ]
    },
  }