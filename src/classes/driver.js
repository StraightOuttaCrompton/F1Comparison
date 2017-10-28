/*jshint esversion: 6 */
export class Driver {
    constructor(data) {
        this.driverId = data._attributes.driverId;
        this.wikiURL = data._attributes.url;
        this.firstName = data.GivenName._text;
        this.familyName = data.FamilyName._text;
        this.dateOfBirth = data.DateOfBirth._text;
        this.nationality = data.Nationality._text;
    }
    get driverId() {
        return this._driverId;
    }
    set driverId(value) {
        this._driverId = value;
    }

    get wikiURL() {
        return this._wikiURL;
    }
    set wikiURL(value) {
        this._wikiURL = value;
    }

    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }

    get familyName() {
        return this._familyNameL;
    }
    set familyName(value) {
        this._familyName = value;
    }

    get dateOfBirth() {
        return this._dateOfBirthL;
    }
    set dateOfBirth(value) {
        this._dateOfBirth = value;
    }

    get nationality() {
        return this._nationality;
    }
    set nationality(value) {
        this._nationality = value;
    }
}