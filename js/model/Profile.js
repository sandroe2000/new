export class Profile {

    constructor(newProfile){
        this.profile = {
            "id": 0, 
            "cpf": "000.000.000-00",
            "name": "",
            "imgProfile1": "/img/avatar/no-image.jpg",
            "birthDate": null,
            "contactPhone": "",
            "emailAddress": "",
            "username": "",
            "password": "",
            "language": "",
            "timeZone": "",
            "communication": [],
            "passwordResetVerif": [],
            "disabled": [],
            "groupParticipant": [],
            "accessSettings": [],
            "accountSettings": [],
            "changePassword": [],
            "listOfProfiles": [],
            "personalInformation": []
        };
        this.init(newProfile);
    }

    init(newProfile){

        if(newProfile){
            this.profile = newProfile;
        }
    }
}