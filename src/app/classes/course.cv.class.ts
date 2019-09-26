export class CourseCvClass {
    constructor(
        public section_name: string,
        public section_course_id: number,
        public section_order: number,
        public section_description: string,
        public section_id?: number,
        public child?: any
    ) {}
}
