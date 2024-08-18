export interface Video {
    publicId: string;
    id: string;
    title: string;
    description: string;
    compressedSize: number;
    originalSize: number;
    duration: number;
    createdAt: Date;
}