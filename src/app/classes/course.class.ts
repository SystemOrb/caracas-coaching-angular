/*
Clase que se encarga de construir toda la información del curso
*/
export class CourseDataClass {
    constructor(
        public ID: string,
        public post_author: string,
        public post_date_gmt: string,
        public post_content: string,
        public post_title: string,
        public post_excerpt: string,
        public post_status: string,
        public comment_status: string,
        public ping_status: string,
        public post_password: string,
        public post_name: string,
        public to_ping: string,
        public pinged: string,
        public post_modified: string,
        public post_modified_gmt: string,
        public post_content_filtered: string,
        public post_parent: string,
        public guid: string,
        public menu_order: string,
        public post_type: string,
        public post_mime_type: string,
        public comment_count: string,
        public child?: any
    ) {}
}

