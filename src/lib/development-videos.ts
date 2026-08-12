export type DevelopmentVideo = { slug: string; title: string; caption: string; src: string; poster?: string };

// Add only real development recordings here. The section lazy-loads each item
// only as it enters the viewport.
export const developmentVideos: DevelopmentVideo[] = [];
