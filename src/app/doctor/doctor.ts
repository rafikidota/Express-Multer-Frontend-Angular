import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
export class Doctor {
    constructor(
        public name: string,
        public email: string,
        public id?: string,
        public img?: string,
    ) { }

    get imageURL() {
        if (this.img?.includes('https' || 'http')) {
            return this.img;
        }
        if (this.img) {
            return `${base_url}/upload/users/${this.img}`;
        } else {
            return null;
            // return `${base_url}/upload/users/no-image`;
        }
    }
}

export interface DoctorResponse {
    ok: boolean,
    msg: string,
    doctor?: Doctor,
    file?: File,
}