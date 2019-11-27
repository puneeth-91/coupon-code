import { Injectable } from '@angular/core';
import { CoverageTypeProperties, DependentInfo, MarketingChannelProperties, MemberInfo, PartnerDetails, Payment, SelectedDentalProductPlan, SelectedVisionProductPlan } from '../models/model';
import { DependentJSON, VSPMbrEnrollmentIntermediateJSON } from '../models/VSPMemberEnrollmentIntermediateModel';
import { ConfigurationManagerService } from './configuration-manager.service';
import { MemberService } from './member.service';

@Injectable({
  providedIn: 'root'
})
export class VSPIntermediateInsertUpdateService {

  _marketingChannelProperties: MarketingChannelProperties[] = ConfigurationManagerService.settings.MarketingChannelProperties;

  constructor(private memberService: MemberService) { }

  // Construct Member & Dependent JSON Response for storing in Member Intermediate table.
  MapDataTOMemberIntermediateModel(methodType: string): VSPMbrEnrollmentIntermediateJSON {
    let vspEnrollmentIntermediateJSON: VSPMbrEnrollmentIntermediateJSON = new VSPMbrEnrollmentIntermediateJSON();

    let mbrWebId: string = this.memberService.GetVSPMbrWebIDResponse();
    let covgEffDate: string = this.memberService.GetCoverageEffectiveDateResponse();
    let paymentFreq: string = this.memberService.GetPaymentFrequencyResponse();
    let selectedVisionPlan: SelectedVisionProductPlan = this.memberService.GetSelectedVisionProductPlanResponse();
    let memberInfo: MemberInfo = this.memberService.GetMemberInfoResponse();
    let dependentInfo: DependentInfo = this.memberService.GetDependentInfoResponse();
    let paymentResponse: Payment = this.memberService.GetPaymentResponse();
    let vspagentCode: string = this.memberService.GetVSPAgentCodeResponse();
    let agentCode: string = this.memberService.GetAgentCodeResponse();
    let partnerDetails: PartnerDetails = this.memberService.GetPartnerDetailsResponse();
    let selectedDentalPlan: SelectedDentalProductPlan = this.memberService.GetSelectedDentalProductPlanResponse();
    let policyNumber: string = this.memberService.GetPolicyNumberOfSucessEnrollmentResponse(); // Get policy number/mbrwebid of 1st succesfull enrollment(i.e of vsp's or metlife's)

    let marketingChannelProperty: MarketingChannelProperties | undefined = this._marketingChannelProperties.find(e => partnerDetails.MarketingChannel.toUpperCase().indexOf(e.MarketingChannel.toUpperCase()) > -1);

    if (mbrWebId != undefined && mbrWebId && methodType == "UPDATE") {
      vspEnrollmentIntermediateJSON.Member.MbrWebID = mbrWebId;

       // If metlife was already enrolled succesful, then it's MbrWebID will be used for VSP's policynumber (As both enrollment(i.e vsp and metlife) shud have same policy number)
      if (policyNumber != undefined && policyNumber) {
        vspEnrollmentIntermediateJSON.Member.PolicyNumber = policyNumber;
      }
      else {
        vspEnrollmentIntermediateJSON.Member.PolicyNumber = mbrWebId;
      }
    }

    // Construct Member JSOn
    if (memberInfo != undefined && memberInfo.FirstName != undefined) {
      vspEnrollmentIntermediateJSON.Member.FirstName = memberInfo.FirstName;
      vspEnrollmentIntermediateJSON.Member.LastName = memberInfo.LastName;
      vspEnrollmentIntermediateJSON.Member.Address1 = memberInfo.MailingAddress;
      vspEnrollmentIntermediateJSON.Member.Address2 = memberInfo.Address2;
      vspEnrollmentIntermediateJSON.Member.City = memberInfo.City;
      vspEnrollmentIntermediateJSON.Member.StateCode = memberInfo.State;
      vspEnrollmentIntermediateJSON.Member.ZipCode = memberInfo.ZipCode;
      vspEnrollmentIntermediateJSON.Member.HomePhone = memberInfo.PhoneNumber;
      vspEnrollmentIntermediateJSON.Member.Email = memberInfo.EmailAddress;
      vspEnrollmentIntermediateJSON.Member.ConfirmEmail = memberInfo.EmailAddress;
      vspEnrollmentIntermediateJSON.Member.DOB = memberInfo.DOBForAPIConverted;
      vspEnrollmentIntermediateJSON.Member.Gender = memberInfo.Gender;
      vspEnrollmentIntermediateJSON.Member.MaritalStatus = memberInfo.MaritalStatus;
      vspEnrollmentIntermediateJSON.Member.FulfillmentData = memberInfo.Fulfillment;
      vspEnrollmentIntermediateJSON.Member.WorkStatus = memberInfo.EmploymentStatus;

      // If even dental plan was selected, then Member Note will say 'Member may be enrolled in corresponding Vision Plan.'
      if (selectedDentalPlan != undefined && selectedDentalPlan.PlnCode != undefined) {
        vspEnrollmentIntermediateJSON.Member.MemberNote = ConfigurationManagerService.settings.VSPMemberNote;
      }
    }

    if (selectedVisionPlan != undefined && selectedVisionPlan.Product != undefined && selectedVisionPlan.ProductID != undefined) {
      vspEnrollmentIntermediateJSON.Product.Coverage = this.GetVSPCoverageType(selectedVisionPlan.Coverage);
      vspEnrollmentIntermediateJSON.Product.Frequency = paymentFreq;
      vspEnrollmentIntermediateJSON.Product.ProductName = selectedVisionPlan.Product;
      vspEnrollmentIntermediateJSON.Product.Productid = selectedVisionPlan.ProductID;
      vspEnrollmentIntermediateJSON.Product.MemberRate = (+selectedVisionPlan.Rate).toFixed(2);
      vspEnrollmentIntermediateJSON.Product.EffectiveDate = covgEffDate;
      vspEnrollmentIntermediateJSON.Product.CCAFee = (+selectedVisionPlan.CCARate).toFixed(2);

      // If agent code was passed in query string, then assign that agentcode to AgentCode field of Product Json, otherwise assign partner's agent code.

      if (marketingChannelProperty.IsAgentCodeSplitIntoVSPAndMetlife == true) {
        if (vspagentCode != undefined && vspagentCode) {
          vspEnrollmentIntermediateJSON.Product.AgentCode = vspagentCode;
        }
        else if (partnerDetails != undefined && partnerDetails.AgentCode != undefined && partnerDetails.AgentCode) {
          vspEnrollmentIntermediateJSON.Product.AgentCode = ConfigurationManagerService.settings.VSPHouseAgentCode;
        }
      }
      else {
        if (agentCode != undefined && agentCode) {
          vspEnrollmentIntermediateJSON.Product.AgentCode = agentCode;
        }
        else if (partnerDetails != undefined && partnerDetails.AgentCode != undefined && partnerDetails.AgentCode) {
          vspEnrollmentIntermediateJSON.Product.AgentCode = ConfigurationManagerService.settings.VSPHouseAgentCode;
        }
      }

      if (partnerDetails != undefined && partnerDetails.PartnerCode != undefined && partnerDetails.PartnerCode) {
        vspEnrollmentIntermediateJSON.Product.AgencyPartner = partnerDetails.PartnerCode;
      }

      if (partnerDetails != undefined && partnerDetails.MarketingChannel != undefined && partnerDetails.MarketingChannel) {
        vspEnrollmentIntermediateJSON.Product.MarketingChannel = partnerDetails.MarketingChannel;
      }
    }

    // Construct MemberPaymentMethod Json
    if (paymentResponse != undefined && paymentResponse.PaymentType != undefined) {

      vspEnrollmentIntermediateJSON.MemberPaymentMethod.PaymentMethodType = paymentResponse.PaymentType;

      if (paymentResponse.PaymentType == ConfigurationManagerService.settings.CardPaymentTypeCode) {
        let expYear: string = paymentResponse.CardDetails.CardExpirationYear.toString();
        vspEnrollmentIntermediateJSON.MemberPaymentMethod.CardExpDate = paymentResponse.CardDetails.CardExpirationMonth + expYear.substring(expYear.length - 2);
      }
      
      vspEnrollmentIntermediateJSON.MemberPaymentMethod.CardType = paymentResponse.CardDetails.CardCardType;
      vspEnrollmentIntermediateJSON.MemberPaymentMethod.CardHolderName = paymentResponse.CardDetails.CardNameOnCard;
      vspEnrollmentIntermediateJSON.MemberPaymentMethod.CardNumber = paymentResponse.CardDetails.CardCardNumber;

      vspEnrollmentIntermediateJSON.MemberPaymentMethod.ActType = paymentResponse.BankDraftDetails.BankAccountType;
      vspEnrollmentIntermediateJSON.MemberPaymentMethod.NameonAccount = paymentResponse.BankDraftDetails.BankNameOnAccount;
      vspEnrollmentIntermediateJSON.MemberPaymentMethod.NameofBank = paymentResponse.BankDraftDetails.BankBankName;
      vspEnrollmentIntermediateJSON.MemberPaymentMethod.RoutingNum = paymentResponse.BankDraftDetails.BankRoutingNumber;
      vspEnrollmentIntermediateJSON.MemberPaymentMethod.ActNum = paymentResponse.BankDraftDetails.BankAccountnumber;

      vspEnrollmentIntermediateJSON.MemberPaymentMethod.BillingAddress1 = paymentResponse.BillingAddress.BillingAddress1;
      vspEnrollmentIntermediateJSON.MemberPaymentMethod.BillingAddress2 = paymentResponse.BillingAddress.BillingAddress2;
      vspEnrollmentIntermediateJSON.MemberPaymentMethod.Billingcity = paymentResponse.BillingAddress.BillingCity;
      vspEnrollmentIntermediateJSON.MemberPaymentMethod.BillingState = paymentResponse.BillingAddress.BillingState;
      vspEnrollmentIntermediateJSON.MemberPaymentMethod.BillingZipCode = paymentResponse.BillingAddress.BillingZipCode;
    }

    // Construct Member Dependent Json
    for (let dependent of dependentInfo.Dependents) {
      if (dependent.AddToVision == true) {
        let dependentJSON: DependentJSON = new DependentJSON();
        dependentJSON.FirstName = dependent.FirstName;
        dependentJSON.LastName = dependent.LastName;
        dependentJSON.isDisabled = dependent.IsDisabled ? '1' : '0';
        dependentJSON.CoverageStartDate = covgEffDate;
        dependentJSON.RelationshipCode = dependent.Relation;
        dependentJSON.DOB = dependent.DOBForAPIConverted;
        dependentJSON.Gender = dependent.Gender;
        vspEnrollmentIntermediateJSON.Dependents.push(dependentJSON);
      }
    }

    return vspEnrollmentIntermediateJSON;
  }

  // Get Coverage Type code based on coverage type from configuration.
  GetVSPCoverageType(coverage: string): any {
    let coverageTypeProperties: CoverageTypeProperties[] = ConfigurationManagerService.settings.CoverageTypeProperties;
    return coverageTypeProperties.find(e => e.CoverageType == coverage)!.CoverageTypeCode;
  }
}
