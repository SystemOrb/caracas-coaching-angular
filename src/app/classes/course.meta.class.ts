/*
Clase que se encarga de crear los modulos de data que contiene el curso
*/
export class CourseMetaClass {
    constructor(
        public meta_id: string,
        public post_id: string,
        public meta_key: string,
        public meta_value: string,
        public icon?: string,
        public label?: string,
        public price?: any
    ) {}
}
