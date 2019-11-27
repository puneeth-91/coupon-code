import { Injectable } from '@angular/core';
import { MLMbrEnrollmentIntermediateJSON } from '../models/MLMemberEnrollmentIntermediateModel';
import { DeclarationStatement, DentalDisclosure, DentalRateQuote, DependentInfo, FloridaAgentLicenseDetails, FormDataModel, MemberInfo, MetLifeFormNumberCodeDetails, MetLifePlanDetails, PartnerDetails, Payment, SelectedDentalProductPlan, SelectedVisionProductPlan, StateDetails, ValidateStateZip, VisionRateQuote } from '../models/model';
import { VSPMbrEnrollmentIntermediateJSON } from '../models/VSPMemberEnrollmentIntermediateModel';
import { ApiService } from './api.service';
import { ConfigurationManagerService } from './configuration-manager.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private _formData: FormDataModel = new FormDataModel();
  vspBaseUrl = ConfigurationManagerService.settings.VSPAPIBaseURL;
  metlifeBaseUrl = ConfigurationManagerService.settings.MetLifeAPIBaseURL;
  constructor(private apiService: ApiService) { }

  // Clear all Form Data
  ClearFormData() {
    this._formData = new FormDataModel();
  }

  // Get Form Data object 
  GetFormDataModel(): FormDataModel {
    return Object.assign({}, this._formData);
  }

  // Set Form Data object that can be used through out the website in form data.
  SetFormDataModel(formDataModel: FormDataModel) {
    this._formData = Object.assign({}, formDataModel);
  }

  // Set Member Enrolling ZipCode that can be used through out the website in form data.
  SetMemberEnrollZipCodeResponse(zipCode: string) {
    this._formData.ZipCode = zipCode;
  }

  // Get Member Enrolling ZipCode from Form data.
  GetMemberEnrollZipCodeResponse(): string {
    return this._formData.ZipCode;
  }

  // Set Member Enrolling StateCode that can be used through out the website in form data.
  SetMemberEnrollStateCodeResponse(stateCode: string) {
    this._formData.StateCode = stateCode;
  }

  // Get Member Enrolling StateCode from Form data.
  GetMemberEnrollStateCodeResponse(): string {
    return this._formData.StateCode;
  }

  // Set Member Enrolling Coverage Effective Date that can be used through out the website in form data.
  SetCoverageEffectiveDateResponse(coverageEffDate: string) {
    this._formData.CoverageEffectiveDate = coverageEffDate;
  }

  // Get Member Enrolling Coverage Effective Date from Form data.
  GetCoverageEffectiveDateResponse(): string {
    return this._formData.CoverageEffectiveDate;
  }

  // Set Member Enrolling Payment Frequency that can be used through out the website in form data.
  SetPaymentFrequencyResponse(paymentFreq: string) {
    this._formData.PaymentFrequency = paymentFreq;
  }

  // Get Member Enrolling Payment Frequency from Form data.
  GetPaymentFrequencyResponse(): string {
    return this._formData.PaymentFrequency;
  }

  // Set Member Enrolling Agent Code that can be used through out the website in form data.
  SetAgentCodeResponse(agentCode: string) {
    this._formData.AgentCode = agentCode;
  }

  // Get Member Enrolling Agent Code from Form data.
  GetAgentCodeResponse(): string {
    return this._formData.AgentCode;
  }

  // Set Member Enrolling VSP Agent Code that can be used through out the website in form data.
  SetVSPAgentCodeResponse(agentCode: string) {
    this._formData.VSPAgentCode = agentCode;
  }

  // Get Member Enrolling VSP Agent Code from Form data.
  GetVSPAgentCodeResponse(): string {
    return this._formData.VSPAgentCode;
  }

  // Set Member Enrolling VSP Agent Code that can be used through out the website in form data.
  SetMLAgentCodeResponse(agentCode: string) {
    this._formData.MLAgentCode = agentCode;
  }

  // Get Member Enrolling VSP Agent Code from Form data.
  GetMLAgentCodeResponse(): string {
    return this._formData.MLAgentCode;
  }

  // Set Vision Disclosure Agreement that can be used through out the website in form data.
  SetVisionAgreement(visionAgreement: boolean) {
    this._formData.VisionAgreement = visionAgreement;
  }

  // Get  Vision Disclosure Agreement from Form data.
  GetVisionAgreement(): boolean {
    return this._formData.VisionAgreement;
  }

  // Get ExternalID from Form data.
  GetExternalIDResponse(): string {
    return this._formData.ExternalID;
  }

  // Set ExternalID that can be used through out the website in form data.
  SetExternalIDResponse(externalId: string) {
    this._formData.ExternalID = externalId;
  }

  // Get Current Demographic Page Navigation URL from Form data.
  GetCurrentDemographicPageNavigationURLHostNameResponse(): string {
    return this._formData.CurrentDemographicPageNavigationURLHostName;
  }

  // Set Current DemographicPage Navigation URL that can be used through out the website in form data.
  SetCurrentDemographicPageNavigationURLHostNameResponse(currentDemographicUrlHostName: string) {
    this._formData.CurrentDemographicPageNavigationURLHostName = currentDemographicUrlHostName;
  }

  // Get Current Demographic Page Navigation URL Path Name from Form data.
  GetCurrentDemographicPageNavigationURLPathNameResponse(): string {
    return this._formData.CurrentDemographicPageNavigationURLPathName;
  }

  // Set Current DemographicPage Navigation URL that can be used through out the website in form data.
  SetCurrentDemographicPageNavigationURLPathNameResponse(currentDemographicUrlPathName: string) {
    this._formData.CurrentDemographicPageNavigationURLPathName = currentDemographicUrlPathName;
  }

  // Set Dental Disclosure Agreement that can be used through out the website in form data.
  SetDentalDisclosure(dentalDisclosure: DentalDisclosure) {
    this._formData.DentalDisclosure = Object.assign({}, dentalDisclosure);
  }

  // Get  Dental Disclosure Agreement from Form data.
  GetDentalDisclosure(): DentalDisclosure {
    return Object.assign({}, this._formData.DentalDisclosure);
  }

  // Set VSP Rate Details Response(i.e result from vsp rate finder api) that can be used through out the website in form data.
  SetVSPRateDetailsResponse(vspRateDetails: VisionRateQuote) {
    this._formData.AllVSPProductRates = Object.assign({}, vspRateDetails);
  }

  // Get VSP Rate Details Response(i.e result from vsp rate finder api) from form data.
  GetVSPRateDetailsResponse(): VisionRateQuote {
    return Object.assign({}, this._formData.AllVSPProductRates);
  }

  // Set VSP Rate Details Response(i.e result from metlife rate finder api) that can be used through out the website in form data.
  SetMetLifeRateDetailsResponse(dentalRateDetails: DentalRateQuote) {
    this._formData.AllMetLifeDentalProductRates = Object.assign({}, dentalRateDetails);
  }

  // Get VSP Rate Details Response(i.e result from metlife rate finder api) from form data.
  GetMetLifeRateDetailsResponse(): DentalRateQuote {
    return Object.assign({}, this._formData.AllMetLifeDentalProductRates);
  }

  // Set Selected Dental Product Plan Details Response(i.e Dental Plan selected in Select Plan page) that can be used through out the website in form data.
  SetSelectedDentalProductPlanResponse(selectedDentalProductPlan: SelectedDentalProductPlan) {
    this._formData.SelectedDentalProductPlan = Object.assign({}, selectedDentalProductPlan);
  }

  // Get Selected Dental Product Plan Details Response(i.e Dental Plan selected in Select Plan page) from form data.
  GetSelectedDentalProductPlanResponse(): SelectedDentalProductPlan {
    return Object.assign({}, this._formData.SelectedDentalProductPlan);
  }

  // Set Selected Vision Product Plan Details Response(i.e Vision Plan selected in Select Plan page) that can be used through out the website in form data.
  SetSelectedVisionProductPlanResponse(selectedVisionProductPlan: SelectedVisionProductPlan) {
    this._formData.SelectedVisionProductPlan = Object.assign({}, selectedVisionProductPlan);
  }

  // Get Selected Vision Product Plan Details Responsei.e Vision Plan selected in Select Plan page) from form data.
  GetSelectedVisionProductPlanResponse(): SelectedVisionProductPlan {
    return Object.assign({}, this._formData.SelectedVisionProductPlan);
  }

  // Clear Selected Dental Product Plan if no dental plan was selected in plan page.
  ClearSelectedDentalProductPlanResponse() {
    this._formData.SelectedDentalProductPlan = new SelectedDentalProductPlan();
  }

  // Clear Selected Vision Product Plan if no dental plan was selected in plan page.
  ClearSelectedVisionProductPlanResponse() {
    this._formData.SelectedVisionProductPlan = new SelectedVisionProductPlan();
  }

  // Set LUP State Code & Description Response in form data.
  SetStateCodesDetailsResponse(StateCodeDetailsResponse: StateDetails[]): any {
    this._formData.StateCodesResponse = StateCodeDetailsResponse.map(x => Object.assign({}, x));
  }

  // Set Member Info details response that can be used through out the website in form data.
  SetMemberInfoResponse(memberInfo: MemberInfo) {
    this._formData.MemberInfoResponse = Object.assign({}, memberInfo);
  }

  // Get Member Info details response from form data.
  GetMemberInfoResponse(): MemberInfo {
    return Object.assign({}, this._formData.MemberInfoResponse);
  }

  // Set Dependent Info details response that can be used through out the website in form data.
  SetDependentInfoResponse(dependentInfo: DependentInfo) {
    this._formData.DependentInfoResponse = Object.assign({}, dependentInfo);
  }

  // Get Dependent Info details response from form data.
  GetDependentInfoResponse(): DependentInfo {
    return Object.assign({}, this._formData.DependentInfoResponse);
  }

  // Set Payment details response in form data.
  SetPaymentResponse(paymentDetailsResponse: Payment): any {
    this._formData.PaymentResponse = Object.assign({}, paymentDetailsResponse);
  }

  // Get Payment details response from form data.
  GetPaymentResponse(): Payment {
    return Object.assign({}, this._formData.PaymentResponse);
  }

  // Get State Code & Description Response value from form data.
  GetStateCodesDetailsResponse(): StateDetails[] {
    if (this._formData.StateCodesResponse != undefined && this._formData.StateCodesResponse.length != undefined && this._formData.StateCodesResponse.length > 0) {
      return this._formData.StateCodesResponse.map(x => Object.assign({}, x));
    }
    return new Array<StateDetails>();
  }

  // Set MetLife PlanDetails Response in form data.
  SetMetLifePlanDetailsResponse(metLifePlanDetailsResponse: MetLifePlanDetails[]): any {
    this._formData.MetLifePlanDetailsResponse = metLifePlanDetailsResponse.map(x => Object.assign({}, x));
  }

  // Get MetLife PlanDetails Response value from form data.
  GetMetLifePlanDetailsResponse(): MetLifePlanDetails[] {
    if (this._formData.MetLifePlanDetailsResponse != undefined && this._formData.MetLifePlanDetailsResponse.length != undefined && this._formData.MetLifePlanDetailsResponse.length > 0) {
      return this._formData.MetLifePlanDetailsResponse.map(x => Object.assign({}, x));
    }
    return new Array<MetLifePlanDetails>();
  }

  // Set MetLife FormNumberCode Details Response in form data.
  SetMetLifeFormNumberCodeDetailsResponse(metLifeFormNumberCodeDetails: MetLifeFormNumberCodeDetails[]): any {
    this._formData.MetLifeFormNumberCodeDetails = metLifeFormNumberCodeDetails.map(x => Object.assign({}, x));
  }

  // Get MetLife FormNumberCode Details Response value from form data.
  GetMetLifeFormNumberCodeDetailsResponse(): MetLifeFormNumberCodeDetails[] {
    if (this._formData.MetLifeFormNumberCodeDetails != undefined && this._formData.MetLifeFormNumberCodeDetails.length != undefined && this._formData.MetLifeFormNumberCodeDetails.length > 0) {
      return this._formData.MetLifeFormNumberCodeDetails.map(x => Object.assign({}, x));
    }
    return new Array<MetLifeFormNumberCodeDetails>();
  }

  // Set Declaration Response in form data for caching.
  SetDeclarationStatementResponse(_declarationStatement: DeclarationStatement): void {
    this._formData.DeclarationStatement = Object.assign({}, _declarationStatement);
  }

  // Get Declaration Response from form data.
  GetDeclarationStatementResponse(): DeclarationStatement {
    return Object.assign({}, this._formData.DeclarationStatement);
  }

  // Set Florida Agent License Details Response in form data for caching.
  SetFloridaAgentLicenseDetailsResponse(_floridaAgentLicenseDetails: FloridaAgentLicenseDetails) {
    this._formData.FloridaAgentLicenseDetails = Object.assign({}, _floridaAgentLicenseDetails);
  }

  // Get Florida Agent License Details Response from form data.
  GetFloridaAgentLicenseDetailsResponse(): FloridaAgentLicenseDetails {
    return Object.assign({}, this._formData.FloridaAgentLicenseDetails);
  }

  // Set ML Member Intermediate Table Response data in form data for caching.
  SetMLMemberIntermediateResponse(mlmbrIntermediateResponse: MLMbrEnrollmentIntermediateJSON) {
    this._formData.MLMbrEnrollmentIntermediateJSON = Object.assign({}, mlmbrIntermediateResponse);
  }

  // Get ML Member Intermediate Table Response data from form data.
  GetMLMemberIntermediateResponse(): MLMbrEnrollmentIntermediateJSON {
    return Object.assign({}, this._formData.MLMbrEnrollmentIntermediateJSON);
  }

  // Set VSP Member Intermediate Table Response data in form data for caching.
  SetVSPMemberIntermediateResponse(vspmbrIntermediateResponse: VSPMbrEnrollmentIntermediateJSON) {
    this._formData.VSPMbrEnrollmentIntermediateJSON = Object.assign({}, vspmbrIntermediateResponse);
  }

  // Get VSP Member Intermediate Table Response data from form data.
  GetVSPMemberIntermediateResponse(): VSPMbrEnrollmentIntermediateJSON {
    return Object.assign({}, this._formData.VSPMbrEnrollmentIntermediateJSON);
  }

  // Set Partner Details data in form data for caching.
  SetPartnerDetailsResponse(partnerDetails: PartnerDetails) {
    this._formData.PartnerDetails = Object.assign({}, partnerDetails);
  }

  // Get Partner Details data from form data.
  GetPartnerDetailsResponse(): PartnerDetails {
    return Object.assign({}, this._formData.PartnerDetails);
  }

  // Set MetLife MbrWebID that can be used through out the website in form data.
  SetMLMbrWebIDResponse(mbrWebId: string) {
    this._formData.MLMbrWebID = mbrWebId;
  }

  // Get MetLife MbrWebID from Form data.
  GetMLMbrWebIDResponse(): string {
    return this._formData.MLMbrWebID;
  }

  // Set VSP MbrWebID that can be used through out the website in form data.
  SetVSPMbrWebIDResponse(mbrWebId: string) {
    this._formData.VSPMbrWebID = mbrWebId;
  }

  // Get MetLife MbrWebID from Form data.
  GetVSPMbrWebIDResponse(): string {
    return this._formData.VSPMbrWebID;
  }

  // Set Policy Number Of SucessEnrollment that can be used through out the website in form data.
  SetPolicyNumberOfSucessEnrollmentResponse(policyNumber: string) {
    this._formData.PolicyNumberOfSucessEnrollment = policyNumber;
  }

  // Get Set Policy Number Of SucessEnrollment from Form data.
  GetPolicyNumberOfSucessEnrollmentResponse(): string {
    return this._formData.PolicyNumberOfSucessEnrollment;
  }

  // Set Is Vision Payment Successful response that can be used through out the website in form data.
  SetIsVisionPaymentSuccessfulResponse(isVisionPaymentSuccessful: boolean) {
    this._formData.IsVisionPaymentSuccessful = isVisionPaymentSuccessful;
  }

  // Get Is Vision Payment Successful response from Form data.
  GetIsVisionPaymentSuccessfulResponse(): boolean {
    return this._formData.IsVisionPaymentSuccessful;
  }

  // Set Is Dental Payment Successful response that can be used through out the website in form data.
  SetIsDentalPaymentSuccessfulResponse(isDentalPaymentSuccessful: boolean) {
    this._formData.IsDentalPaymentSuccessful = isDentalPaymentSuccessful;
  }

  // Get Is Dental Payment Successful response from Form data.
  GetIsDentalPaymentSuccessfulResponse(): boolean {
    return this._formData.IsDentalPaymentSuccessful;
  }

  //Call Get VSPRateFinder API to get vsp rate details response.
  async GetVSPRate(zipCode: string): Promise<any> {
    var data: any = {
      ZipCode: zipCode,
      IsDVH: "True"
    }
    console.log("Querying");
    return this.apiService.post(this.vspBaseUrl + ConfigurationManagerService.settings.GetVSPRateURL, data);
  }

  //Call Get Metlife Dental Rate Quote API to get metlife dental rate details
  async GetDentalRateQuote(zipCode: string | undefined, coverageEffectiveDate: string | null, clientCode: string): Promise<any> {
    var data: any = {
      ZipCode: zipCode,
      CoverageEffectiveDate: coverageEffectiveDate,
      ClientCode: clientCode
    }
    console.log("Querying");
    return this.apiService.post(this.metlifeBaseUrl + ConfigurationManagerService.settings.GetMetLifeDentalRateFinderURL, data);
  }

  // Call ValidateSSN API, to validate for valid ssn.
  async ValidateSSN(ssn: string): Promise<any> {
    var ssnmodel: any = {
      SSN: ssn
    }
    console.log("Querying");
    return this.apiService.post(this.metlifeBaseUrl + ConfigurationManagerService.settings.ValidateSSNURL, ssnmodel);
  }

  //Call GetStateCodes API to get LUP State Code details for dropdown values.
  async GetStateCodes(): Promise<any> {
    console.log("Querying");
    return this.apiService.get(this.vspBaseUrl + ConfigurationManagerService.settings.GetStateCodesURL);
  }

  //Call GetMetLifePlanDetails API to get MetLife Plan Details from LUP table Plan in MemberTakeALongDentalDB.
  async GetMetLifePlanDetails(): Promise<any> {
    console.log("Querying");
    return this.apiService.post(this.metlifeBaseUrl + ConfigurationManagerService.settings.GetMetLifePlanDetails, "");
  }

  //Call GetStateCustomisedContents API to get declaration statements for the state code.
  async GetStateCustomisedContents(stateCode: string, language: string): Promise<any> {
    var data: any = {
      StateCode: stateCode,
      Language: language
    }
    console.log("Querying");
    return this.apiService.post(this.metlifeBaseUrl + ConfigurationManagerService.settings.GetStateCustomisedContentsURL, data);
  }

  //Call GetFloridaStateAgentNameLicenseNumber API to get agent details.
  async GetFloridaStateAgentNameAndLicenseNumber(formNumbersCode: string, cmpCode: string): Promise<any> {
    var data: any = {
      FormNumbersCode: formNumbersCode,
      CmpCode: cmpCode
    }
    console.log("Querying");
    return this.apiService.post(this.metlifeBaseUrl + ConfigurationManagerService.settings.GetFloridaStateAgentNameLicenseNumberURL, data);
  }

  // Call MetLife MbrEnrollmentIntermediateInsert API, to insert data into MbrEnrollmentIntermediate table.
  async MLMbrEnrollmentIntermediateInsert(mlmbrEnrollmentIntermediateJSON: MLMbrEnrollmentIntermediateJSON): Promise<any> {
    var data: MLMbrEnrollmentIntermediateJSON = {
      Member: mlmbrEnrollmentIntermediateJSON.Member,
      MemberRate: mlmbrEnrollmentIntermediateJSON.MemberRate,
      MemberPaymentMethod: mlmbrEnrollmentIntermediateJSON.MemberPaymentMethod,
      MemberPaymentList: mlmbrEnrollmentIntermediateJSON.MemberPaymentList,
      MemberField: mlmbrEnrollmentIntermediateJSON.MemberField,
      MemberAddl: mlmbrEnrollmentIntermediateJSON.MemberAddl,
      MemberDncNotifcations: mlmbrEnrollmentIntermediateJSON.MemberDncNotifcations,
      MemberPaymentAuth: mlmbrEnrollmentIntermediateJSON.MemberPaymentAuth,
      MemberId: mlmbrEnrollmentIntermediateJSON.MemberId,
      MemberDependents: mlmbrEnrollmentIntermediateJSON.MemberDependents,
      PolicyNum: mlmbrEnrollmentIntermediateJSON.PolicyNum,
      GrpCode: mlmbrEnrollmentIntermediateJSON.GrpCode,
      MbrWebId: mlmbrEnrollmentIntermediateJSON.MbrWebId,
      PlanCode: mlmbrEnrollmentIntermediateJSON.PlanCode
    }
    console.log("Querying");
    return this.apiService.post(this.metlifeBaseUrl + ConfigurationManagerService.settings.MLMbrEnrollmentIntermediateInsertURL, data);
  }

  // Call MetLife MbrEnrollmentIntermediateUpdate API, to update data in MbrEnrollmentIntermediate table.
  async MLMbrEnrollmentIntermediateUpdate(mlmbrEnrollmentIntermediateJSON: MLMbrEnrollmentIntermediateJSON): Promise<any> {
    var data: MLMbrEnrollmentIntermediateJSON = {
      Member: mlmbrEnrollmentIntermediateJSON.Member,
      MemberRate: mlmbrEnrollmentIntermediateJSON.MemberRate,
      MemberPaymentMethod: mlmbrEnrollmentIntermediateJSON.MemberPaymentMethod,
      MemberPaymentList: mlmbrEnrollmentIntermediateJSON.MemberPaymentList,
      MemberField: mlmbrEnrollmentIntermediateJSON.MemberField,
      MemberAddl: mlmbrEnrollmentIntermediateJSON.MemberAddl,
      MemberDncNotifcations: mlmbrEnrollmentIntermediateJSON.MemberDncNotifcations,
      MemberPaymentAuth: mlmbrEnrollmentIntermediateJSON.MemberPaymentAuth,
      MemberId: mlmbrEnrollmentIntermediateJSON.MemberId,
      MemberDependents: mlmbrEnrollmentIntermediateJSON.MemberDependents,
      PolicyNum: mlmbrEnrollmentIntermediateJSON.PolicyNum,
      GrpCode: mlmbrEnrollmentIntermediateJSON.GrpCode,
      MbrWebId: mlmbrEnrollmentIntermediateJSON.MbrWebId,
      PlanCode: mlmbrEnrollmentIntermediateJSON.PlanCode
    }
    console.log("Querying");
    return this.apiService.post(this.metlifeBaseUrl + ConfigurationManagerService.settings.MLMbrEnrollmentIntermediateUpdateURL, data);
  }

  // Call VSP MbrEnrollmentIntermediateInsert API, to insert data into MbrEnrollmentIntermediate table.
  async VSPMbrEnrollmentIntermediateInsert(vspmbrEnrollmentIntermediateJSON: VSPMbrEnrollmentIntermediateJSON): Promise<any> {
    var data: VSPMbrEnrollmentIntermediateJSON = {
      Member: vspmbrEnrollmentIntermediateJSON.Member,
      Product: vspmbrEnrollmentIntermediateJSON.Product,
      MemberPaymentMethod: vspmbrEnrollmentIntermediateJSON.MemberPaymentMethod,
      Dependents: vspmbrEnrollmentIntermediateJSON.Dependents,
    }
    console.log("Querying");
    return this.apiService.post(this.vspBaseUrl + ConfigurationManagerService.settings.VSPMbrEnrlIntermediateInsertURL, data);
  }

  // Call VSP MbrEnrollmentIntermediateUpdate API, to Update data in MbrEnrollmentIntermediate table.
  async VSPMbrEnrollmentIntermediateUpdate(vspmbrEnrollmentIntermediateJSON: VSPMbrEnrollmentIntermediateJSON): Promise<any> {
    var data: VSPMbrEnrollmentIntermediateJSON = {
      Member: vspmbrEnrollmentIntermediateJSON.Member,
      Product: vspmbrEnrollmentIntermediateJSON.Product,
      MemberPaymentMethod: vspmbrEnrollmentIntermediateJSON.MemberPaymentMethod,
      Dependents: vspmbrEnrollmentIntermediateJSON.Dependents,
    }
    console.log("Querying");
    return this.apiService.post(this.vspBaseUrl + ConfigurationManagerService.settings.VSPMbrEnrlIntermediateUpdateURL, data);
  }

  // Call MetLife InsertMbrEnrollmentJsonData API, to Insert into MbrMetLifeEnrollmentJSON table of CICWeb DB.
  async InsertMbrEnrollmentJsonData(formDataJson: any): Promise<any> {
    var data: any = {
      MbrEnrollmentJson: formDataJson
    }
    console.log("Querying");
    return this.apiService.post(this.metlifeBaseUrl + ConfigurationManagerService.settings.InsertMbrEnrollmentJsonDataURL, data);
  }

  // Call MetLife GetMbrEnrollmentJsonData API, to Get Form Data stored in MbrMetLifeEnrollmentJSON table of CICWeb DB based on ExternalID passed.
  async GetMbrEnrollmentJsonData(externalId: string): Promise<any> {
    var data: any = {
      ExternalID: externalId
    }
    console.log("Querying");
    return this.apiService.post(this.metlifeBaseUrl + ConfigurationManagerService.settings.GetMbrEnrollmentJsonDataURL, data);
  }

  // Call MetLife UpdateMbrEnrollmentJsonData API, to Update Form Data in MbrMetLifeEnrollmentJSON table of CICWeb DB based on ExternalID passed.
  async UpdateMbrEnrollmentJsonData(externalId: string, formDataJson: any): Promise<any> {
    var data: any = {
      ExternalID: externalId,
      MbrEnrollmentJson: formDataJson
    }
    console.log("Querying");
    return this.apiService.post(this.metlifeBaseUrl + ConfigurationManagerService.settings.UpdateMbrEnrollmentJsonDataURL, data);
  }

  // Call VSP's ValidateState API, to validate for valid state and zip code combination.
  async ValidateState(validateStateModel: ValidateStateZip): Promise<any> {
    var data: any = {
      ZipCode: validateStateModel.ZipCode,
      StateCode: validateStateModel.StateCode
    }
    console.log("Querying");
    return this.apiService.post(this.vspBaseUrl + ConfigurationManagerService.settings.ValidateStateURL, data);
  }

  // Call MetLife GetFormnumberCodeAndGrpCode API, to obtain form number code and group code list from the existing PromoCodeMapping table for the referralcode.
  async GetFormnumberCodeAndGrpCode(referralCode: string): Promise<any> {
    var data: any = {
      ReferralCode: referralCode
    }
    console.log("Querying");
    return this.apiService.post(this.metlifeBaseUrl + ConfigurationManagerService.settings.GetFormnumberCodeAndGrpCodeURL, data);
  }

  // Call VSP's ValidateAgentLicense API, to validate whether agent belong to agency and if whether agent license to the state or not.
  async ValidateAgentLicense(agencyCode: string, agentCode: string, zipCode: string): Promise<any> {
    var data: any = {
      AgencyCode: agencyCode,
      AgentCode: agentCode,
      ZipCode: zipCode
    }
    return this.apiService.post(this.vspBaseUrl + ConfigurationManagerService.settings.ValidateAgentLicenseURL, data);
  }

  // Call VSP's GetPartnerDetails API, to Get Partner and Branding details based on partnerCode & marketingChannel from PartnerConfiguration table of CICWeb DB.
  async GetPartnerDetails(url: string): Promise<any> {
    var data: any = {
      URL: url
    }
    return this.apiService.post(this.vspBaseUrl + ConfigurationManagerService.settings.GetPartnerDetailsURL, data);
  }
}



