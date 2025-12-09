export interface MaterialCategory {
  name: string;
}

export interface Material {
  id: string | undefined;
  name: string;
  unit: 'KG';
  categoryId: string;
}

export interface Supplier {
  id?: string | undefined;
  name: string;
  phoneNumber: string;
  address: string;
}

export interface Client {
  id?: string | undefined;
  name: string;
  phoneNumber: string;
  secondaryPhoneNumber?: string;
  address: string;
}

export interface Additional {
  id?: string | undefined;
  name: string;
  amount: number;
}

export interface Purchase {
  supplierId: string;
  items: {
    materialId: string;
    quantity: number;
    price: number;
    packageQuentity: number;
  }[];
  lotNo: string;
  expense: {
    name: string;
    amount: number;
  }[];
  paidAmount: number;
  ispaid: boolean | string;
  total: number;
}
export interface Jawak {
  client: {
    id: string;
    name: string;
    phoneNumber: string;
    secondaryPhoneNumber?: string;
    address: string;
  };
  charges: {
    name: string;
    amount: number;
  }[];
  items: {
    inventoryId: string;
    quantity: number;
    price: number;
  }[];

  paidAmount: number;
  ispaid: boolean | string;
  total: number;
}
