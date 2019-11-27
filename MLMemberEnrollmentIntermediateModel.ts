// Class to hold data to be sent to MetLife "MbrEnrollmentIntermediateInsert" API
export class MLMbrEnrollmentIntermediateJSON {
  Member: MemberJSON;
  MemberRate: MemberRateJSON;
  MemberPaymentMethod: MemberPaymentMethodJSON;
  MemberPaymentList!: string;
  MemberField!: string;
  MemberAddl: MemberAddlJSON;
  MemberDncNotifcations!: string;
  MemberPaymentAuth: MemberPaymentAuthJSON;
  MemberId!: string;
  MemberDependents: Array<MemberDependentJSON>;
  PolicyNum!: string;
  GrpCode!: string;
  MbrWebId!: string;
  PlanCode!: string;

  constructor() {
    this.Member = new MemberJSON();
    this.MemberRate = new MemberRateJSON();
    this.MemberPaymentMethod = new MemberPaymentMethodJSON();
    this.MemberAddl = new MemberAddlJSON();
    this.MemberPaymentAuth = new MemberPaymentAuthJSON();
    this.MemberDependents = new Array<MemberDependentJSON>();
  }
}

// Class to hold Member json details.
export class MemberJSON {
  PolicyNum!: string;
  ApprovalDt!: string;
  GrpCode!: string;
  GrpAgtID!: string;
  CmpCode!: string;
  AgtCode!: string;
  NameSuffix!: string;
  FirstName!: string;
  LastName!: string;
  Addr1!: string;
  Addr2!: string;
  City!: string;
  Zip!: string;
  HomePhone!: string;
  Email!: string;
  Gender!: string;
  DOB!: string;
  CvgType!: string;
  CvgStartDt!: string;
  PromoCode!: string;
  OptionFutureOffers!: number;
  Referral!: string;
  GrpID!: number;
  StateCode!: string;
  HearAboutUs!: number;
  IsMoreMbr!: boolean;
  Status!: string;
  SSN!: string;
  FormNumbersCode!: string;
  FlFlType!: string;
  EagleCode!: string;
  Ethnicity!: string;
  MaritalStatusCode!: string;
  Language!: string;
  TrackingCode!: string;
  UserInfoOne!: string;
  UserInfoTwo!: string;
  UserInfoThree!: string;
  UserInfoFour!: string;
  SmartLinksID!: string;
  SubmissionID!: string;
  MSRCode!: string;
  MbrWebID!: string;
  SecureID!: string;
  CancelEffectiveDt!: string;
  CancelNotes!: string;
  CancelApprovlBy!: string;
  CancelApprovalDt!: string;
  MobilePhone!: string;
  MiscUsrFldOne!: string;
  ProspectValue!: string;
  MiscUsrFldTwo!: string;
  MiscUsrFldThree!: string;
  MiscUsrFldTwentyOne!: string;
  MiscUsrFldTwentyTwo!: string;
  MiscUsrFldTwentyThree!: string;
  MiscUsrFldTwentyFour!: string;
  ExtGrpID!: string;
  NamePrefix!: string;
  MiddleInitial!: string;
  MemberNote!: string;
  PartnerCode!: string;
  EnrollmentChannel!: string;
}

// Class to hold Member Rate Json details.
export class MemberRateJSON {
  MbrshipFeeForYr1!: string;
  EnrollFee!: number;
  PymntFreqType!: string;
}

// Class to hold Member Payment Auth Json details.
export class MemberPaymentMethodJSON {
  PaymMthdType!: string;
  CardActType!: string;
  CardType!: string;
  CardTypeDesc!: string;
  CardNum!: string;
  CardExp!: string;
  CardHolderName!: string;
  CardAddr1!: string;
  CardAddr2!: string;
  CardCity!: string;
  CardStateCode!: string;
  CardZip!: string;
  HomePhone!: string;
  FinInstName!: string;
  RoutingNum!: string;
  ActNum!: string;
  ActType!: string;
  NameOnChk!: string;
  NextPaymtDueDt!: string;
  CardLastFour!: string;
  BankDraftType!: string;
  DiffBillAddrFlg!: number;
  PayerID!: string;
  BillingAgreementID!: string;
  KeyRef!: string;
  KeyCode!: string;
  BillDay!: string;
  NextPaymtBillDt!: string;
}

// Class to hold Member Addl json details.
export class MemberAddlJSON {
  HireDate!: string;
  Salary!: string;
  Occupation!: string;
  WorkHoursPerWeek!: number;
  PartTimeFlg!: number;
  BeneficiaryName!: string;
  BeneficiaryRelationship!: string;
  SaltValue!: string;
  AppReceivedDt!: string;
  Compliance!: number;
  WaitingPeriodStDt!: string;
  WorkStatus!: string;
  PriorCarrierName!: string;
  PriorCarrierPhoneNo!: string;
  PolicyHolderName!: string;
  PolicyId!: string;
  CvgStartDt!: string;
  CvgEndDt!: string;
  MSRCode!: string;
  CurrentOrPriorEmployer!: string;
}

// Class to hold Member Payment Auth Json details.
export class MemberPaymentAuthJSON {
  PaymDt!: string;
  PaidAmt!: string;
  PaidAuthCode!: string;
  PaymDetails!: string;
  PaymMthdType!: string;
  CardType!: string;
  CardNum!: string;
  CardExp!: string;
  CardHolderName!: string;
  BankDraftType!: string;
  FinInstName!: string;
  RoutingNum!: string;
  ActNum!: string;
  ActType!: string;
  NameOnChk!: string;
  PaymEffDt!: string;
  EnrollFlg!: string;
  EnrollFee!: string;
  CardActType!: string;
  TransactionStatus!: string;
  MemberNote!: string;
  ErrorCode!: string;
  ReasonCode!: string;
  ReturnMsg!: string;
  TransactionID!: string;
  TransactionDatetime!: string;
  PayerID!: string;
  BillingAgreementID!: string;
  MsgSubID!: string;
  KeyRef!: string;
  KeyCode!: string;
  RefundRuleID!: string;
  Status!: string;
  ResponseDate!: string;
  MerchantOrderNumber!: string;
  NumberOfMonths!: string;
  ResponseCode!: string;
  ResponseDescription!: string;
  TransactionSource!: string;
}

// Class to hold Member Dependent Json details.
export class MemberDependentJSON {
  DependentNum!: string;
  FirstName!: string;
  LastName!: string;
  Gender!: string;
  DOB!: string;
  RltnCode!: string;
  StudentFlg!: string;
  DisabledFlg!: string;
  CvgStartDt!: string;
  MbrDependentID!: string;
  SSN!: string;
  MemberDepMisc: Array<MemberDepMisc>;
  PhoneNumber!: string;
  Email!: string;
  NameSuffix!: string;
  MiddleInitial!: string;

  constructor() {
    this.MemberDepMisc = new Array<MemberDepMisc>();
  }
}

// Class to hold Member Dependent's Miscellenous details
export class MemberDepMisc {
  MbrDepID!: number;
  ItmKey!: string;
  ItmValue!: string;
  ItmDataType!: string;
}
