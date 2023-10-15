export default interface APIResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: Error | unknown
}
