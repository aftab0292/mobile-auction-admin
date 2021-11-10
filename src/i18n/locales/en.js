export const locale = {
  SERVER_NOT_FOUND: 'Server not found.',

  DROPZONE_COMPONENT: {
    FILE_INVALID_TYPE: 'Invalid file type.',
    FILE_TOO_LARGE: 'File size is too large.',
  }
};

export const validationKeys = {
  firstName: 'First name',
  lastName: 'Last name',
  name: 'Name',
  email: 'Email Address',
  password: 'Password',
  currentPassword: 'Current Password',
  newPassword: 'Password',
  confirmPassword: 'Confirm Password',
  emailPattern: 'a valid email address',
  passwordPattern: 'Password must contain at least 8 characters with at least 1 alphabet (upper & lowe cased), 1 digit. & 1 special character.',
  otpPattern: 'only digits',
  timeIn24Hours: 'a valid time in 24 hours format',
  language: 'Language',
  title: 'Title',
  description: 'Description',
  dateFrom: 'From date',
  dateTo: 'To date',
  fullName: 'Full name',
  gender: 'Gender',
  confirmEmail: 'Confirm email',
  terms: 'Terms & conditions',
  maxAuctionExpireTime: 'Max auction expire time',
  plan: 'Plan',
  validity: 'Validity days',
  confirmPassword: 'Confirm Password',
};

export const key = keyName => validationKeys[keyName.replace(/\.[\d]+/, '')] || keyName;

/**
 * @see https://github.com/hapijs/joi/blob/master/lib/language.js
 */
export const validationMessages = {
  any: {
    required: ({ path }) => ({
      [path]: `${key(path.join('.'))} is required.`,
    }),
    unknown: ({ path }) => ({
      [path]: `${key(path.join('.'))} is not allowed.`,
    }),
    invalid: ({ path }) => ({
      [path]: `${key(path.join('.'))} contains an invalid value.`,
    }),
    empty: ({ path }) => ({
      [path]: `${key(path.join('.'))} is required.`,
    }),
    allowOnly: ({ context, path }) => ({
      [path]: `${key(path.join('.'))} must be one of ${context.valids.map(item => key(item)).join(', ')}.`,
    }),
  },

  string: {
    regex: {
      name: ({ context, path }) => ({
        [path]: `${key(path.join('.'))} must contain ${key(context.name)}.`,
      }),
    },
    min: ({ context, path }) => ({
      [path]: `${key(path.join('.'))} must be at least ${context.limit} characters in length.`,
    }),
    max: ({ context, path }) => ({
      [path]: `${key(path.join('.'))} must be under ${context.limit} characters in length.`,
    }),
    hex: ({ path }) => ({
      [path]: `${key(path.join('.'))} must only contain hexadecimal characters.`,
    }),
    length: ({ path, context: { limit } }) => ({
      [path]: `${key(path.join('.'))} length must be ${limit} characters long.`,
    }),
    with: ({ context }) => ({
      [context.peer]: `${key(context.peer)} is required with ${key(context.main)}.`,
    }),
  },

  number: {
    base: ({ path }) => ({
      [path]: `${key(path.join('.'))} must be a number.`,
    }),
    min: ({ context, path }) => ({
      [path]: `${key(path.join('.'))} must be larger than or equal to ${context.limit}.`,
    }),
    max: ({ context, path }) => ({
      [path]: `${key(path.join('.'))} must be less than or equal to ${context.limit}.`,
    }),
    integer: ({ path }) => {
      let res = {};
      path.map(i => {
        res[i] = `${key(i)} must be a integer number.`;
      });
      return res;
    }
  },

  object: {
    base: ({ path }) => ({
      [path]: `${key(path.join('.'))} must be an object.`,
    }),
    xor: ({ context: { peers } }) => {
      let res = {};
      peers.map(errorPeer => {
        res[errorPeer] = `only one of ${peers.map(peer => key(peer)).join(', ')} is allowed.`;
      });
      return res;
    },
    with: ({ context }) => ({
      [context.peer]: `${key(context.peer)} is required with ${key(context.main)}.`,
    }),
    without: ({ context }) => ({
      [context.peer]: `${key(context.peer)} needs to be removed with ${key(context.main)}.`,
    }),
    and: ({ context }) => {
      let res = {};
      context.missing.map(errorPeer => {
        res[errorPeer] = `${context.missing.map(peer => key(peer)).join(', ')} required with ${context.present
          .map(peer => key(peer))
          .join(', ')}.`;
      });
      return res;
    },
    allowUnknown: ({ context }) => ({
      [context.child]: `${key(context.child)} is not allowed.`,
    }),
    missing: ({context}) => {
      let res = {};
      context.peers.map(errorPeer => {
        res[errorPeer] = `One of ${context.peers.map(peer => key(peer)).join(', ')} is required.`;
      });
      return res;
    }

  },

  array: {
    min: ({ path, context }) => ({
      [path]: `${key(path.join('.'))} must contain at least ${context.limit} items.`,
    }),
    max: ({ path, context }) => ({
      [path]: `${key(path.join('.'))} must contain at most ${context.limit} items.`,
    }),
  },

  custom: {
    sameAs: (key1, key2) => ({
      [key1]: `${key(key1)} must match ${key(key2)}.`,
    }),
  },

  date: {
    valid: key1 => ({
      [key1]: `${key(key1)} needs to be a valid date.`,
    }),
    min: (key1, date) => ({
      [key1]: `${key(key1)} needs to be greater than or equals to ${date}.`,
    }),
  },
};

locale.validation = validationMessages;
locale.validationKeys = validationKeys;