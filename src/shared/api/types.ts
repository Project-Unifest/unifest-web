export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

// Special response type for the /images endpoint
export interface FileResponse {
  imgUrl: string;
  imgName: string;
}
