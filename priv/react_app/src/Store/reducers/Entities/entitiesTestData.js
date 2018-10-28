const testData = {
  companies: {
    '1': {
      website: 'www.spotify.com',
      studentSessionDays: 0,
      name: 'Spotify',
      logoUrl: null,
      id: '1',
      description: 'We do music!',
      entries: [{ id: '1', value: 'JA' }, { id: 2, value: '20' }]
    },
    '2': {
      website: 'www.google.com',
      studentSessionDays: 0,
      name: 'Google',
      logoUrl: null,
      id: 2,
      description: 'We code!',
      entries: [{ id: 3, value: 'JA' }, { id: 4, value: '40' }]
    },
    '3': {
      website: 'www.ibm.com',
      studentSessionDays: 0,
      name: 'IBM',
      logoUrl: null,
      id: 3,
      description: 'We make things!',
      entries: [{ id: 5, value: 'NEJ' }, { id: 6, value: '60' }]
    },
    '4': {
      website: 'www.intel.com',
      studentSessionDays: 0,
      name: 'Intel',
      logoUrl: null,
      id: 4,
      description: 'We do stuff!',
      entries: [{ id: 7, value: 'NEJ' }, { id: 8, value: '80' }]
    },
    '5': {
      website: 'www.jesus.com',
      studentSessionDays: 0,
      name: 'Jesus wine makers',
      logoUrl: null,
      id: 5,
      description: 'We do wine!',
      entries: [{ id: 9, value: 'JA' }, { id: '1'0, value: '100' }]
    }
  },
  company: {
    website: 'www.spotify.com',
    studentSessionDays: 0,
    name: 'Spotify',
    logoUrl: null,
    id: '1',
    description: 'We do music!',
    entries: [{ id: '1', value: 'JA' }, { id: 2, value: '20' }]
  },
  users: {
    '1': {
      id: '1',
      email: 'dev@it.now',
      firstName: 'Dev',
      lastName: 'User'
    },
    '2': {
      id: 2,
      email: 'test@it.later',
      firstName: 'Test',
      lastName: 'User'
    }
  },
  user: {
    id: '1',
    email: 'dev@it.now',
    firstName: 'Dev',
    lastName: 'User',
    roles: [
      {
        id: '1',
        type: 'admin',
        permissions: ['read_all', 'write_all']
      }
    ]
  },
  roles: {
    '1': {
      id: '1',
      type: 'admin',
      permissions: ['read_all', 'write_all']
    },
    '2': {
      id: 2,
      type: 'manager',
      permissions: ['read_users', 'write_users']
    }
  },
  role: {
    id: '1',
    type: 'admin',
    permissions: ['read_all', 'write_all'],
    users: [
      {
        id: '1',
        email: 'dev@it.now',
        firstName: 'Dev',
        lastName: 'User'
      }
    ]
  },
  studentSessionApplications: {
    '1': { id: '1', companyid: '1', studentid: '1', motivation: 'Old motivation' }
  },
  studentSessions: {
    '1': {
      id: '1',
      companyid: '1',
      studentid: '1',
      start: '2018-01-01',
      end: '2018-01-01',
      studentConfirmed: false
    }
  },
  studentSessionDays: {
    '1': {
      id: '1',
      companyid: '1',
      studentid: '1',
      start: '2018-01-01',
      end: '2018-01-01'
    }
  },
  categories: [
    {
      title: 'Logistik',
      id: '1',
      attributes: [
        { title: 'Eluttag', id: '1' },
        { title: 'Internetkoder', id: 2 },
        { title: 'Ståbord', id: 3 },
        { title: 'Koli', id: 4 }
      ]
    },
    {
      title: 'Avtal',
      id: 2,
      attributes: [
        { title: 'Beskrivning', id: 5 },
        { title: 'Länk till document', id: 6 },
        { title: 'Ansvarig', id: 7 },
        { title: 'Kontakt Uppgifter', id: 8 }
      ]
    },
    {
      title: 'Övrigt',
      id: 3,
      attributes: [
        { title: 'Udda beställning', id: 9 },
        { title: 'Extra ketchup', id: '1'0 },
        { title: 'Trevligthetsskala', id: '1'1 },
        { title: 'Länk till podio', id: '1'2 }
      ]
    },
    {
      title: 'Event',
      id: 4,
      attributes: [
        { title: 'Lunchföreläsning', id: '1'3 },
        { title: 'Pub', id: '1'4 },
        { title: 'Yrkesvaskning', id: '1'5 },
        { title: 'Sabrering för nybörjare', id: '1'6 }
      ]
    }
  ],
  category: {
    title: 'Logistik',
    id: '1',
    attributes: [
      {
        title: 'Eluttag',
        id: '1',
        entries: [{ id: '1', value: '1', company: { id: '1', name: 'Spotify' } }]
      },
      {
        title: 'Internetkoder',
        id: 2,
        entries: [{ id: 2, value: '1', company: { id: 2, name: 'Google' } }]
      },
      {
        title: 'Ståbord',
        id: 3,
        entries: [{ id: 3, value: '1', company: { id: 3, name: 'IBM' } }]
      },
      {
        title: 'Koli',
        id: 4,
        entries: [{ id: 4, value: '1', company: { id: 2, name: 'Google' } }]
      }
    ]
  },
  statistics: {
    nbrApplicatons: 5
  }
};

export default testData;
