export interface Book {
    id: string;
    original_name: string;
    affiliate_link: string;
    title: string;
    subtitle?: string;
    authors: string[];
    description: string;
    cover_image: string;
    page_count: number;
    rating: number;
    categories: string[];
}
