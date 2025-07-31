export type Profile = {
  userId: string;
  familyName?: string;
  givenName?: string;
  fullName?: string;
  phone?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    country: string;
    postalCode: string;
  };
};

export type User = {
  _id: string;
  email: string;
  role: string;
  isVerified: boolean;
  profile?: {
    userId: string;
    familyName?: string;
    givenName?: string;
    fullName?: string;
    phone?: string;
    address?: {
      line1: string;
      line2?: string;
      city: string;
      country: string;
      postalCode: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
};

export type UserApiResponse = {
  data: User;
};

export type UpdateUserInput = {
  givenName: string;
  familyName: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    country: string;
    postalCode: string;
  };
};
