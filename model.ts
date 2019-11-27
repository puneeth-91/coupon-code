import { MLMbrEnrollmentIntermediateJSON } from './MLMemberEnrollmentIntermediateModel';
import { VSPMbrEnrollmentIntermediateJSON } from './VSPMemberEnrollmentIntermediateModel';

// Class to hold VSP Vision Rate Quote Details Response from VSP RateFinder API.
export class VisionRateQuote {
  StateCode!: string;
  ZipCode!: string;
  VSPProductRate: Array<VSPProductRate>;

  constructor() {
    this.VSPProductRate = new Array<VSPProductRate>();
  }
}

// Class to hold MetLife Vision Rate Quote Details Response from MetLife RateFinder API.
export class DentalRateQuote {
  StateCode!: string;
  ZipCode!: string;
  MetLifeRateDetails: Array<MetLifeRateDetails>;

  constructor() {
    this.MetLifeRateDetails = new Array<MetLifeRateDetails>();
  }
}

// Class to hold details of Vision Plans Available for VSPDVH in Select Plan page.
export class VisionPlansAvailable {
  ProductId!: string;
  Product!: string;
  Rate!: number;
  CCARate!: number;
  IsCCA!: boolean;
  SavingsOnVisionCare!: string;
  ExamCopay!: string;
  BasicLensCopay!: string;
  Allowances!: string;
  FeaturedFrames!: string;
  Antiglare!: string;
  Impactresistant!: string;
  Progressive!: string;
  Lighttodarktinting!: string;
  Tintedlenses!: string;
  UVprotection!: string;
  LensOptions!: string;
  CustomBenefitOptions!: string;
  PlanBenefitPdfFileName!: string;
}

// Class to hold details of Dental Plans Available for VSPDVH in Select Plan page.
export class DentalPlansAvailable {
  PlnType!: string;
  PlnCode!: string;
  PlnDesc!: string;
  PlnID!: string;
  Rate!: number;
  DefaultFormNumberCode!: string;
  DefaultGrpCode!: string;
  StateWiseSOBPdf!: string;
  StateWiseSOBIssuePdf!: string;
  DefaultSOBPdf!: string;
}

// Class to Store VSP Product Rate Details
export class VSPProductRate {
  Annual!: number;
  CCA!: string;
  CCARate2Year!: number;
  CCARateAnnual!: number;
  CCARateMonthly!: number;
  Coverage!: string;
  DentalBuyUp2year!: number;
  DentalBuyUpAnnual!: number;
  DentalBuyUpMonthly!: number;
  EnrollmentFee!: number;
  Monthly!: number;
  Product!: string;
  ProductID!: number;
  Year2!: number;
}

// Class to Store MetLife Dental Product Rate Details
export class MetLifeRateDetails {
  MemberDependentRate: Array<MetLifeRateBaseOnFrequency>;
  MemberFamilyRate: Array<MetLifeRateBaseOnFrequency>;
  MemberOnlyRate: Array<MetLifeRateBaseOnFrequency>;
  PlnCode!: string;
  PlnDesc!: string;
  PlnID!: string;
  constructor() {
    this.MemberDependentRate = new Array<MetLifeRateBaseOnFrequency>();
    this.MemberFamilyRate = new Array<MetLifeRateBaseOnFrequency>();
    this.MemberOnlyRate = new Array<MetLifeRateBaseOnFrequency>();
  }
}

// MetLife Dental Product Rates based on Frequency
export class MetLifeRateBaseOnFrequency {
  Annual!: number;
  Monthly!: number;
  Quarterly!: number;
  SemiAnnual!: number;
}

// Class to hold Dental Plan selected details in Select Plan Page.
export class SelectedDentalProductPlan {
  PlnType!: string;
  PlnCode!: string;
  PlnDesc!: string;
  PlnID!: string;
  Coverage!: string;
  CoverageTextDisplay!: string;
  Rate!: number;
  DefaultFormNumberCode!: string;
  DefaultGrpCode!: string;
  FormNumberCode!: string;
  GrpCode!: string;
  ReferralCode!: string;
}

// Class to hold Vision Plan selected details in Select Plan Page.
export class SelectedVisionProductPlan {
  ProductID!: string;
  Product!: string;
  Rate!: number;
  CCARate!: number;
  Coverage!: string;
  CoverageTextDisplay!: string;
}

//Class to retain data between pages
export class FormDataModel {
  ZipCode!: string;
  StateCode!: string;
  CoverageEffectiveDate!: string;
  PaymentFrequency!: string;
  VisionAgreement!: boolean;
  StateCodesResponse: StateDetails[];
  AllVSPProductRates: VisionRateQuote;
  AllMetLifeDentalProductRates: DentalRateQuote;
  SelectedDentalProductPlan: SelectedDentalProductPlan;
  SelectedVisionProductPlan: SelectedVisionProductPlan;
  MetLifePlanDetailsResponse: MetLifePlanDetails[];
  MemberInfoResponse: MemberInfo;
  DependentInfoResponse: DependentInfo;
  PaymentResponse: Payment;
  DentalDisclosure: DentalDisclosure;
  DeclarationStatement: DeclarationStatement;
  FloridaAgentLicenseDetails: FloridaAgentLicenseDetails;
  MLMbrEnrollmentIntermediateJSON: MLMbrEnrollmentIntermediateJSON;
  VSPMbrEnrollmentIntermediateJSON: VSPMbrEnrollmentIntermediateJSON;
  ValidateStateZip: ValidateStateZip;
  MLMbrWebID!: string;
  VSPMbrWebID!: string;
  ExternalID!: string;
  CurrentDemographicPageNavigationURLHostName!: string;
  CurrentDemographicPageNavigationURLPathName!: string;
  MetLifeFormNumberCodeDetails: MetLifeFormNumberCodeDetails[];
  AgentCode!: string;
  VSPAgentCode!: string;
  MLAgentCode!: string;
  PartnerDetails: PartnerDetails;
  PolicyNumberOfSucessEnrollment!: string;
  IsDentalPaymentSuccessful!: boolean;
  IsVisionPaymentSuccessful!: boolean;

  constructor() {
    this.StateCodesResponse = new Array<StateDetails>();
    this.AllVSPProductRates = new VisionRateQuote();
    this.AllMetLifeDentalProductRates = new DentalRateQuote();
    this.SelectedDentalProductPlan = new SelectedDentalProductPlan();
    this.SelectedVisionProductPlan = new SelectedVisionProductPlan();
    this.MetLifePlanDetailsResponse = new Array<MetLifePlanDetails>();
    this.MemberInfoResponse = new MemberInfo();
    this.DependentInfoResponse = new DependentInfo();
    this.PaymentResponse = new Payment();
    this.DentalDisclosure = new DentalDisclosure();
    this.DeclarationStatement = new DeclarationStatement();
    this.FloridaAgentLicenseDetails = new FloridaAgentLicenseDetails();
    this.MLMbrEnrollmentIntermediateJSON = new MLMbrEnrollmentIntermediateJSON();
    this.VSPMbrEnrollmentIntermediateJSON = new VSPMbrEnrollmentIntermediateJSON();
    this.ValidateStateZip = new ValidateStateZip();
    this.MetLifeFormNumberCodeDetails = new Array<MetLifeFormNumberCodeDetails>();
    this.PartnerDetails = new PartnerDetails();
  }
}

//Model class to hold gender types for Gender dropdown in demographic page.
export class GenderTypes {
  Gender: string = '';
  Description: string = '';
}

//Model class to hold marital status types for Marital Status dropdown in demographic page.
export class MaritalStatusTypes {
  Value: string = '';
  Description: string = '';
}

//Model class to hold Work Status types for Work Status dropdown in demographic page.
export class WorkStatusTypes {
  Value: string = '';
  Description: string = '';
}

//Model class to hold Relationship types for Relation dropdown in dependent section of demographic page.
export class RelationshipTypes {
  Code: string = '';
  Description: string = '';
}

//Model class for holding state codes
export class StateDetails {
  StateCode!: string;
  StateName!: string;
}

// Model class for holding Member Info.
export class MemberInfo {
  FirstName!: string;
  LastName!: string;
  MailingAddress!: string;
  Address2!: string;
  City!: string;
  State!: string;
  StateName!: string;
  ZipCode!: string;
  PhoneNumber!: string;
  PhoneNumberWithFormatter!: string;
  EmailAddress!: string;
  DOB: any;
  DOBForAPIConverted!: string;
  Gender!: string;
  GenderDesc!: string;
  MaritalStatus!: string;
  EmploymentStatus!: string;
  SSN!: string;
  SSNWithFormatter!: string;
  FacilityId!: string;
  FacilityName!: string;
  Fulfillment!: string;
  Medicaid!: string;
  Medicare!: string;
  Duplication!: string;
  PreviousCoverageCompany!: string;
  PreviousCoveragePolicy!: string;
  PreviousCoverage!: string;
  Lapse!: string;
  PreviousCoverageCompany2!: string;
  PreviousCoveragePolicy2!: string;
  OtherInsurance!: string;
  SLMB!: string;
}

// Model class for holding Dependent's Info.
export class DependentInfo {
  VisionCoverage!: string;
  DentalCoverage!: string;
  Dependents: Array<Dependent>
  constructor() {
    this.Dependents = new Array<Dependent>();
  }
}

// Model class for holding Individual Dependent's Info details.
export class Dependent {
  FirstName!: string;
  LastName!: string;
  DOB: any;
  DOBForAPIConverted!: string;
  Gender!: string;
  Relation!: string;
  SSN!: string;
  SSNWithFormatter!: string;
  FacilityId!: string;
  FacilityName!: string;
  IsDisabled!: boolean;
  AddToVision!: boolean;
  AddToDental!: boolean;
}

//Model class to hold card type for card type dropdown.
export class CardTypes {
  CardType: string = '';
  Description: string = '';
}

//Model class for expiry month and year dropdowns
export class ExpiryMonthAndYear {
  Expiry: string = '';
}

// Class to hold VSP Products's benefits details in Configuration.json to make VSP Products's benefits details content configurable.
export class VisionProductsBenefits {
  Product!: string;
  SavingsOnVisionCare!: string;
  ExamCopay!: string;
  BasicLensCopay!: string;
  Allowances!: string;
  FeaturedFrames!: string;
  Antiglare!: string;
  Impactresistant!: string;
  Progressive!: string;
  Lighttodarktinting!: string;
  Tintedlenses!: string;
  UVprotection!: string;
  LensOptions!: string;
  CustomBenefitOptions!: string;
}

// Class to Hold Vision Plan Benefits Pdf file name & Plan Policy URL based on product level in Configuration.json to make Vision Plan Benefits Pdf's file name configurable.
export class VisionProductsConfiguration {
  Product!: string;
  PdfFileName!: string;
  PlanPolicyUrl!: string;
}

// Model class for holding Payment data.
export class Payment {
  VSPMbrWebId!: string;
  MetLifeMbrWebId!: string;
  PaymentType!: string;
  IsBillingAddressDifferentThanMailingAddress!: boolean;
  BankDraftDetails: BankDraftPayment;
  CardDetails: CardPayment;
  BillingAddress: BillingAddress;
  ElectronicSignature!: string;
  constructor() {
    this.CardDetails = new CardPayment();
    this.BankDraftDetails = new BankDraftPayment();
    this.BillingAddress = new BillingAddress();
  }
}

// Model class for holding Bank Draft Payment Data.
export class BankDraftPayment {
  BankNameOnAccount!: string;
  BankBankName!: string;
  BankRoutingNumber!: string;
  BankAccountnumber!: string;
  BankAccountType!: string;
}

// Model class for holding Bank card payment data.
export class CardPayment {
  CardNameOnCard!: string;
  CardCardNumber!: string;
  CardCardType!: string;
  CardExpirationMonth: number = -1;
  CardExpirationYear: number = -1;
}

// Model class for holding Billing Address data.
export class BillingAddress {
  BillingAddress1!: string;
  BillingAddress2!: string;
  BillingCity!: string;
  BillingState!: string;
  BillingStateName!: string;
  BillingZipCode!: string;
}

// Class to hold success response json coming from 'GetMetLifePlanDetails' API.
export class MetLifePlanDetails {
  PlanId!: number;
  PlanCode!: string;
  PlanDescription!: string;
  FormNumberCode!: string;
  GrpCode!: string;
  ScheduleOfBenefitDoc!: string;
}

// Class to hold properties to save data of dental disclosure page on click of 'next'.
export class DentalDisclosure {
  FraudWarningAcknowledge!: boolean;
  FraudWarningConsent!: string;
  ConsumerConsent!: string;
  AgentName!: string;
  AgentLicenseNumber!: string;
  ElectronicSignature!: string;
  Recaptcha!: boolean;
}

// Class to hold success response json coming from 'GetStateCustomisedContents' API.
export class DeclarationStatement {
  DeclarationStatement!: string;
  StateCode!: string;
  Language!: string;
}

// Class to hold success response json coming from 'GetFloridaStateAgentNameAndLicenseNumber' API.
export class FloridaAgentLicenseDetails {
  AgentName!: string;
  AgentLicenseNumber!: string;
}

// Class to Hold Dental Plan's Properties in Configuration.json to make Dental Plan Properties configurable.
export class DentalPlanConfiguration {
  PlnID!: string;
  PlanType!: string;
  PlnCode!: string;
  PlnDescInUI!: string;
  StateWiseSOBPdf!: string;
  StateWiseSOBIssuePdf!: string;
  DefaultSOBPdf!: string;
  VSPDVHGroupCode!: string;
  LimationsAndExclusionsPdf!: string;
}

export class FacilityDetailsList {
  FacilityID!: string;
  FacilityName!: string;
}

// Class to hold property to pass request json to 'ValidateState' API.
export class ValidateStateZip {
  ZipCode!: string;
  StateCode!: string;
}

// Class to hold Metlife's FormNumber Code and GroupCOdes details for the referral code(i.e partner code) which is present in PromocodeMapping table of Metlife DB.
// Hold success response of metlife API 'GetFormnumberCodeAndGrpCode'
export class MetLifeFormNumberCodeDetails {
  ReferralCode!: string;
  PlanCode!: string;
  FormNumberCode!: string;
  GroupCode!: string;
  MLSourceCustomerNumber!: string;
}

// Class to hold properties of PartnerDetails coming from 'GetPartnerDetails' API.
export class PartnerDetails {
  AgentCode!: string;
  PartnerCode!: string;
  PartnerName!: string;
  FirstName!: string;
  LastName!: string;
  Phone!: string;
  Email!: string;
  Logo!: string;
  Opportunity!: string;
  MarketingChannel!: string;
  CmpCode!: string;
  IsCCPayment!: string;
  IsDepDisabled!: string;
}

// Class to Hold Marketing Channel Properties in Configuration.json to make portal type/marketing channel level configurable.
export class MarketingChannelProperties {
  MarketingChannel!: string;
  HeaderDesc!: string;
  EnrollmentChannel!: string;
  MarketingChannelCodeForFIndADentistLink!: string;
  IsDirectCustomerPortal!: boolean;
  IsBrokerPortal!: boolean;
  IsCallCenterPortal!: boolean;
  IsAgentCodeRequiredInQueryString!: boolean;
  IsAgentCodeSplitIntoVSPAndMetlife!: boolean;
}

// Class to Hold Coverage Type Properties in Configuration.json to make coverage type configurable.
export class CoverageTypeProperties {
  CoverageType!: string;
  CoverageTypeDesc!: string;
  CoverageTypeCode!: string;
  DentalRateType!: string;
  IsMemberOnlyCoverage!: boolean;
  IsMemberPlusDependentCoverage!: boolean;
  IsMemberPlusFamilyCoverage!: boolean;
}

// Class to Hold Payment Frequency Properties in Configuration.json to make payment frequencies configurable.
export class PaymentFrequencyProperties {
  Frequency!: string;
  LabelText!: string;
  FrequencyText!: string;
  ISDefaultFrequencySelected!: boolean;
  IsMonthlyFrequency!: boolean;
  IsAnnualFrequency!: boolean;
}
