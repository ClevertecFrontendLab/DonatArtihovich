export type FeedbackType = {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: 1 | 2 | 3 | 4 | 5;
    createdAt: string;
}