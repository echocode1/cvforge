/** Every successful API response is wrapped in this envelope. */
export interface ApiResponse<T> {
  success: true;
  data: T;
}

/** Every failed API response has this shape. */
export interface ApiError {
  success: false;
  statusCode: number;
  message: string;
  details?: unknown;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PaginationQuery {
  page?: number;
  pageSize?: number;
}
