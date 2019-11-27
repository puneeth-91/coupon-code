import { Injectable } from '@angular/core';
import { PartnerDetails } from '../models/model';
import { MemberService } from '../services/member.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private memberServiceForHeader: MemberService) { }

  // Set Zip code and partnerDetails value in session storage.
  SetZipCode(zipCode: string, PartnerDetails: PartnerDetails) {
    sessionStorage.setItem("ZipCode", zipCode);
    sessionStorage.setItem("PartnerDetails", JSON.stringify(PartnerDetails));
  }

  // Get Zip code and partnerDetails value from session storage.
  GetZipCode() {
    let partnerDetails = JSON.parse(sessionStorage.getItem('PartnerDetails'));
    this.memberServiceForHeader.SetPartnerDetailsResponse(partnerDetails);
    this.memberServiceForHeader.GetPartnerDetailsResponse();
    return sessionStorage.getItem("ZipCode");
  }

  // Destroy zipcode value from session storage.
  DestroyZipCode() {
    sessionStorage.removeItem("ZipCode");
    sessionStorage.removeItem("PartnerDetails");
  }
}
