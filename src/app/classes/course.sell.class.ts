/*
Clase que se encarga de construir toda la información
del modulo de ventas acerca de este curso
*/
export class CourseDataSellerClass {
    constructor(
        public lp_post_id: string,
        public lp_type: string,
        public lp_ref: string,
        public lp_room: string,
        public lp_dur: string,
        public lp_price_1: string | number,
        public lp_price_2: string | number,
        public lp_price_assist_buff: string,
        public lp_currency: string,
        public lp_location: string,
        public lp_date_available: string,
        public lp_price_group: string,
        public lp_group_max: string,
        public lp_online: string,
        public lp_medida: string,
        public lp_id?: string
    ) {}
}
