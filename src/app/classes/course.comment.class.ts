export class CourseCommentData {
    constructor(
        public comment_ID: number,
        public comment_post_ID: number,
        public comment_author: string,
        public comment_author_email: string,
        public comment_author_url: string,
        public comment_author_IP: string,
        public comment_date: Date,
        public comment_date_gmt: Date,
        public comment_content: string,
        public comment_karma: boolean | number,
        public comment_approved: boolean | number,
        public comment_agent: string,
        public comment_type: string,
        public comment_parent: number,
        public user_id?: number
    ) {}
}
