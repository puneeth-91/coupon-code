import { Injectable } from '@angular/core';
import { MemberDependentJSON, MemberDepMisc, MLMbrEnrollmentIntermediateJSON } from "../models/MLMemberEnrollmentIntermediateModel";
import { CardTypes, CoverageTypeProperties, DependentInfo, FloridaAgentLicenseDetails, MarketingChannelProperties, MemberInfo, PartnerDetails, Payment, SelectedDentalProductPlan, SelectedVisionProductPlan } from '../models/model';
import { ConfigurationManagerService } from './configuration-manager.service';
import { MemberService } from './member.service';

@Injectable({
  providedIn: 'root'
})
export class MLIntermediatInsertUpdateService {

  constructor(private memberService: MemberService) { }

  // Construct Member & Dependent JSON Response for storing in Member Intermediate table.
  MapDataTOMemberIntermediateModel(methodType: string): MLMbrEnrollmentIntermediateJSON {
    let mbrEnrollmentIntermediateJSON: MLMbrEnrollmentIntermediateJSON = new MLMbrEnrollmentIntermediateJSON();

    let mbrWebId: string = this.memberService.GetMLMbrWebIDResponse();
    let stateCode: string = this.memberService.GetMemberEnrollStateCodeResponse();
    let covgEffDate: string = this.memberService.GetCoverageEffectiveDateResponse();
    let paymentFreq: string = this.memberService.GetPaymentFrequencyResponse();
    let selectedDentalPlan: SelectedDentalProductPlan = this.memberService.GetSelectedDentalProductPlanResponse();
    let memberInfo: MemberInfo = this.memberService.GetMemberInfoResponse();
    let dependentInfo: DependentInfo = this.memberService.GetDependentInfoResponse();
    let paymentResponse: Payment = this.memberService.GetPaymentResponse();
    let floridaAgentLicenseDetailsResponse: FloridaAgentLicenseDetails = this.memberService.GetFloridaAgentLicenseDetailsResponse();
    let selectedVisionPlan: SelectedVisionProductPlan = this.memberService.GetSelectedVisionProductPlanResponse();
    let partnerDetails: PartnerDetails = this.memberService.GetPartnerDetailsResponse();
    let policyNumber: string = this.memberService.GetPolicyNumberOfSucessEnrollmentResponse(); // Get policy number/mbrwebid of 1st succesfull enrollment(i.e of vsp's or metlife's)
    let mlagentCode: string = this.memberService.GetMLAgentCodeResponse();

    if (mbrWebId != undefined && mbrWebId && methodType == "UPDATE") {
      mbrEnrollmentIntermediateJSON.MbrWebId = mbrWebId;
      mbrEnrollmentIntermediateJSON.Member.MbrWebID = mbrWebId;

      // If vsp was already enrolled succesful, then it's MbrWebID will be used for Metlife's policynumber (As both enrollment(i.e vsp and metlife) shud have same policy number)
      if (policyNumber != undefined && policyNumber) {
        mbrEnrollmentIntermediateJSON.Member.PolicyNum = policyNumber;
      }
      else {
        mbrEnrollmentIntermediateJSON.Member.PolicyNum = mbrWebId;
      }
    }

    if (partnerDetails != undefined) {
      // Passing PartnerCode in PartnerCode field of Member Json, which will later stored in PartnerCode field of MemberMisc table of Carelynx DB.
      if (partnerDetails.PartnerCode != undefined && partnerDetails.PartnerCode) {
        mbrEnrollmentIntermediateJSON.Member.PartnerCode = partnerDetails.PartnerCode;
      }
      // Passing EnrollmentChannel in EnrollmentChannel field of Member Json, which will later stored in EnrollmentChannel field of MemberMisc table of Carelynx DB.
      if (partnerDetails.MarketingChannel != undefined && partnerDetails.MarketingChannel) {
        mbrEnrollmentIntermediateJSON.Member.EnrollmentChannel = this.GetMarketingChannelType(partnerDetails.MarketingChannel);
      }
    }

    if (selectedDentalPlan != undefined && selectedDentalPlan.PlnCode != undefined) {
      mbrEnrollmentIntermediateJSON.PlanCode = selectedDentalPlan.PlnCode;

      if (ConfigurationManagerService.settings.UseReferralCodeMappingStructureForMetlife == true) {
        if (selectedDentalPlan.ReferralCode != undefined && selectedDentalPlan.ReferralCode) {
          mbrEnrollmentIntermediateJSON.Member.Referral = selectedDentalPlan.ReferralCode;
          mbrEnrollmentIntermediateJSON.Member.PromoCode = selectedDentalPlan.ReferralCode;
        }

        if (selectedDentalPlan.FormNumberCode != undefined && selectedDentalPlan.FormNumberCode) {
          mbrEnrollmentIntermediateJSON.Member.FormNumbersCode = selectedDentalPlan.FormNumberCode;
        }
        else {
          mbrEnrollmentIntermediateJSON.Member.FormNumbersCode = selectedDentalPlan.DefaultFormNumberCode; // Currenly harcode to default form numbers code.
        }

        if (selectedDentalPlan.GrpCode != undefined && selectedDentalPlan.GrpCode) {
          mbrEnrollmentIntermediateJSON.Member.GrpCode = selectedDentalPlan.GrpCode;
        }
        else {
          mbrEnrollmentIntermediateJSON.Member.GrpCode = selectedDentalPlan.DefaultGrpCode; // Currenly harcode to default group code.
        }
      }
      else {
        mbrEnrollmentIntermediateJSON.Member.GrpCode = selectedDentalPlan.GrpCode;
      }

      mbrEnrollmentIntermediateJSON.Member.CvgType = this.GetMetLifeCoverageType(selectedDentalPlan.Coverage);
    }

    // Construct Member JSOn
    if (memberInfo != undefined && memberInfo.FirstName != undefined) {
      mbrEnrollmentIntermediateJSON.Member.FirstName = memberInfo.FirstName;
      mbrEnrollmentIntermediateJSON.Member.LastName = memberInfo.LastName;
      mbrEnrollmentIntermediateJSON.Member.SSN = memberInfo.SSN;
      mbrEnrollmentIntermediateJSON.Member.Gender = memberInfo.Gender;
      mbrEnrollmentIntermediateJSON.Member.Addr1 = memberInfo.MailingAddress;
      mbrEnrollmentIntermediateJSON.Member.Addr2 = memberInfo.Address2;
      mbrEnrollmentIntermediateJSON.Member.City = memberInfo.City;
      mbrEnrollmentIntermediateJSON.Member.StateCode = memberInfo.State;
      mbrEnrollmentIntermediateJSON.Member.Zip = memberInfo.ZipCode;
      mbrEnrollmentIntermediateJSON.Member.HomePhone = memberInfo.PhoneNumber;
      mbrEnrollmentIntermediateJSON.Member.Email = memberInfo.EmailAddress;
      mbrEnrollmentIntermediateJSON.Member.DOB = memberInfo.DOBForAPIConverted;
      mbrEnrollmentIntermediateJSON.Member.CvgStartDt = covgEffDate;
      mbrEnrollmentIntermediateJSON.Member.Language = ConfigurationManagerService.settings.Language; //Currenly harcoding to "en" in config file.
      mbrEnrollmentIntermediateJSON.Member.CmpCode = ConfigurationManagerService.settings.MetLifeCompanyCode;
      mbrEnrollmentIntermediateJSON.Member.FlFlType = memberInfo.Fulfillment;
      mbrEnrollmentIntermediateJSON.Member.Ethnicity = memberInfo.FacilityId;
      mbrEnrollmentIntermediateJSON.Member.TrackingCode = memberInfo.FacilityName;

      // If even vision plan was selected, then Member Note will say 'Member may be enrolled in corresponding Dental Program.'
      if (selectedVisionPlan != undefined && selectedVisionPlan.Product != undefined) {
        mbrEnrollmentIntermediateJSON.Member.MemberNote = ConfigurationManagerService.settings.MetLifeMemberNote;
      }
    }

    // State Specific Questions Mapping for StateCode "CO"
    if (stateCode.toUpperCase() == "CO") {
      // Previous COverage fields
      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldTwo = memberInfo.Duplication;
      mbrEnrollmentIntermediateJSON.Member.UserInfoOne = memberInfo.PreviousCoverageCompany;
      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldOne = memberInfo.Lapse;

      //Other Insurance Related fields mapping
      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldThree = memberInfo.OtherInsurance;
      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldTwentyThree = memberInfo.PreviousCoverageCompany2;
      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldTwentyFour = memberInfo.PreviousCoveragePolicy2;

      // SLMB, QMB, Medicaid fields
      mbrEnrollmentIntermediateJSON.Member.UserInfoTwo = memberInfo.SLMB;
      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldTwentyOne = memberInfo.Medicare;
      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldTwentyTwo = memberInfo.Medicaid;
    }
    // State Specific Questions Mapping for StateCode "SC"
    else if (stateCode.toUpperCase() == "SC") {
      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldTwo = memberInfo.Medicaid;
      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldThree = memberInfo.Medicare;

      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldTwentyOne = memberInfo.Duplication;
      mbrEnrollmentIntermediateJSON.Member.UserInfoOne = memberInfo.PreviousCoverageCompany;
      mbrEnrollmentIntermediateJSON.Member.UserInfoTwo = memberInfo.PreviousCoveragePolicy;

      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldTwentyTwo = memberInfo.PreviousCoverage;
    }
    // State Specific Questions Mapping for StateCode "NJ"
    else if (stateCode.toUpperCase() == "NJ") {
      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldTwo = memberInfo.Duplication;
      mbrEnrollmentIntermediateJSON.Member.UserInfoOne = memberInfo.PreviousCoverageCompany;
      mbrEnrollmentIntermediateJSON.Member.UserInfoTwo = memberInfo.PreviousCoveragePolicy;

      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldThree = memberInfo.Lapse;
      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldTwentyThree = memberInfo.PreviousCoverageCompany2;
      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldTwentyFour = memberInfo.PreviousCoveragePolicy2;
    }
    // State Specific Questions Mapping for StateCode "MA"
    else if (stateCode.toUpperCase() == "MA") {
      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldOne = memberInfo.PreviousCoverage;
    }
    // State Specific Questions Mapping for StateCode "FL"
    else if (stateCode.toUpperCase() == "FL") {
      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldOne = memberInfo.PreviousCoverage;
      mbrEnrollmentIntermediateJSON.Member.UserInfoOne = memberInfo.PreviousCoverageCompany;
      mbrEnrollmentIntermediateJSON.Member.UserInfoTwo = memberInfo.PreviousCoveragePolicy;
      if (floridaAgentLicenseDetailsResponse != undefined && floridaAgentLicenseDetailsResponse.AgentName != undefined && floridaAgentLicenseDetailsResponse.AgentLicenseNumber != undefined && floridaAgentLicenseDetailsResponse.AgentName && floridaAgentLicenseDetailsResponse.AgentLicenseNumber) {
        mbrEnrollmentIntermediateJSON.Member.UserInfoFour = floridaAgentLicenseDetailsResponse.AgentName + ',' + floridaAgentLicenseDetailsResponse.AgentLicenseNumber;
      }
    }
    // State Specific Questions Mapping for other common StateCode from configuration.json
    else if (ConfigurationManagerService.settings.StatesWithCommonSpecificQuestion.toUpperCase().includes(stateCode.toUpperCase())) {
      mbrEnrollmentIntermediateJSON.Member.MiscUsrFldOne = memberInfo.PreviousCoverage;
    }
    // End of Construct Member JSOn

    // Construct Member Dependent Json
    for (let dependent of dependentInfo.Dependents) {
      if (dependent.AddToDental == true) {
        let memberDependentJson: MemberDependentJSON = new MemberDependentJSON();
        memberDependentJson.CvgStartDt = covgEffDate;
        memberDependentJson.DependentNum = '0';
        memberDependentJson.SSN = dependent.SSN;
        memberDependentJson.DisabledFlg = dependent.IsDisabled ? '1' : '0';
        memberDependentJson.DOB = dependent.DOBForAPIConverted;
        memberDependentJson.FirstName = dependent.FirstName;
        memberDependentJson.Gender = dependent.Gender;
        memberDependentJson.LastName = dependent.LastName;
        memberDependentJson.MbrDependentID = '0';
        memberDependentJson.RltnCode = dependent.Relation;

        if (dependent.FacilityId != undefined && dependent.FacilityId) {
          let memberDepMiscJson: MemberDepMisc = new MemberDepMisc();
          memberDepMiscJson.MbrDepID = 0;
          memberDepMiscJson.ItmKey = "FacilityID";
          memberDepMiscJson.ItmValue = dependent.FacilityId;
          memberDepMiscJson.ItmDataType = "varchar";
          memberDependentJson.MemberDepMisc.push(memberDepMiscJson);
        }

        if (dependent.FacilityName != undefined && dependent.FacilityName) {
          let memberDepMiscJson: MemberDepMisc = new MemberDepMisc();
          memberDepMiscJson.MbrDepID = 0;
          memberDepMiscJson.ItmKey = "FacilityName";
          memberDepMiscJson.ItmValue = dependent.FacilityName;
          memberDepMiscJson.ItmDataType = "varchar";
          memberDependentJson.MemberDepMisc.push(memberDepMiscJson);
        }

        mbrEnrollmentIntermediateJSON.MemberDependents.push(memberDependentJson);
      }
    }
    // End of Constructing Member Dependent Json

    // Construct Member Rate Json
    mbrEnrollmentIntermediateJSON.MemberRate.PymntFreqType = paymentFreq;
    mbrEnrollmentIntermediateJSON.MemberRate.MbrshipFeeForYr1 = selectedDentalPlan.Rate.toFixed(2).toString();
    //// End Of Constructing Member Rate Json

    // Construct MemberPaymentMethod Json
    if (paymentResponse != undefined && paymentResponse.PaymentType != undefined) {
      if (paymentResponse.PaymentType == ConfigurationManagerService.settings.CardPaymentTypeCode) {
        let expYear: string = paymentResponse.CardDetails.CardExpirationYear.toString();
        mbrEnrollmentIntermediateJSON.MemberPaymentMethod.CardExp = paymentResponse.CardDetails.CardExpirationMonth + expYear.substring(expYear.length - 2);
      }

      let cardTypesList: Array<CardTypes> = ConfigurationManagerService.settings.CardTypes;
      if (cardTypesList != undefined && cardTypesList.length != undefined && cardTypesList.length > 0) {
        if (cardTypesList.find(e => e.CardType == mbrEnrollmentIntermediateJSON.MemberPaymentMethod.CardType) != undefined) {
          mbrEnrollmentIntermediateJSON.MemberPaymentMethod.CardTypeDesc = cardTypesList!.find(e => e.CardType == mbrEnrollmentIntermediateJSON.MemberPaymentMethod.CardType)!.Description;
        }
      }

      mbrEnrollmentIntermediateJSON.MemberPaymentMethod.CardType = paymentResponse.CardDetails.CardCardType;
      mbrEnrollmentIntermediateJSON.MemberPaymentMethod.CardHolderName = paymentResponse.CardDetails.CardNameOnCard;

      let cardNumber: string = paymentResponse.CardDetails.CardCardNumber;
      if (cardNumber) {
        mbrEnrollmentIntermediateJSON.MemberPaymentMethod.CardLastFour = cardNumber.substr(cardNumber.length - 4);
        mbrEnrollmentIntermediateJSON.MemberPaymentMethod.CardNum = cardNumber;
      }

      mbrEnrollmentIntermediateJSON.MemberPaymentMethod.ActType = paymentResponse.BankDraftDetails.BankAccountType;
      mbrEnrollmentIntermediateJSON.MemberPaymentMethod.NameOnChk = paymentResponse.BankDraftDetails.BankNameOnAccount;
      mbrEnrollmentIntermediateJSON.MemberPaymentMethod.FinInstName = paymentResponse.BankDraftDetails.BankBankName;
      mbrEnrollmentIntermediateJSON.MemberPaymentMethod.RoutingNum = paymentResponse.BankDraftDetails.BankRoutingNumber;
      mbrEnrollmentIntermediateJSON.MemberPaymentMethod.ActNum = paymentResponse.BankDraftDetails.BankAccountnumber;

      mbrEnrollmentIntermediateJSON.MemberPaymentMethod.CardAddr1 = paymentResponse.BillingAddress.BillingAddress1;
      mbrEnrollmentIntermediateJSON.MemberPaymentMethod.CardAddr2 = paymentResponse.BillingAddress.BillingAddress2;
      mbrEnrollmentIntermediateJSON.MemberPaymentMethod.CardCity = paymentResponse.BillingAddress.BillingCity;
      mbrEnrollmentIntermediateJSON.MemberPaymentMethod.CardStateCode = paymentResponse.BillingAddress.BillingState;
      mbrEnrollmentIntermediateJSON.MemberPaymentMethod.CardZip = paymentResponse.BillingAddress.BillingZipCode;

      mbrEnrollmentIntermediateJSON.MemberPaymentMethod.DiffBillAddrFlg = paymentResponse.IsBillingAddressDifferentThanMailingAddress ? 1 : 0;
      mbrEnrollmentIntermediateJSON.MemberPaymentMethod.HomePhone = memberInfo.PhoneNumber;
      mbrEnrollmentIntermediateJSON.MemberPaymentMethod.PaymMthdType = paymentResponse.PaymentType;
    }
    // End Of Constructing MemberPaymentMethod Json

    if (mlagentCode != undefined && mlagentCode) {
      mbrEnrollmentIntermediateJSON.MemberAddl.MSRCode = mlagentCode;
    }

    return mbrEnrollmentIntermediateJSON;
  }

  // Get Coverage Type code based on coverage type from configuration.
  GetMetLifeCoverageType(coverage: string): any {
    let coverageTypeProperties: CoverageTypeProperties[] = ConfigurationManagerService.settings.CoverageTypeProperties;
    return coverageTypeProperties.find(e => e.CoverageType == coverage)!.CoverageTypeCode;
  }

  // Get member enrollment channel desc from marketing channel which will be stored in usrfld9 of membermisc table (User Story 55790)
  GetMarketingChannelType(marketingChannel: string): string {
    let marketingChannelProperties: MarketingChannelProperties[] = ConfigurationManagerService.settings.MarketingChannelProperties;
    return marketingChannelProperties.find(e => marketingChannel.toUpperCase().indexOf(e.MarketingChannel.toUpperCase()) > -1)!.EnrollmentChannel;
  }
}
