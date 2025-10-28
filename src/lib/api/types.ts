export type ApiError = {
  code: string;
  message: string;
};

export type ApiResponse<T> =
  | {
      success: true;
      data: T;
      error: null;
      timestamp: string;
    }
  | {
      success: false;
      data: null;
      error: ApiError;
      timestamp: string;
    };

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
};
