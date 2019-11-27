// Class to hold data to be sent to VSP !MbrEnrollmentIntermediateInsert! API
export class VSPMbrEnrollmentIntermediateJSON {
  Member: MemberJSON;
  Product: ProductJSON;
  MemberPaymentMethod: MemberPaymentMethodJSON;
  Dependents: Array<DependentJSON>;

  constructor() {
    this.Member = new MemberJSON();
    this.Product = new ProductJSON();
    this.MemberPaymentMethod = new MemberPaymentMethodJSON();
    this.Dependents = new Array<DependentJSON>();
  }
}

// Class to hold Member json details.
export class MemberJSON {
  PolicyNumber!: string;
  FirstName!: string;
  MiddleInitial!: string;
  LastName!: string;
  NameSuffix!: string;
  Address1!: string;
  Address2!: string;
  City!: string;
  StateCode!: string;
  ZipCode!: string;
  Mobilephone!: string;
  WorkPhone!: string;
  HomePhone!: string;
  Email!: string;
  ConfirmEmail!: string;
  DOB!: string;
  Gender!: string;
  MaritalStatus!: string;
  FulfillmentData!: string;
  WorkStatus!: string;
  MbrWebID!: string;
  MemberNote!: string;
}

// Class to hold Product json details.
export class ProductJSON {
  Coverage!: string;
  Frequency!: string;
  Promocode!: string;
  EnrollmentFee!: string;
  ProductName!: string;
  Productid!: string;
  MemberRate!: string;
  EffectiveDate!: string;
  CCAFee!: string;
  AgentCode!: string;
  AgencyPartner!: string;
  MarketingChannel!: string;
}

// Class to hold MemberPaymentMethod json details.
export class MemberPaymentMethodJSON {
  PaymentMethodType!: string;
  ActType!: string;
  NameofBank!: string;
  NameonAccount!: string;
  ActNum!: string;
  RoutingNum!: string;
  CardType!: string;
  CardHolderName!: string;
  CardNumber!: string;
  CardExpDate!: string;
  BillingAddress1!: string;
  BillingAddress2!: string;
  Billingcity!: string;
  BillingState!: string;
  BillingZipCode!: string;
}

// Class to hold DependentJSON json details.
export class DependentJSON {
  FirstName!: string;
  MiddleInitial!: string;
  LastName!: string;
  NameSuffix!: string;
  isStudent!: string;
  isDisabled!: string;
  CoverageStartDate!: string;
  RelationshipCode!: string;
  Gender!: string;
  DOB!: string;
  Email!: string;
}
